from __future__ import unicode_literals

from mongoengine import Document, EmbeddedDocument, fields

# Create your models here.

class Demo(Document):
    id = fields.StringField(required=True, primary_key=True)
    userid = fields.IntField(required=True)
    coverImage = fields.StringField()
    footerMessage = fields.StringField()
    description = fields.StringField()
    terminal = fields.BooleanField(default=False)
    timestamp = fields.LongField(required=True)
    token = fields.StringField(required=True)
    status = fields.StringField()

class InputComponent(Document):
    id = fields.StringField(required=True, primary_key=True)
    userid = fields.IntField(required=True)
    baseComponentId = fields.IntField(required=True)
    props = fields.ListField()

class OutputComponent(Document):
    id = fields.StringField(required=True, primary_key=True)
    userid = fields.IntField(required=True)
    baseComponentId = fields.IntField(required=True)
    props = fields.ListField()

class Permalink(Document):
    shortRelativeURL = fields.StringField()
    fullRelativeURL = fields.StringField()
    userid = fields.IntField()
    demoid = fields.StringField()

class RootSettings(Document):
    rootUserGithubLoginId = fields.IntField()
    rootUserGithubLoginName = fields.StringField()
    clientid = fields.StringField()
    clientsecret = fields.StringField()
    isCloudCV = fields.BooleanField(default=True)
    allowNewLogins = fields.BooleanField(default=True)
    appip = fields.StringField()
    port = fields.StringField()