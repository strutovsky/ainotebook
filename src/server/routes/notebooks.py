from server import db
from flask import request, Response, jsonify
from bson import ObjectId
from . import routes
import datetime

class Pages(db.EmbeddedDocument):
    _id = db.IntField(required=True)
    title = db.StringField(verbose_name="Title", required=True)
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    body = db.StringField(verbose_name="Note", required=True)
    metadata = db.StringField()


class Notebook(db.Document):
    name = db.StringField(required=True)
    pages = db.ListField(db.EmbeddedDocumentField('Pages'))

    def get_next_pages_id(self):
        return len(self.pages) + 1

    def add_new_page(self, title, body, metadata):
        self.update(add_to_set__pages=Pages(_id=self.get_next_pages_id(), title=title, body=body, metadata=metadata))

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
    notebook = Notebook.objects.get_or_404(id=id)
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
    # newuid = ObjectId()
    # page = Pages(_id=newuid, title=body["title"], date=body["date"], text=body["text"], metadata=body["metadata"])
    notebook = Notebook.objects.get(id=id)
    notebook.add_new_page(title=body["title"], body=body["body"], metadata=body["metadata"])
    # notebook.pages.append(page)
    # notebook.save()
    return Response(status=200)

@routes.route("/notebook/<nid>/page/<pid>", methods=["GET"])
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
def update_notebook(id):
    ''' Updates notebook name '''
    body = request.get_json()
    notebook = Notebook.objects.get_or_404(id=id)
    notebook.name = body['name']
    notebook.save()
    return Response(status=200)

@routes.route("/notebook/<id>", methods=["DELETE"])
def delete_notebook(id):
    notebook = Notebook.objects.get_or_404(id=id)
    notebook.delete()
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
