# IR_project_19

IR_project poincare _embedding_training folder has the code for training poincare embeddings as mentioned in report for hierarchical labels. 
It also contains the models that have to be referred or uploaded on colab when running the code in code_and_notebooks folder.

ARC_data.zip and khan_acad_data.zip has two datasets with train and test and val csv files

In QC_science folder inside code_and notebooks there are files which implement the baselines
  -----IR_PROJECT_QC_BERT_euclidean_baselines_training_.ipynb  - BERT multiclass(labels embedding) and BERT multiclass (prototypical embedding) baselines training script <br />
  -----IR_project_QC_euclidean_taxonomy_prediction_dual_BERT_training_andinference.ipynb - DUAL BERT training and inference <br />
  ------QC_HyperIM.ipynb  - HyperIM baseline training <br />
  -------- QC_HyperIM_inference.ipynb - HyperIM baseline inference <br />
  -------- logistic_regression_QC_science.ipynb - logistic regression baseline <br />
  ------IR_PROJECT_QC_BERT_euclidean_baselines_inference_.ipynb  - BERT multiclass(labels embedding) and BERT multiclass (prototypical embedding) baselines inference script <br />


All models are available at https://drive.google.com/drive/folders/1bDLaaSnlaNBXKTAWYNR77Ifjlo7x6jMd?usp=sharing . Mount drive on google colab and the code takes care of loading everything
