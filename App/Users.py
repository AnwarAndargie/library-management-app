from app import db
from sqlalchemy.orm import mapped_column, Mapped

class Users(db.Model):
  __tablename__ = 'users'
  id:Mapped[int] = mapped_column(primary_key=True)
  usernameL:Mapped[str] = mapped_column(unique=True)
  email:Mapped[str] = mapped_column(nullable=False)
  password:Mapped[str] = mapped_column(nullable=False)
