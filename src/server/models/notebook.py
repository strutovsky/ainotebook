from server import db
from .pages import Pages
from bson import ObjectId

class Notebook(db.EmbeddedDocument):
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