from models import db 
class Books(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    author = db.Column(db.String(20))
    edition = db.Column(db.String(100))
    quantity = db.Column(db.Integer, default=8)
    uploaded_at = db.Column(db.DateTime, default=db.func.now())
