from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_mail import Mail
import os

mail = Mail()

def create_app():
    app = Flask(__name__, static_folder="../frontend-react/dist", static_url_path="/")
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.config.from_object("backend.app.config.Config")
    mail.init_app(app)

    # ✅ Only import once
    from backend.app.routes.contact_routes import contact_bp
    app.register_blueprint(contact_bp, url_prefix="/api/contact")

    # ✅ Serve frontend
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, "index.html")

    return app
