import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
model = joblib.load(BASE_DIR / "model.pkl")

def predict_category(text):
    probs = model.predict_proba([text])[0]
    classes = model.classes_
    idx = probs.argmax()
    return classes[idx], float(probs[idx])
