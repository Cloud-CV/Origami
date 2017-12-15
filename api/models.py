# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import json
# Create your models here.


class Demo(models.Model):
    """
    This model stores all Origami demos

    Fields:
        name: Demo name
        id: Demo ID
        user_id: ID of the user the demo belongs to
        cover_image: The cover image encoded as a base64 string
        footer_message: Footer message for the demo
        address: The url to the demo
        description: Description for the demo
        terminal: Whether the demo contains a terminal
        timestamp: The time at which the demo is created
        token: Project token, provided at creation of the demo, containing
            '(gh|nongh)':Address:Id:Current_Port:Port:Temp_Web_Address
        status: string, either "demo" or "input"
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

    Fields:
        base_component_id: ID of the component
        props: Component properties
        demo: Foreign key to the demo the object belongs to
        user_id: ID of the user the demo belongs to
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

    Fields:
        base_component_id: ID of the component
        props: Component properties
        demo: Foreign key to the demo the object belongs to
        user_id: ID of the user the demo belongs to
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

    Fields:
        short_relative_url: Shortened url to the demo
        full_relative_url: Full url to the demo
        project_id: ID of the project the permalink belongs to
        user_id: ID of the user the project belongs to
    """
    short_relative_url = models.CharField(max_length=100)
    full_relative_url = models.CharField(max_length=300)
    project_id = models.IntegerField()
    user_id = models.IntegerField()


class RootSettings(models.Model):
    """
    This model stores settings for a the root user.
    There is only one instance of this model for the app.

    Fields:
        root_user_github_login_id: Github login ID of root user
        root_user_github_login_name: Github login name of root user
        client_id: Github client ID
        client_secret: Github client secret
        is_cloudcv: True if this deployment is by CloudCV
        allow_new_logins: Whether other users can login and create demos
        app_ip: IP where origami-lib is running
        port: port for origami-lib to run
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
    for a demo.

    Fields:
        demo: Foreign key to the demo that the SampleInput belongs to
        type_of_input: 3 for an image, the rest are not defined yet
        value: Path to the image file
    """
    demo = models.ForeignKey(Demo)
    type_of_input = models.IntegerField()
    value = models.CharField(max_length=300)
