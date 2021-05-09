## IR_project_19

IR_project poincare _embedding_training folder has the code for training poincare embeddings as mentioned in report for hierarchical labels. 
It also contains the models that have to be referred or uploaded on colab when running the code in code_and_notebooks folder.

ARC_data.zip and khan_acad_data.zip has two datasets with train and test and val csv files

The baseline implementation files are maintainted in the following folder structure.

# Code and notebooks -> QC Science (ARC dataset) :

  -----IR_PROJECT_QC_BERT_euclidean_baselines_training_.ipynb  -> BERT multiclass(labels embedding) and BERT multiclass (prototypical embedding) baselines training script <br />
  -----IR_project_QC_euclidean_taxonomy_prediction_dual_BERT_training_andinference.ipynb -> DUAL BERT training and inference <br />
  ------QC_HyperIM.ipynb  -> HyperIM baseline training <br />
  -------- QC_HyperIM_inference.ipynb -> HyperIM baseline inference <br />
  -------- logistic_regression_QC_science.ipynb -> logistic regression baseline <br />
  ------IR_PROJECT_QC_BERT_euclidean_baselines_inference_.ipynb  -> BERT multiclass(labels embedding) and BERT multiclass (prototypical embedding) baselines inference script <br />
  
  ------- QC_IR_project_hyperbolic_taxonomy_prediction_hinge_5_further_training.ipynb - contains code for training and inference of HyperboleTax ( Poincare +BERT)
on ARC dataset

#  Code and notebooks -> Khan acad :

------- IR_PROJECT_khan_acad_BERT_euclidean_baselines_inference_.ipynb -> BERT multiclass(labels embedding) and BERT multiclass (prototypical embedding) baselines inference script <br />
------- IR_PROJECT_khan_acad_BERT_euclidean_baselines_training_.ipynb -> BERT multiclass(labels embedding) and BERT multiclass (prototypical embedding) baselines training script <br />
------- IR_khan_acad_euclidean_taxonomy_prediction_dual_BERT_inference.ipynb -> DUAL BERT training and inference <br />
------ khan_acad_HyperIM.ipynb  -> HyperIM baseline training <br />
------- logistic_regression_khan_acad_science.ipynb -> logistic regression baseline <br />
--------  khan_acad_IR_project_hyperbolic_taxonomy_prediction_hinge_5_further_training.ipynb - contains training code for training on khan academy dataset <br />
-------- khan_acad_IR_project_hyperbolic_taxonomy_prediction_hinge_5_inference.ipynb - contains inference code for HyperboleTax on khan academy dataset <br />


All models are available at https://drive.google.com/drive/folders/1bDLaaSnlaNBXKTAWYNR77Ifjlo7x6jMd?usp=sharing . Mount drive on google colab and the code takes care of loading everything

# Following are instructions to run the demo
# Running frontend

cd taxonomy-recommender-ui <br />
RUN npm install and then  <br />
RUN npm start   <br />

# running backend
First download IR_project_model_hyperbolic_hinge_5_1.zip and unzip it into models folder of IR_project_backend  <br />
Run python app.py to start the backend   <br />
Navigate to http://localhost:3200 and upload files to get taxonomy recommendations   <br />

