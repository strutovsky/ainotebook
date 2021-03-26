from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin
from routes import *

app = Flask(__name__)
CORS(app, support_credentials=True)
app.register_blueprint(routes)

db = MongoEngine()
app.config["MONGODB_SETTINGS"] = {"host": f"mongodb://root:secret@127.0.0.1:8000/test?authSource=admin"}
db.init_app(app)


@app.route("/")
@cross_origin(supports_credentials=True)
def root():
    response = jsonify(message="Welcome")
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
