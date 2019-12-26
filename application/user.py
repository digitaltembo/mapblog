from flask import request, render_template
from .models import User
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.api import api_post, Failed, Okay
from .utils.auth import generate_token, verify_token

# @app.route('/', methods=['GET'])
# def index():
#     return render_template('index.html')


# @app.route('/<path:path>', methods=['GET'])
# def any_root_path(path):
#     return render_template('index.html')

@api_post('auth/login')
def login(username, password):
    user = User.find_user(username, password)
    if user:
        return Okay({'token': generate_token(user)})
    else:
        return Failed('wrong', 'Incorrect Username or Password')

@api_post('auth/validate_token')
def validate_token(token):
    is_valid = verify_token(token)
    if is_valid:
        return Okay({'token': token})
    else:
        return Failed('wrong', 'Invalid Token')



# # @app.route("/api/user/add", methods=["POST"])
# # @requires_league_admin_auth
# # def add_user():
# #     incoming = request.get_json()
# #     league = League.query.get(int(g.current_user["league_id"]))
# #     (success, result) =  add_user_to_league(email=incoming["email"], name=incoming["name"], league = league)
# #     if success:
# #         return jsonify(result="success", user=result.to_dict())
# #     else:
# #         return result

# @app.route("/api/user/reset_password", methods=["POST"])
# @requires_league_admin_auth
# def reset_password():
#     incoming = request.get_json()

#     user = User.query.filter(league_id = g.current_user["league_id"], id=incoming["id"]).first()
#     user.password = ""
#     db.session.add(user)
#     db.session.commit()
#     return jsonify(result="success", user=result.to_dict())

# def add_user_to_league(email, name, password, league):
#     if league.current_users < league.allowed_users:
#         user = User(
#             email=email,
#             name=name,
#             password=password,
#             league=league
#         )
#         db.session.add(user)
#         league.current_users += 1
#         init_stat(user)

#         try:
#             db.session.commit()
#         except IntegrityError:
#             return (False, (jsonify(result="error", message="Cannot add user"), 409))

#         return (True, user)
#     else:
#         return (False, jsonify(result="BILLING NEEDED"))

# @app.route("/api/user/register", methods=["POST"])
# def register_user():
#     incoming = request.get_json()
#     league = League.query.filter_by(registration_code=incoming['registration_code']).first()
#     if league:
#         (success, result) = add_user_to_league(email=incoming['email'], name=incoming['name'], password=incoming['password'], league=league)

         
#         if success:
#             return jsonify(
#                 result="success", 
#                 id=result.id,
#                 token=generate_token(result)
#             )
#         else:
#             return result
#     else:
#         return jsonify(result="failure", message="You need an invitation to register.")



# @app.route("/api/auth/login", methods=["POST"])
# def login():
#     incoming = request.get_json()
#     user = User.get_user_with_email_and_password(incoming["username"], incoming["password"])
#     if user:
#         return jsonify(token=generate_token(user))

#     return jsonify(error=True), 403




# @app.route("/api/auth/validate_token", methods=["POST"])
# def is_token_valid():
#     incoming = request.get_json()
#     is_valid = verify_token(incoming["token"])

#     if is_valid:
#         return jsonify(token_is_valid=True)
#     else:
#         return jsonify(token_is_valid=False), 403

# @app.route("/api/user/list", methods=["GET"])
# @requires_auth
# def list_users():
#     users = [user.to_dict() for user in User.query.filter(league=user.league, is_active=True)]

#     return jsonify(
#         users
#     )

# @app.route("/api/user/update", methods=["POST"])
# @requires_auth
# def update_user():
#     incoming = request.get_json(force=True)
#     app.logger.info("UPDATING USER: {}".format(incoming))
#     user_id = int(incoming["id"])
#     if user_id != g.current_user['id'] and not g.current_user['is_superuser'] and not g.current_user['is_league_admin']:
#         return jsonify(result="failure", message="Not Authorized"), 401

#     user = User.query.get(user_id)
#     if g.current_user['is_league_admin'] and not g.current_user['is_superuser'] and user.league_id != g.current_user['league_id']:
#         return jsonify(result="failure", message="Not Authorized"), 401
    
#     user.email = incoming["email"]
#     user.name = incoming["name"]
#     if "password" in incoming and incoming["password"] != None and incoming["password"] != '':
#         user.password = User.hashed_password(incoming["password"])

#     if g.current_user['is_league_admin'] and "is_league_admin" in incoming and incoming["is_league_admin"] != None:
#         user.is_league_admin = incoming["is_league_admin"]
#     if g.current_user['is_superuser'] and "is_league_admin" in incoming and incoming["is_league_admin"] != None:
#         user.is_superuser = incoming["is_superuser"]
#     db.session.commit()
#     return jsonify(user.to_dict()), 200

# @app.route("/api/user/delete", methods=["DELETE"])
# @requires_league_admin_auth
# def delete_user():
#     incoming = request.get_json()
#     user = User.query.filter_by(id=int(request.args.get("id"))).first()
#     if user:
#         user.is_active=False
#         db.session.commit()
#         return jsonify(message="success", user_id=user.id), 200
#     else:
#         return jsonify(message="shucks"), 403


