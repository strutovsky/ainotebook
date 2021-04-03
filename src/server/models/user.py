from server import db
from .notebook import Notebook


class User(db.Document):
    name = db.StringField(required=True)
    email = db.StringField(required=True)
    password = db.StringField(required=True)
    notebooks = db.ListField(db.EmbeddedDocumentField(Notebook))

    def to_json(self):
        return {"id": str(self.id), "name": self.name, "email": self.email, "password": self.password,
                "notebooks": [n.to_json() for n in self.notebooks]}
