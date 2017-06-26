# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import json

# Create your models here.

class Demo(models.Model):
    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True)
    userid = models.IntegerField()
    coverImage = models.CharField(max_length=300)
    footerMessage = models.CharField(max_length=400)
    address = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    terminal = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    token = models.CharField(max_length=200)
    status = models.CharField(max_length=100)

class InputComponent(models.Model):
    id = models.IntegerField(primary_key=True)
    baseComponentId = models.IntegerField()
    props = models.TextField()
    demo = models.OneToOneField(Demo, on_delete=models.CASCADE)
    userid = models.IntegerField()

    def setprops(self, props):
    	self.props = json.dumps(props)

    def getprops(self):
    	return json.loads(self.props)

class OutputComponent(models.Model):
    id = models.IntegerField(primary_key=True)
    baseComponentId = models.IntegerField()
    props = models.TextField()
    demo = models.OneToOneField(Demo, on_delete=models.CASCADE)
    userid = models.IntegerField()
    
    def setprops(self, props):
    	self.props = json.dumps(props)

    def getprops(self):
    	return json.loads(self.props)


class Permalink(models.Model):
    shortRelativeURL = models.CharField(max_length=100)
    fullRelativeURL = models.CharField(max_length=300)
    demoid = models.IntegerField()
    userid = models.IntegerField()

class RootSettings(models.Model):
    rootUserGithubLoginId = models.IntegerField()
    rootUserGithubLoginName = models.CharField(max_length=30)
    clientid = models.CharField(max_length=40)
    clientsecret = models.CharField(max_length=75)
    isCloudCV = models.BooleanField(default=True)
    allowNewLogins = models.BooleanField(default=True)
    appip = models.CharField(max_length=30)
    port = models.CharField(max_length=5)