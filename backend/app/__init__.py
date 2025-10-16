import os
from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from flask_cors import CORS


mail = Mail()

def create_app():
    app = Flask(__name__)

    app = Flask(__name__, static_folder="../frontend-react/dist", static_url_path="/")
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
    try:
        from backend.app.routes.contact_routes import contact_bp
        from backend.app.routes.resume_routes import resume_bp
        from backend.app.config import Config
    except ModuleNotFoundError:
        from app.routes.contact_routes import contact_bp
        from app.routes.resume_routes import resume_bp
        from app.config import Config

    app.register_blueprint(contact_bp)
    app.register_blueprint(resume_bp)

    @app.route("/")
    def home():
        return {"message": "Portfolio backend running!"}
    
     # Serve frontend
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, "index.html")
        
    # import your blueprints
    from backend.app.routes.contact_routes import contact_bp
    app.register_blueprint(contact_bp, url_prefix="/api/contact")

    
    
    print("MAIL USER:", app.config.get("MAIL_USERNAME"))
    
    


    return app
