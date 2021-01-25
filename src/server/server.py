from flask import Flask
from flask_mongoengine import MongoEngine
from routes import *

app = Flask(__name__)
app.register_blueprint(routes)

db = MongoEngine()
app.config["MONGODB_SETTINGS"] = {"host": f"mongodb://root:secret@localhost:8000/test?authSource=admin"}
db.init_app(app)


@app.route("/")
def root():
    return {"root": "welcome"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
