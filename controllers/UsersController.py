from extensions import db
from App.Users import Users 
from werkzeug.security import generate_password_hash, check_password_hash

class UsersController:
    def register_user(self, username, email, password):
        found_user = Users.query.filter_by(email=email).first()
        if found_user:
            return {"error": "User already exists"}
        
        hashed_password = generate_password_hash(password)
        new_user = Users(username=username, email=email, password=hashed_password)
        
        try:
            db.session.add(new_user)
            db.session.commit()
            return {"success": "You're registered successfully"}
        except Exception as e:
            db.session.rollback()
            return {"error": f"Registration failed: {str(e)}"}

    def login(self, email, password):
        user = Users.query.filter_by(email=email).first()
        if user is None:
            return {"error": "User not found"}
        
        if check_password_hash(user.password, password):
            return {
                "success": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            }
        else:
            return {"error": "Invalid credentials"}

    def get_user(self, user_id):
        user = Users.query.get(user_id)
        if user is None:
            return {"error": "No user found"}
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
