from extensions import db

class Media(db.Model):
    __tablename__ = "media"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(500), nullable=True)
    ai_description = db.Column(db.Text, nullable=True)
    size = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "author": self.author,
            "url": self.url,
            "ai_description": self.ai_description,
            "size": self.size,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
