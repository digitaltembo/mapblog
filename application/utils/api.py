from functools import wraps
from flask import request, g, jsonify
from abc import ABC, abstractmethod 
from .auth import verify_token
from index import app

class Response(ABC):
    @abstractmethod
    def isOkay(self):
        pass
    @abstractmethod    
    def to_response(self):
        pass 

class Okay(Response):
    data ={}
    def __init__(self, data):
        self.data = data
    def isOkay(self):
        return True 
    def to_response(self):
        return jsonify(
            result='success',
            data=self.data
        )

class Failed(Response):
    code = ''
    message = ''
    def __init__(self, error_code, error_message):
        self.code = error_code 
        self.message = error_message
    def isOkay(self):
        return False
    def to_response(self):
        return jsonify(
            result='failure',
            error_code=self.code,
            error_message=self.message
        )
def is_authorized(auth_required=False, super_auth_required=False):
    if auth_required or super_auth_required:
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)

            if user and (user.is_super_user or not super_auth_required):
                g.current_user = user
                return True
        return False 
    return True

def api_post(endpoint, auth_required=False, super_auth_required=False):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if (is_authorized(auth_required, super_auth_required)):
                incoming = request.get_json()
                kwargs.update(incoming)

                try:
                    return f(*args, **kwargs)
                except TypeError:
                    return Failed('bad_args', 'Incorrect Arguments')
            else:
                return Failed('unauthorized', 'You do not have the permissions to access this resource')


        @app.route("/api/" + endpoint, methods=["POST"])
        @wraps(f)
        def api_wrapper(*args, **kwargs):
            return wrapper(*args, **kwargs).to_response()

        return wrapper

    return decorator
