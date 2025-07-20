from flask import Blueprint, request, jsonify
from .model import predict_embedding
import os
from app.services.image_extractor import extract_images
from app.services.face_detector import detect_face
from app.services.image_utils import encode_image_to_base64

predict_bp = Blueprint("predict", __name__)

upload_bp = Blueprint("upload", __name__)
UPLOAD_FOLDER = "uploads"


@predict_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data or "embedding" not in data:
        return jsonify({"error": 'Missing "embedding" in request'}), 400

    embedding = data["embedding"]
    if not isinstance(embedding, list) or len(embedding) != 768:
        return jsonify({"error": "Invalid embedding length or type"}), 400

    prob, decision = predict_embedding(embedding)
    return jsonify({"hire_probability": round(prob, 3), "hire_decision": decision})


@upload_bp.route("/upload", methods=["POST"])
def upload_cv():
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files["file"]
    if file.filename == "" or not file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Invalid or no file uploaded"}), 400

    pdf_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(pdf_path)

    image_paths = extract_images(pdf_path)

    for path in image_paths:
        if detect_face(path):
            base64_img = encode_image_to_base64(path)
            return jsonify({"status": True, "profile_image_base64": base64_img})

    return jsonify({"status": False, "message": "No face detected in any image"})
