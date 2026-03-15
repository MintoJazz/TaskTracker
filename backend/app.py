from psycopg2 import connect
from dotenv import load_dotenv
from os import getenv
from persistencias import DAO
from flask import Flask, jsonify, request
from jwt import encode, decode, ExpiredSignatureError, InvalidTokenError
from flask_cors import CORS

def get_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '): raise InvalidTokenError("Token não fornecido")  # noqa: E701
    return auth_header.split(' ')[1]

load_dotenv()
SECRET = getenv('SECRET_KEY')

app = Flask(__name__)
CORS(app)

@app.route('/') 
def hello_world(): return "<p>Hello, World!</p>"

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    userDAO = DAO(table='usuario')
    user = userDAO.select_by_key(connect(getenv('DB_URL')),'email', data.get('email'))

    if not user: return jsonify({"erro": "E-mail ou senha invalidos"}), 401  # noqa: E701
    if user['senha'] != data.get('password'): return jsonify({"erro": "E-mail ou senha invalidos"}), 401  # noqa: E701

    return jsonify({
        'mensagem': "Login Realizado com sucesso",
        "token": encode({
            "sub": user['id'],
            "role": user['role']
        }, SECRET, algorithm='HS256')
    })

@app.route('/my-tasks', methods=['GET'])
def my_tasks():
    try: payload = decode(get_token(), SECRET, algorithms=['HS256'], options={"verify_exp": False, "verify_sub": False})  # noqa: E701
    except ExpiredSignatureError: return jsonify({"erro": "Token expirado"}), 401  # noqa: E701
    except InvalidTokenError: return jsonify({"erro": "Token inválido"}), 401  # noqa: E701
    
    task_DAO = DAO('servico')

    user_id = payload['sub']
    my_tasks = task_DAO.select_many_by_key(connect(getenv('DB_URL')), 'criador_id', user_id)

    return jsonify(my_tasks)

@app.route('/users', methods= ['GET'])
def users():
    try: get_token()  # noqa: E701
    except ExpiredSignatureError: return jsonify({"erro": "Token expirado"}), 401  # noqa: E701
    except InvalidTokenError: return jsonify({"erro": "Token inválido"}), 401  # noqa: E701
    
    user_DAO = DAO('usuario')

    all_users = user_DAO.select_all(connect(getenv('DB_URL')))

    return jsonify([ {'id': u['id'], 'nome': u['nome'], 'email': u['email']} for u in all_users ])