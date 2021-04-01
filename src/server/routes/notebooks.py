from server import db
from flask import request, Response, jsonify
from flask_cors import cross_origin
from bson import ObjectId
from . import routes
import datetime


class Pages(db.EmbeddedDocument):
    _id = db.ObjectIdField()
    title = db.StringField(verbose_name="Title", required=True)
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    body = db.StringField(verbose_name="Note", required=True)
    metadata = db.StringField(verbose_name="Metadata")

    def to_json(self):
        return {"id": str(self._id), "title": self.title, "create_at": self.created_at,
                "body": self.body, "metadata": self.metadata}


class Notebook(db.Document):
    name = db.StringField(required=True)
    pages = db.ListField(db.EmbeddedDocumentField(Pages))

    def add_new_page(self, title, body, metadata):
        page = Pages(_id=ObjectId(), title=title, body=body, metadata=metadata)
        self.pages.append(page)
        self.save()

    def get_page(self, id):
        for page in self.pages:
            if str(page._id) == id:
                return page
        return None

    def delete_page(self, id):
        self.update(pull__pages___id=id)

    def update_name(self, name):
        self.name = name
        self.save()

    def to_json(self):
        return {"id": str(self.id), "name": self.name, "pages": [p.to_json() for p in self.pages]}


@routes.route("/notebooks", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_all_notebooks():
    # Gets all user notebooks
    res = []
    for notebook in Notebook.objects:
        res.append(notebook.to_json())

    return jsonify(res)


@routes.route("/notebook", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_notebook():
    # Creates notebook with given name and empty page
    name = request.args.get('name')
    notebook = Notebook(name=name).save()
    notebook.add_new_page("New page", "", "")
    return notebook.to_json()


@routes.route("/notebook", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_notebook():
    # Deletes notebook
    id = request.args.get('nid')
    notebook = Notebook.objects.get_or_404(id=id)
    notebook.delete()
    return Response(status=200)


@routes.route("/notebook", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_notebook_by_id():
    # Gets user notebook by id
    id = request.args.get('nid')
    notebook = Notebook.objects.get_or_404(id=id)
    return notebook.to_json()


@routes.route("/notebook", methods=["PUT"])
@cross_origin(supports_credentials=True)
def update_notebook():
    # Updates notebook name
    nid = request.args.get('nid')
    name = request.args.get('name')
    notebook = Notebook.objects.get_or_404(id=nid)
    notebook.update_name(name)
    return Response(status=200)


@routes.route("/page", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_page_of_notebook():
    # Creates a notebook page by id
    body = request.get_json()
    notebook = Notebook.objects.get(id=body["nid"])
    notebook.add_new_page(title=body["title"], body=body["body"], metadata=body["metadata"])
    return Response(status=200)


@routes.route("/page", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_page_of_notebook():
    # Gets a page of notebook
    nid = request.args.get('nid')
    pid = request.args.get('pid')
    notebook = Notebook.objects.get_or_404(id=nid)

    if not notebook.pages:
        return Response(status=404)

    page = notebook.get_page(pid)

    return page.to_json() if page else Response(status=404)


@routes.route("/page", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_page():
    # Deletes page by id
    nid = request.args.get('nid')
    pid = request.args.get('pid')
    notebook = Notebook.objects.get_or_404(id=nid)
    notebook.delete_page(pid)
    return Response(status=200)

@routes.route("/page", methods=["PUT"])
@cross_origin(supports_credentials=True)
def update_page():
    body = request.get_json()
    notebook = Notebook.objects.get(id=body["nid"])
    page = notebook.get_page(body["pid"])

    if page:
        page.title = body["title"]
        page.body = body["body"]
        page.metadata = body["metadata"]

        notebook.save()
        return Response(status=200)

    return Response(status=404)
