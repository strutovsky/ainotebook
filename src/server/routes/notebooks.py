from server import db
from flask import request, Response
from . import routes


class Notebook(db.Document):
    content = db.StringField(required=True)

    def to_json(self):
        return {"content": self.content}


@routes.route("/notebooks", methods=["POST"])
def create_notebook():
    body = request.get_json()
    notebook = Notebook(**body).save()
    id = notebook.id
    return {"id": str(id)}, 200


@routes.route("/notebooks", methods=["GET"])
def get_all_notebooks():
    notebooks = Notebook.objects().to_json()
    return Response(notebooks, mimetype="application/json", status=200)


@routes.route("/notebooks/<id>", methods=["GET"])
def get_notebook(id):
    body = request.get_json()
    notebook = Notebook.objects.get(id=id)
    return notebook.to_json()
