from flask import Flask, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin
from routes import *

app = Flask(__name__)
CORS(app, support_credentials=True)
app.register_blueprint(routes)

db = MongoEngine()
app.config["MONGODB_SETTINGS"] = {"host": f"mongodb://root:secret@127.0.0.1:8000/test?authSource=admin"}
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'
db.init_app(app)


@app.route("/")
@cross_origin(supports_credentials=True)
def root():
    response = jsonify(message="Welcome")
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
