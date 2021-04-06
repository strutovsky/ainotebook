from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
from werkzeug.utils import secure_filename
from werkzeug.exceptions import BadRequest

app = Flask(__name__)
CORS(app, support_credentials=True)

UPLOAD_FOLDER = "./static/profiles"
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/upload", methods=['POST'])
@cross_origin(supports_credentials=True)
def upload_image():
    if 'file' not in request.files:
        return BadRequest("No file part")

    file = request.files['file']
    user_id = request.form['user_id']

    if file.filename == '':
        return BadRequest("No selected file")

    if file and allowed_file(file.filename):
        filename = user_id + "." + file.filename.rsplit('.', 1)[1].lower()
        filename = secure_filename(filename)
        file.save(os.path.join(app.root_path, app.config["UPLOAD_FOLDER"], filename))
        return jsonify({"filename": filename}), 200
    return BadRequest("Bad file (perhaps not image)")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
