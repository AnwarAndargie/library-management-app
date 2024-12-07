from app import db

class Books(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), nullable=False, unique=True)
    author = db.Column(db.String(200), nullable=False)
    edition = db.Column(db.Integer, nullable=False) 
    year = db.Column(db.String(20), nullable=False) 
    count = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean, nullable=False)
