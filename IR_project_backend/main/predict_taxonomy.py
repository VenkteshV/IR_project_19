

import joblib
import os
import torch
from transformers import BertForSequenceClassification, AdamW, BertConfig, BertTokenizer
import numpy as np
import torch.nn.functional as F
from transformers import BertModel, AdamW, BertConfig, BertTokenizer
import torch.nn as nn
import geoopt.manifolds.stereographic.math as pm
import geoopt.optim.rsgd as rsgd_
import geoopt.optim.radam as radam_
# from hyrnn.nets import MobiusLinear
from geoopt.tensor import ManifoldParameter
from geoopt.manifolds.stereographic import PoincareBall
import geoopt
import geoopt.optim.rsgd as rsgd_
import geoopt.optim.radam as radam_
# from hyrnn.nets import MobiusLinear
from geoopt.tensor import ManifoldParameter

dir_path = os.path.dirname(os.path.realpath(__file__))
pathModel = os.path.join(dir_path, '../models')
test_labels = joblib.load(pathModel+'/test_labels')
test_labels = np.array(test_labels)
model_path_recommend = os.path.join(dir_path, '../models/IR_project_model_hyperbolic_hinge_5_1')


test_poincare_tensor = joblib.load(pathModel+'/test_tensor_indexed')

test_poincare_tensor = torch.tensor(test_poincare_tensor, dtype=torch.float)
def create_ball(ball=None, c=None):
    """
    Helper to create a PoincareBall.
    Sometimes you may want to share a manifold across layers, e.g. you are using scaled PoincareBall.
    In this case you will require same curvature parameters for different layers or end up with nans.
    Parameters
    ----------
    ball : geoopt.PoincareBall
    c : float
    Returns
    -------
    geoopt.PoincareBall
    """
    if ball is None:
        assert c is not None, "curvature of the ball should be explicitly specified"
        ball = geoopt.PoincareBall(c)
    # else trust input
    return ball


class MobiusLinear(torch.nn.Linear):
    def __init__(self, *args, nonlin=None, ball=None, c=1.0, **kwargs):
        super().__init__(*args, **kwargs)
        # for manifolds that have parameters like Poincare Ball
        # we have to attach them to the closure Module.
        # It is hard to implement device allocation for manifolds in other case.
        self.ball = create_ball(ball, c)
        if self.bias is not None:
            self.bias = geoopt.ManifoldParameter(self.bias, manifold=self.ball)
        self.nonlin = nonlin
        self.reset_parameters()

    def forward(self, input):
        return mobius_linear(
            input,
            weight=self.weight,
            bias=self.bias,
            nonlin=self.nonlin,
            ball=self.ball,
        )

    @torch.no_grad()
    def reset_parameters(self):
        torch.nn.init.eye_(self.weight)
        self.weight.add_(torch.rand_like(self.weight).mul_(1e-3))
        if self.bias is not None:
            self.bias.zero_()


# package.nn.functional.py
def mobius_linear(input, weight, bias=None, nonlin=None, *, ball: geoopt.PoincareBall):
    output = ball.mobius_matvec(weight, input)
    if bias is not None:
        output = ball.mobius_add(output, bias)
    if nonlin is not None:
        output = ball.logmap0(output)
        output = nonlin(output)
        output = ball.expmap0(output)
    return output
# Neural Classifierwork
# this method can be used to project from euclidean space to hyperbolic space
def tensor_exponential_map(vector):
      vector_norm = vector.norm(dim=-1, p=2, keepdim=True).clamp_min(1e-15)
      gamma_1 = torch.nn.functional.tanh(vector_norm) * (vector / vector_norm)
      return gamma_1
class MulticlassClassifier(nn.Module):
    def __init__(self,bert_model_path):
        super(MulticlassClassifier,self).__init__()
        self.bert = BertModel.from_pretrained(bert_model_path,output_hidden_states=False,output_attentions=False)
        for param in self.bert.parameters():
          param.requires_grad=True
        self.dropout = nn.Dropout(0.1)
        self.fc1 = MobiusLinear(768, 384)
        self.fc2 = MobiusLinear(384, 160)

    def forward(self,tokens,masks):
        _, pooled_output = self.bert(tokens, attention_mask=masks)
        hyerbolic_transform = tensor_exponential_map(pooled_output)
        x = self.fc1(hyerbolic_transform)
        x = self.fc2(x)
        return x
model = MulticlassClassifier('bert-base-uncased')
model.load_state_dict(torch.load(model_path_recommend+'/model_weights.zip',map_location=torch.device('cpu')))
recommender_tokenizer = BertTokenizer.from_pretrained(model_path_recommend, do_lower_case=True)

cos = torch.nn.CosineSimilarity(dim=0, eps=1e-6)
def dist_without_grad( u, v):
  sqdist = torch.sum((u - v) ** 2, dim=-1)
  squnorm = torch.sum(u ** 2, dim=-1)
  sqvnorm = torch.sum(v ** 2, dim=-1)
  x = 1 + 2 * sqdist / ((1 - squnorm) * (1 - sqvnorm)) + 1e-7
  z = torch.sqrt(x ** 2 - 1)
  return torch.log(x + z)
def recommend_taxonomy(text):
    encoded_dict = recommender_tokenizer.encode_plus(
                        text,                      # Sentence to encode.
                        add_special_tokens = True, # Add '[CLS]' and '[SEP]'
                        max_length = 128,           # Pad & truncate all sentences.
                        pad_to_max_length = True,
                        return_attention_mask = True,   # Construct attn. masks.
                        return_tensors = 'pt',     # Return pytorch tensors.
                   )
        
        # Add the encoded sentence to the list.    
    test_input_ids = encoded_dict['input_ids']
        
        # And its attention mask (simply differentiates padding from non-padding).
    test_attention_masks = encoded_dict['attention_mask']

    # Convert the lists into tensors.
    model.eval()
    # input_ids = test_input_ids.to('cuda')
    # attention_masks = test_attention_masks.to('cuda')
    # test_poincare_tensor = test_poincare_tensor.to('cuda')
    # Tracking variables 
    predictions , true_labels = [], []
    with torch.no_grad():
        outputs = model(test_input_ids.reshape(1,-1),test_attention_masks.reshape(1,-1))
        distances,indices = torch.topk(dist_without_grad(outputs,test_poincare_tensor),5,largest=False)
        print("distances",distances)
    if distances[0] <6:
        return test_labels[indices.cpu().numpy()]
    else:
        return np.array([])
