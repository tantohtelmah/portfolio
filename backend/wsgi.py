import os
import sys

# --- Make sure "backend" is in Python path ---
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

try:
    # For Render deployment (repo root)
    from backend.app import create_app
except ModuleNotFoundError:
    # For local development (inside backend/)
    from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
