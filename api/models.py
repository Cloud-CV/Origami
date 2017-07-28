# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import json
# Create your models here.


class Demo(models.Model):
    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    cover_image = models.TextField(blank=False, null=False)
    footer_message = models.CharField(max_length=400)
    address = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    terminal = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    token = models.CharField(max_length=200)
    status = models.CharField(max_length=100)


class InputComponent(models.Model):
    base_component_id = models.IntegerField()
    props = models.TextField()
    demo = models.OneToOneField(Demo)
    user_id = models.IntegerField()

    def setprops(self, props):
        self.props = json.dumps(props)

    def getprops(self):
        return json.loads(self.props)


class OutputComponent(models.Model):
    base_component_id = models.IntegerField()
    props = models.TextField()
    demo = models.OneToOneField(Demo)
    user_id = models.IntegerField()

    def setprops(self, props):
        self.props = json.dumps(props)

    def getprops(self):
        return json.loads(self.props)


class Permalink(models.Model):
    short_relative_url = models.CharField(max_length=100)
    full_relative_url = models.CharField(max_length=300)
    project_id = models.IntegerField()
    user_id = models.IntegerField()


class RootSettings(models.Model):
    root_user_github_login_id = models.IntegerField()
    root_user_github_login_name = models.CharField(max_length=30)
    client_id = models.CharField(max_length=40)
    client_secret = models.CharField(max_length=75)
    is_cloudcv = models.BooleanField(default=True)
    allow_new_logins = models.BooleanField(default=True)
    app_ip = models.CharField(max_length=75)
    port = models.CharField(max_length=5)
