from flask import render_template, redirect, Blueprint, request, jsonify
import logging
from controllers.UsersController import UsersController

user_view = Blueprint('user_view', __name__, template_folder="templates")
users_controller = UsersController()

@user_view.route('/users/register/', methods=['POST'])
def register():
    try:
        data = request.get_json()  # For JSON payloads
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not all([username, email, password]):
            return jsonify({"error": "Missing username, email, or password"}), 400
        
        response = users_controller.register_user(username, email, password)
        return jsonify(response), 200 if "success" in response else 400
    except Exception as e:
        logging.error(f"Registration error: {e}")
        return jsonify({"error": f"Error in registration: {str(e)}"}), 500

@user_view.route('/users/login', methods=['POST'])
def login():
    try:
        data = request.get_json()  # For JSON payloads
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({"error": "Missing email or password"}), 400
        
        response = users_controller.login(email, password)
        return jsonify(response), 200 if "success" in response else 400
    except Exception as e:
        logging.error(f"Login error: {e}")
        return jsonify({"error": f"Error in logging in: {str(e)}"}), 500
