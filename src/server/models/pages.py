from server import db
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
