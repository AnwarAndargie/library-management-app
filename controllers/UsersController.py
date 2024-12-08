from app import db
from App.Users import Users
from sqlalchemy.orm import Mapped

class UsersController:
  def register_user(self,username,email,password):
    found = db.session.get(email)
    if found:
      return {"error":"user already exists"}
    new_user = Users(username,email,password)
    db.session.add(new_user)
    db.session.commit()
    return {"sucess":"you're registered successfylly"}
  def login(self,email,password):
    user = db.session.get(email)
    if user is None:
      return False
    is_match = user.password == password
    if is_match:
      return True
  def get_user(self,user_id):
    user = db.session.get(user_id)
    if user is None:
      return {"error":"no user found"}
    return user
