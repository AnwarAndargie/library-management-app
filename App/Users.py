from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String
from app import db

class Users(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)  
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)  
    password: Mapped[str] = mapped_column(String(200), nullable=False)  
