# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import json
# Create your models here.


class Demo(models.Model):
    """
    This model stores all Origami demos
    """
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
    """
    This model stores all input components, such as
    the image input and text input components.
    An instance of InputComponent can only belong to one demo.
    """
    base_component_id = models.IntegerField()
    props = models.TextField()
    demo = models.OneToOneField(Demo)
    user_id = models.IntegerField()

    def setprops(self, props):
        self.props = json.dumps(props)

    def getprops(self):
        return json.loads(self.props)


class OutputComponent(models.Model):
    """
    This model stores all output components, such as
    AreaGraphOutput, BarGraphOutput, ImageOutput, PieChartOutput,
    ScatterGraphOutput and TextOutput.
    An instance of OutputComponent can only belong to one demo.
    """
    base_component_id = models.IntegerField()
    props = models.TextField()
    demo = models.OneToOneField(Demo)
    user_id = models.IntegerField()

    def setprops(self, props):
        self.props = json.dumps(props)

    def getprops(self):
        return json.loads(self.props)


class Permalink(models.Model):
    """
    This model stores permalinks (a static hyperlink)
    to projects.
    """
    short_relative_url = models.CharField(max_length=100)
    full_relative_url = models.CharField(max_length=300)
    project_id = models.IntegerField()
    user_id = models.IntegerField()


class RootSettings(models.Model):
    """
    This model stores settings for a the root user.
    There is only one instance of this model for the app.
    """
    root_user_github_login_id = models.IntegerField()
    root_user_github_login_name = models.CharField(max_length=30)
    client_id = models.CharField(max_length=40)
    client_secret = models.CharField(max_length=75)
    is_cloudcv = models.BooleanField(default=True)
    allow_new_logins = models.BooleanField(default=True)
    app_ip = models.CharField(max_length=75)
    port = models.CharField(max_length=5)


class SampleInput(models.Model):
    """
    This models stores a sample input, either an image or a text string,
    for a demo. Type_of_input is 3 for an image.
    """
    demo = models.ForeignKey(Demo)
    type_of_input = models.IntegerField()
    value = models.CharField(max_length=300)
