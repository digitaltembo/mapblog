from index import db
from werkzeug.security import generate_password_hash, check_password_hash
import pickle
import time

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)

    is_superuser = db.Column(db.Boolean(), default=False)

    def __init__(self, username, password, is_superuser=False):
        self.username = username
        self.password = User.hashed_password(password)
        self.is_superuser = is_superuser

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "is_superuser": self.is_superuser,
        }

    @staticmethod
    def hashed_password(password):
        return generate_password_hash(password)

    @staticmethod
    def find_user(username, password):
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return user
        else:
            return None

