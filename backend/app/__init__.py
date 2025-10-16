import os
from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from flask_cors import CORS


mail = Mail()

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object("backend.app.config.Config")

    # Enable CORS for frontend (React runs on port 5173)
    CORS(
        app,
        resources={r"/*": {"origins": ["http://127.0.0.1:5173", "http://localhost:5173"]}},
        supports_credentials=True
    )
    # Initialize mail
    mail.init_app(app)

    # Register routes
    from app.routes.contact_routes import contact_bp
    from app.routes.resume_routes import resume_bp

    app.register_blueprint(contact_bp)
    app.register_blueprint(resume_bp)

    @app.route("/")
    def home():
        return {"message": "Portfolio backend running!"}
    
    
    print("MAIL USER:", app.config.get("MAIL_USERNAME"))
    
    


    return app
