from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
from app import mail

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()  # ✅ reads JSON body
    if not data:
        return jsonify({"error": "No JSON data received"}), 400

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({"error": "All fields required"}), 400

    try:
        msg = Message(
            subject=f"Portfolio Contact - {name}",
            sender=email,
            recipients=[current_app.config["MAIL_USERNAME"]],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
        )
        mail.send(msg)
        return jsonify({"success": True, "message": "Your message was sent successfully!"}), 200
    except Exception as e:
        print("⚠️ Email send error:", e)
        return jsonify({"error": "Failed to send message"}), 500
