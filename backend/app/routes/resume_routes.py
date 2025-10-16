from flask import Blueprint, send_from_directory, request, jsonify, current_app
import os

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/api/resume", methods=["GET"])
def get_resume():
    try:
        # Folder containing the resume
        resume_folder = os.path.join(current_app.root_path, "static", "resume")

        # Auto-detect the first PDF file in that folder
        files = [f for f in os.listdir(resume_folder) if f.lower().endswith(".pdf")]
        if not files:
            return jsonify({"error": "Resume not found"}), 404

        filename = files[0]  # e.g. "Telmah_Tantoh_Resume.pdf"
        mode = request.args.get("mode", "view")  # ?mode=view or ?mode=download

        # View in browser (default)
        if mode == "view":
            return send_from_directory(resume_folder, filename, as_attachment=False)

        # Force download
        elif mode == "download":
            return send_from_directory(resume_folder, filename, as_attachment=True)

        else:
            return jsonify({"error": "Invalid mode parameter"}), 400

    except Exception as e:
        print("Error sending resume:", e)
        return jsonify({"error": str(e)}), 500
