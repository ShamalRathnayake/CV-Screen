import joblib
import numpy as np
import os

model_path = os.path.join(os.path.dirname(__file__), "hire_prediction_model.pkl")
model = joblib.load(model_path)


def predict_embedding(embedding):
    input_array = np.array(embedding).reshape(1, -1)
    prob = model.predict_proba(input_array)[0][1]
    decision = model.predict(input_array)[0]
    return float(prob), int(decision)
