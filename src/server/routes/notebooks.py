from server import db
from flask import request, Response, jsonify
from bson import ObjectId
from . import routes


class Pages(db.EmbeddedDocument):
    _id = db.ObjectIdField()
    title = db.StringField()
    date = db.StringField()  # TODO: DateTimeField
    text = db.StringField()
    metadata = db.StringField()


class Notebook(db.Document):
    name = db.StringField(required=True)
    pages = db.ListField(db.EmbeddedDocumentField(Pages))

    def to_json(self):
        return {"name": self.name, "pages": self.pages}


@routes.route("/notebook", methods=["POST"])
def create_notebook():
    ''' Creates notebook with given name '''
    body = request.get_json()
    notebook = Notebook(**body).save()
    return {"id": str(notebook.id), "name": notebook.name}, 200


@routes.route("/notebooks", methods=["GET"])
def get_all_notebooks():
    ''' Gets all user notebooks '''
    res = []
    for notebook in Notebook.objects:
        res.append({"id": str(notebook.id), "name": notebook.name, "pages": [{"title": page.title,
                                                                              "id": str(page._id)} for page in
                                                                             notebook.pages]})
    return jsonify(res), 200


@routes.route("/notebook/<id>", methods=["GET"])
def get_notebook_by_id(id):
    ''' Gets user notebook by id '''
    body = request.get_json()
    notebook = Notebook.objects.get(id=id)
    return {"id": str(notebook.id), "name": notebook.name, "pages": [{
        "id": str(page._id),
        "title": page.title,
        "date": page.date,
        "metadata": page.metadata
    } for page in notebook.pages]}, 200


@routes.route("/notebook/<id>/page", methods=["POST"])
def create_page_of_notebook(id):
    ''' Creates a notebook page by id '''
    body = request.get_json()
    newuid = ObjectId()
    page = Pages(_id=newuid, title=body["title"], date=body["date"], text=body["text"], metadata=body["metadata"])
    notebook = Notebook.objects.get(id=id)
    notebook.pages.append(page)
    notebook.save()
    return "200"

# TODO: update https://stackoverflow.com/questions/12387478/updating-a-list-of-embedded-documents-in-mongoengine
# https://gist.github.com/pingwping/92219a8a1e9d44e1dd8a
