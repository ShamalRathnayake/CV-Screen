from flask import Flask
from flask_cors import CORS
import os


def create_app():
    app = Flask(__name__)
    CORS(app)

    os.makedirs("uploads", exist_ok=True)

    from .routes import predict_bp
    from .routes import upload_bp

    app.register_blueprint(predict_bp)
    app.register_blueprint(upload_bp)

    return app
