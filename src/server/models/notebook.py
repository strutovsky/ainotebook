from server import db
from .pages import Pages
from bson import ObjectId
from werkzeug.exceptions import NotFound



class Notebook(db.EmbeddedDocument):
    _id = db.ObjectIdField()
    name = db.StringField(required=True)
    pages = db.ListField(db.EmbeddedDocumentField(Pages))

    def add_new_page(self, title, body, metadata):
        page = Pages(_id=ObjectId(), title=title, body=body, metadata=metadata)
        self.pages.append(page)

    def get_page(self, id):
        for page in self.pages:
            if str(page._id) == id:
                return page
        raise NotFound(description="No page with such ID")

    def delete_page(self, id):
        for p in self.pages:
            if p.to_json()["id"] == id:
                self.pages.remove(p)

    def to_json(self):
        return {"id": str(self._id), "name": self.name, "pages": [p.to_json() for p in self.pages]}
