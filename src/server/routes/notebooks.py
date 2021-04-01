from server import db
from flask import request, Response, jsonify
from flask_cors import CORS, cross_origin
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

    def to_json(self):
        return {"id": str(self.id), "name": self.name, "pages": [p.to_json() for p in self.pages]}


@routes.route("/notebooks", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_all_notebooks():
    ''' Gets all user notebooks '''
    res = []
    for notebook in Notebook.objects:
        res.append(notebook.to_json())

    return jsonify(res)

@routes.route("/notebook", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_notebook():
    ''' Creates notebook with given name and empty page '''
    name = request.args.get('name')
    notebook = Notebook(name=name).save()
    notebook.add_new_page("New page", "", "")
    return notebook.to_json()

@routes.route("/notebook", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_notebook():
    ''' Deletes notebook '''
    id = request.args.get('id')
    notebook = Notebook.objects.get_or_404(id=id)
    notebook.delete()
    return Response(status=200)

@routes.route("/notebook", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_notebook_by_id():
    ''' Gets user notebook by id '''
    id = request.args.get('id')
    notebook = Notebook.objects.get_or_404(id=id)
    return notebook.to_json()


@routes.route("/notebook/<id>/page", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_page_of_notebook(id):
    ''' Creates a notebook page by id '''
    body = request.get_json()
    # newuid = ObjectId()
    # page = Pages(_id=newuid, title=body["title"], date=body["date"], text=body["text"], metadata=body["metadata"])
    notebook = Notebook.objects.get(id=id)
    notebook.add_new_page(title=body["title"], body=body["body"], metadata=body["metadata"])
    # notebook.pages.append(page)
    # notebook.save()
    return Response(status=200)

@routes.route("/notebook/<nid>/page/<pid>", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_page_of_notebook(nid, pid):
    ''' Gets a page of notebook '''
    notebook = Notebook.objects.get_or_404(id=nid)

    for p in notebook.pages:
        if str(p._id) == pid:
            return {
                "id": str(p._id),
                "title": p.title,
                "date": p.date,
                "text": p.text,
                "metadata": p.metadata
            }, 200
        return Response(status=404)         # FIXME: returns 404 if page has index 1, 2, etc

@routes.route("/notebook/<id>", methods=["PUT"])
@cross_origin(supports_credentials=True)
def update_notebook(id):
    ''' Updates notebook name '''
    body = request.get_json()
    notebook = Notebook.objects.get_or_404(id=id)
    notebook.name = body['name']
    notebook.save()
    return Response(status=200)



# @routes.route("/notebook/<nid>/page/<pid>", methods=["DELETE"])
# def delete_page(nid, pid):
#     notebook = Notebook.objects.get_or_404(id=nid)
#     notebook.update(pull__pages__id=pid)
#     # for p in notebook.pages:
#     #     if str(p._id) == pid:
#     #         notebook.pages.update(pull___id=pid)
#     return Response(status=200)


# TODO: update https://stackoverflow.com/questions/12387478/updating-a-list-of-embedded-documents-in-mongoengine
# https://gist.github.com/pingwping/92219a8a1e9d44e1dd8a
# TODO: update page of notebook
