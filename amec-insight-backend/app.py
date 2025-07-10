from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# 模拟用户数据库
users = {
    "Tina": "password123",
    "admin": "adminpass"
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and users[username] == password:
        return jsonify({
            'success': True,
            'token': 'fake-token'
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401

@app.route('/api/equipment', methods=['GET'])
def get_equipment():
    # 假设备数据
    data = [
        {"id": "EQ001", "temperature": 75.5, "voltage": 3.3, "status": "OK"},
        {"id": "EQ002", "temperature": 88.1, "voltage": 3.1, "status": "Warning"},
        {"id": "EQ003", "temperature": 92.0, "voltage": 2.9, "status": "Fault"},
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

