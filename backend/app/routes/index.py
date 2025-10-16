from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="app/static", static_url_path="/")

@app.route("/")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

# Keep your API routes prefixed with /api/ so they don't conflict
