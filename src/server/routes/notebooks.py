from server import db
from flask import request, Response, jsonify, session, make_response
from flask_cors import cross_origin
from . import routes
from bson import ObjectId
from werkzeug.exceptions import Unauthorized
from models import Notebook, User


@routes.route("/notebooks", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_all_notebooks():
    # Gets all user notebooks

    if 'logged_id' in session:
        res = []
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)
        for notebook in user.notebooks:
            res.append(notebook.to_json())

        return jsonify(res), 200

    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/notebook", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_notebook():
    # Creates notebook with given name and empty page

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)
        name = request.args.get('name')

        notebook = user.add_new_notebook(name)
        return notebook.to_json()
    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/notebook", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_notebook():
    # Deletes notebook

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)
        id = request.args.get('nid')
        user.delete_notebook(id)
        return Response(status=200)
    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/notebook", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_notebook_by_id():
    # Gets user notebook by id

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)
        id = request.args.get('nid')

        if not user.notebooks:
            return Response(status=204)
        notebook = user.get_notebook(id)
        return notebook.to_json() if notebook else Response(status=404)
    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/notebook", methods=["PUT"])
@cross_origin(supports_credentials=True)
def update_notebook():
    # Updates notebook name

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)

        nid = request.args.get('nid')
        name = request.args.get('name')
        notebook = user.get_notebook(nid)
        notebook.name = name
        user.save()
        return Response(status=200)
    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/page", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_page_of_notebook():
    # Creates a notebook page by id

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)

        body = request.get_json()

        notebook = user.get_notebook(body["nid"])
        notebook.add_new_page(title=body["title"], body=body["body"], metadata=body["metadata"])
        user.save()
        return Response(status=200)
    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/page", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_page_of_notebook():
    # Gets a page of notebook

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)

        nid = request.args.get('nid')
        pid = request.args.get('pid')

        notebook = user.get_notebook(nid)

        if not notebook.pages:
            return Response(status=404)

        page = notebook.get_page(pid)

        return page.to_json() if page else Response(status=404)
    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/page", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_page():
    # Deletes page by id

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)

        nid = request.args.get('nid')
        pid = request.args.get('pid')

        notebook = user.get_notebook(nid)
        notebook.delete_page(pid)
        user.save()
        return Response(status=200)
    else:
        return Unauthorized(description="Need to authorize")


@routes.route("/page", methods=["PUT"])
@cross_origin(supports_credentials=True)
def update_page():
    # Updates page

    if 'logged_id' in session:
        user_id = session["user"]["id"]
        user = User.objects.get_or_404(id=user_id)

        body = request.get_json()
        notebook = user.get_notebook(body["nid"])
        page = notebook.get_page(body["pid"])

        if page:
            page.title = body["title"]
            page.body = body["body"]
            page.metadata = body["metadata"]

            user.save()
            return Response(status=200)

        return Response(status=404)
    else:
        return Unauthorized(description="Need to authorize")
