from flask import render_template, redirect, Blueprint, request, jsonify
import logging
from controllers.UsersController import UsersController

user_view = Blueprint('user_view', __name__, template_folder="templates")
users_controller = UsersController()

@user_view.route('/register/', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not all([username, email, password]):
            return jsonify({"error": "Missing username, email, or password"}), 400
            
        users_controller = UsersController()  
        response = users_controller.register_user(username, email, password)

        if "error" in response:
            return jsonify(response), 400
        return jsonify(response), 201

    except Exception as e:
        logging.error(f"Registration error: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


@user_view.route('/login/', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({"error": "Missing email or password"}), 400
        
        response = users_controller.login(email, password)
        if "error" in response:
            return jsonify(response), 401
        return jsonify(response), 200
    except Exception as e:
        logging.error(f"Login error: {e}")
        return jsonify({"error": f"Error in logging in: {str(e)}"}), 500
