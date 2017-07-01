# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase, Client
import datetime
import json
from .models import *

# Create your tests here.

class CustomDemoControllerViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.demo = {
            "name": "test",
            "id"  : 99,
            "userid" : 99,
            "address" : "address",
            "description" : "description",
            "footerMessage" : "footerMessage",
            "coverImage": "coverImage",
            "terminal" : True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token" : "token",
            "status" : "input"
        }
        Demo.objects.create(name=self.demo["name"], id=self.demo["id"], 
                userid=self.demo["userid"], address=self.demo["address"], 
                description=self.demo["description"], 
                footerMessage=self.demo["footerMessage"],
                coverImage=self.demo["coverImage"], 
                terminal=self.demo["terminal"], timestamp=self.demo["timestamp"],
                token=self.demo["token"], status=self.demo["status"]) 

    def test_get_all_demos(self):
        response = self.client.get('/api/demo/user/99')
        responses = json.loads(response.content)
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["userid"], self.demo["userid"])

    def test_get_one_demo(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["userid"]) + '/' + str(payload["id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content)[0]
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], str(payload["id"]))
        self.assertEqual(response["userid"], payload["userid"])
        self.assertEqual(response["address"], payload["address"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["footerMessage"], payload["footerMessage"])
        self.assertEqual(response["coverImage"], payload["coverImage"])
        self.assertEqual(response["terminal"], payload["terminal"])
        self.assertEqual(response["token"], payload["token"])
        self.assertEqual(response["status"], payload["status"])

    def test_create_demo(self):
        
        payload = {
            "name": "1",
            "id"  : 1,
            "userid" : 100,
            "address" : "localhost",
            "description" : "test",
            "footerMessage" : "test",
            "coverImage": "",
            "terminal" : True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token" : "nongh",
            "status" : "input"
        }
        response = self.client.post('/api/demo/100', json.dumps(payload),
                     content_type="application/json")
        response = json.loads(response.content)
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], str(payload["id"]))
        self.assertEqual(response["userid"], payload["userid"])
        self.assertEqual(response["address"], payload["address"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["footerMessage"], payload["footerMessage"])
        self.assertEqual(response["coverImage"], payload["coverImage"])
        self.assertEqual(response["terminal"], payload["terminal"])
        self.assertEqual(response["token"], payload["token"])
        self.assertEqual(response["status"], payload["status"])
    
    def test_put_demo(self):
        payload = self.demo
        payload["name"] = "Not Test"
        url = '/api/demo/' + str(payload["userid"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                     content_type="application/json")
        response = json.loads(response.content)
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], str(payload["id"]))
        self.assertEqual(response["userid"], payload["userid"])
        self.assertEqual(response["address"], payload["address"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["footerMessage"], payload["footerMessage"])
        self.assertEqual(response["coverImage"], payload["coverImage"])
        self.assertEqual(response["terminal"], payload["terminal"])
        self.assertEqual(response["token"], payload["token"])
        self.assertEqual(response["status"], payload["status"])

    def test_delete_demo(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["userid"]) + '/' + str(payload["id"])
        response = self.client.delete(url)
        response = json.loads(response.content)
        self.assertEqual(response["removed"], True)


class CustomComponentControllerTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.demo = {
            "name": "test",
            "id"  : 99,
            "userid" : 99,
            "address" : "address",
            "description" : "description",
            "footerMessage" : "footerMessage",
            "coverImage": "coverImage",
            "terminal" : True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token" : "token",
            "status" : "input"
        }
        self.demo_object = Demo.objects.create(name=self.demo["name"], id=self.demo["id"], 
                userid=self.demo["userid"], address=self.demo["address"], 
                description=self.demo["description"], 
                footerMessage=self.demo["footerMessage"],
                coverImage=self.demo["coverImage"], 
                terminal=self.demo["terminal"], timestamp=self.demo["timestamp"],
                token=self.demo["token"], status=self.demo["status"]) 

        self.input_component = {
            "id" : self.demo_object.id,
            "baseComponentId" : 1,
            "props" : json.dumps([{}]),
            "userid" : 99,
            "demo" : self.demo_object
        }

        self.input_component_object = InputComponent.objects.create(id=self.input_component["id"],
                                    baseComponentId=self.input_component["baseComponentId"], 
                                    props=self.input_component["props"], userid=self.input_component["userid"],
                                    demo=self.input_component["demo"])

        self.output_component = {
            "id" : self.demo_object.id,
            "baseComponentId" : 1,
            "props" : json.dumps([{}]),
            "userid" : 99,
            "demo" : self.demo_object
        }

        self.output_component_object = OutputComponent.objects.create(id=self.input_component["id"],
                                    baseComponentId=self.input_component["baseComponentId"], 
                                    props=self.input_component["props"], userid=self.input_component["userid"],
                                    demo=self.input_component["demo"])

    def test_get_one_input_component(self):
        payload = self.input_component
        url = '/api/inputcomponent/' + str(payload["userid"]) + '/' + str(payload["id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content)[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_get_all_input_component_one_user(self):
        payload = self.input_component
        url = '/api/inputcomponent/' + str(payload["userid"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content)[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_create_input_component(self):
        payload = {
            "id" : 500,
            "baseComponentId" : 2,
            "props" : json.dumps([{}, {}]),
            "userid" : 100,
        }
        demo = Demo.objects.create(name=self.demo["name"], id="500", 
                userid=self.demo["userid"], address=self.demo["address"], 
                description=self.demo["description"], 
                footerMessage=self.demo["footerMessage"],
                coverImage=self.demo["coverImage"], 
                terminal=self.demo["terminal"], timestamp=self.demo["timestamp"],
                token=self.demo["token"], status=self.demo["status"]) 
        url =  '/api/inputcomponent/'
        response = self.client.post(url, json.dumps(payload),
                     content_type="application/json")
        response = json.loads(response.content)
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_modify_input_component(self):
        payload = self.input_component
        payload["baseComponentId"] = 3
        payload.pop("demo", None)
        url =  '/api/inputcomponent/' + str(payload["userid"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                     content_type="application/json")
        response = json.loads(response.content)
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_delete_input_component(self):
        payload = self.input_component
        payload["baseComponentId"] = 3
        payload.pop("demo", None)
        url =  '/api/inputcomponent/' + str(payload["userid"]) + '/' + str(payload["id"])
        response = self.client.delete(url)
        response = json.loads(response.content)
        self.assertEqual(response["removed"], True)

    def test_get_one_output_component(self):
        payload = self.output_component
        url = '/api/outputcomponent/' + str(payload["userid"]) + '/' + str(payload["id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content)[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_get_all_output_component_one_user(self):
        payload = self.output_component
        url = '/api/outputcomponent/' + str(payload["userid"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content)[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_create_output_component(self):
        payload = {
            "id" : 500,
            "baseComponentId" : 2,
            "props" : json.dumps([{}, {}]),
            "userid" : 100,
        }
        demo = Demo.objects.create(name=self.demo["name"], id="500", 
                userid=self.demo["userid"], address=self.demo["address"], 
                description=self.demo["description"], 
                footerMessage=self.demo["footerMessage"],
                coverImage=self.demo["coverImage"], 
                terminal=self.demo["terminal"], timestamp=self.demo["timestamp"],
                token=self.demo["token"], status=self.demo["status"]) 
        url =  '/api/outputcomponent/'
        response = self.client.post(url, json.dumps(payload),
                     content_type="application/json")
        response = json.loads(response.content)
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_modify_output_component(self):
        payload = self.output_component
        payload["baseComponentId"] = 3
        payload.pop("demo", None)
        url =  '/api/outputcomponent/' + str(payload["userid"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                     content_type="application/json")
        response = json.loads(response.content)
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["baseComponentId"], payload["baseComponentId"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["userid"], payload["userid"])

    def test_delete_output_component(self):
        payload = self.output_component
        payload["baseComponentId"] = 3
        payload.pop("demo", None)
        url =  '/api/outputcomponent/' + str(payload["userid"]) + '/' + str(payload["id"])
        response = self.client.delete(url)
        response = json.loads(response.content)
        self.assertEqual(response["removed"], True)
