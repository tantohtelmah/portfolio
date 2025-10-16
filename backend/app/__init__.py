from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_mail import Mail
import os

mail = Mail()

def create_app():
    # Get absolute path to frontend build
    frontend_path = os.path.join(os.path.dirname(__file__), "../../frontend-react/dist")
    frontend_path = os.path.abspath(frontend_path)

    app = Flask(__name__, static_folder=frontend_path, static_url_path="/")
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Config
    app.config.from_object("backend.app.config.Config")
    mail.init_app(app)

    # Import and register blueprints once
    from backend.app.routes.contact_routes import contact_bp
    app.register_blueprint(contact_bp, url_prefix="/api/contact")

    # Serve frontend files
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        full_path = os.path.join(app.static_folder, path)
        if os.path.exists(full_path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    return app
