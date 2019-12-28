from index import db
from werkzeug.security import generate_password_hash, check_password_hash
import pickle
import time

from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)

    is_superuser = db.Column(db.Boolean(), default=False)

    images = db.relationship('Image', back_populates='user', foreign_keys='[Image.user_id]')
    places = db.relationship('PlaceTime', back_populates='user', foreign_keys='[PlaceTime.user_id]')


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

image_tag = db.Table('image_tag', Base.metadata,
    db.Column('tag_id', db.Integer(), db.ForeignKey('tag.id')),
    db.Column('image_id', db.Integer(), db.ForeignKey('image.id'))
)

class Tag(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    tag = db.Column(db.String(30))

    def __init__(self, tag):
        self.tag = tag

class PlaceTime(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    latitude = db.Column(db.Float())
    longitude = db.Column(db.Float())
    address = db.Column(db.String(255))
    timestamp = db.Column(db.Integer())

    user = db.relationship('User', back_populates='places', foreign_keys=[user_id])

    def __init__(self, latitude, longitude, address, timestamp):
        self.latitude = latitude
        self.longitude = longitude
        self.address = address
        self.timestamp = timestamp 

    def get_datetime(self):
        return datetime.fromtimestamp(self.timestamp)


class Image(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

    path = db.Column(db.String(255), unique=True)
    mime_type = db.Column(db.String(32))
    description = db.Column(db.Text())
    place_time_id = db.Column(db.Integer(), db.ForeignKey('place_time.id'))


    tags = db.relationship("Tag", secondary=image_tag)
    place_time = db.relationship('User',foreign_keys=[place_time_id])
    user = db.relationship('User', back_populates='images', foreign_keys=[user_id])


    def __init__(
        self, 
        user_id,
        path,
        mime_type, 
        description, 
        place_time_id
    ):
        self.user_id = user_id
        self.path = path 
        self.mime_type = mime_type
        self.description = description
        self.place_time_id = place_time_id

    @staticmethod
    def create(
        db,
        path,
        mime_type='', 
        description='', 
        latitude=None, 
        longitude=None, 
        address=None, 
        timestamp=None, 
        tags=[]
    ):
        place_time = PlaceTime(latitude, longitude, address, timestamp)
        db.session.add(place_time)
        db.session.commit()
        new_image = Image(path, mime_type, description, place_time.id)

        tag_rows = []
        for tag in tags:
            new_image.tags.append(Tag(tag))
        db.session.add(new_image)
        db.session.commit()


