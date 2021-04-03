from server import db
from .notebook import Notebook
from bson import ObjectId


class User(db.Document):
    name = db.StringField(required=True)
    email = db.StringField(required=True)
    password = db.StringField(required=True)
    notebooks = db.ListField(db.EmbeddedDocumentField(Notebook))

    def add_new_notebook(self, name):
        notebook = Notebook(_id=ObjectId(), name=name)
        notebook.add_new_page("New page", "", "")
        self.notebooks.append(notebook)
        self.save()
        return notebook

    def get_notebook(self, id):
        for notebook in self.notebooks:
            if str(notebook._id) == id:
                return notebook
        return None

    def delete_notebook(self, id):
        self.update(pull__notebooks___id=id)

    def to_json(self):
        return {"id": str(self.id), "name": self.name, "email": self.email, "password": self.password,
                "notebooks": [n.to_json() for n in self.notebooks]}
