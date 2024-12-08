from flask import render_template, redirect, Blueprint, request, jsonify
import logging
from controllers.UsersController import UsersController

user_view = Blueprint('user_view', __name__, template_folder="templates")
users_controller = UsersController()

@user_view.route('/register/', methods=['POST', 'GET'])
def register():
    try:
        if request.method == "GET":
            return render_template('sign-in.html')

      
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

    
        if not all([username, email, password]):
            error_message = "Missing username, email, or password"
            return render_template('sign-in.html', error=error_message), 400
        users_controller = UsersController()  
        response = users_controller.register_user(username, email, password)

      
        if "error" in response:
            return render_template('sign-in.html', error=response["error"]), 400
        return render_template('sign-in.html', success=response["success"])

    except Exception as e:
        logging.error(f"Registration error: {str(e)}")
        error_message = f"An unexpected error occurred: {str(e)}"
        return render_template('sign-in.html', error=error_message), 500


@user_view.route('/login/', methods=['POST'])
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
