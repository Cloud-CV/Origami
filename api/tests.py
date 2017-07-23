# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase, Client
import datetime
import json
from api.constants import DEFAULT_IMAGE
from .models import *

# Create your tests here.


class CustomDemoControllerViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.demo = {
            "name": "test",
            "id": 99,
            "user_id": 99,
            "address": "address",
            "description": "description",
            "footer_message": "footer_message",
            "cover_image": "cover_image",
            "terminal": True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token": "token",
            "status": "input"
        }
        Demo.objects.create(name=self.demo["name"], id=self.demo["id"],
                            user_id=self.demo[
                                "user_id"], address=self.demo["address"],
                            description=self.demo["description"],
                            footer_message=self.demo["footer_message"],
                            cover_image=self.demo["cover_image"],
                            terminal=self.demo[
                                "terminal"], timestamp=self.demo["timestamp"],
                            token=self.demo["token"], status=self.demo["status"])

    def test_get_all_demos(self):
        response = self.client.get('/api/demo/user/99')
        responses = json.loads(response.content.decode('utf-8'))
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["user_id"], self.demo["user_id"])

    def test_get_one_demo(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(payload["id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["address"], payload["address"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["footer_message"], payload["footer_message"])
        self.assertEqual(response["cover_image"], payload["cover_image"])
        self.assertEqual(response["terminal"], payload["terminal"])
        self.assertEqual(response["token"], payload["token"])
        self.assertEqual(response["status"], payload["status"])

    def test_create_demo(self):

        payload = {
            "name": "1",
            "id": 1,
            "user_id": 100,
            "address": "localhost",
            "description": "test",
            "footer_message": "test",
            "cover_image": "",
            "terminal": True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token": "nongh",
            "status": "input"
        }
        response = self.client.post('/api/demo/100', json.dumps(payload),
                                    content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["address"], payload["address"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["footer_message"], payload["footer_message"])
        self.assertEqual(response["cover_image"], DEFAULT_IMAGE)
        self.assertEqual(response["terminal"], payload["terminal"])
        self.assertEqual(response["token"], payload["token"])
        self.assertEqual(response["status"], payload["status"])

    def test_put_demo(self):
        payload = self.demo
        payload["name"] = "Not Test"
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                                   content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["address"], payload["address"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["footer_message"], payload["footer_message"])
        self.assertEqual(response["cover_image"], payload["cover_image"])
        self.assertEqual(response["terminal"], payload["terminal"])
        self.assertEqual(response["token"], payload["token"])
        self.assertEqual(response["status"], payload["status"])

    def test_delete_demo(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.delete(url)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["removed"], True)


class CustomComponentControllerTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.demo = {
            "name": "test",
            "id": 99,
            "user_id": 99,
            "address": "address",
            "description": "description",
            "footer_message": "footer_message",
            "cover_image": "cover_image",
            "terminal": True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token": "token",
            "status": "input"
        }
        self.demo_object = Demo.objects.create(name=self.demo["name"], id=self.demo["id"],
                                               user_id=self.demo[
                                                   "user_id"], address=self.demo["address"],
                                               description=self.demo[
                                                   "description"],
                                               footer_message=self.demo[
                                                   "footer_message"],
                                               cover_image=self.demo[
                                                   "cover_image"],
                                               terminal=self.demo[
                                                   "terminal"], timestamp=self.demo["timestamp"],
                                               token=self.demo["token"], status=self.demo["status"])

        self.input_component = {
            "id": self.demo_object.id,
            "base_component_id": 1,
            "props": json.dumps([{}]),
            "user_id": 99,
            "demo": self.demo_object
        }

        self.input_component_object = InputComponent.objects.create(id=self.input_component["id"],
                                                                    base_component_id=self.input_component[
                                                                        "base_component_id"],
                                                                    props=self.input_component[
                                                                        "props"], user_id=self.input_component["user_id"],
                                                                    demo=self.input_component["demo"])

        self.output_component = {
            "id": self.demo_object.id,
            "base_component_id": 1,
            "props": json.dumps([{}]),
            "user_id": 99,
            "demo": self.demo_object
        }

        self.output_component_object = OutputComponent.objects.create(id=self.input_component["id"],
                                                                      base_component_id=self.input_component[
                                                                          "base_component_id"],
                                                                      props=self.input_component[
                                                                          "props"], user_id=self.input_component["user_id"],
                                                                      demo=self.input_component["demo"])

    def test_get_one_input_component(self):
        payload = self.input_component
        url = '/api/inputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_get_all_input_component_one_user(self):
        payload = self.input_component
        url = '/api/inputcomponent/' + str(payload["user_id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_create_input_component(self):
        payload = {
            "id": 500,
            "base_component_id": 2,
            "props": [u'', u'label'],
            "user_id": 100,
        }
        demo = Demo.objects.create(name=self.demo["name"], id="500",
                                   user_id=self.demo[
                                       "user_id"], address=self.demo["address"],
                                   description=self.demo["description"],
                                   footer_message=self.demo["footer_message"],
                                   cover_image=self.demo["cover_image"],
                                   terminal=self.demo[
                                       "terminal"], timestamp=self.demo["timestamp"],
                                   token=self.demo["token"], status=self.demo["status"])
        url = '/api/inputcomponent/'
        response = self.client.post(url, json.dumps(payload),
                                    content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        payload["props"] = '[{}, "label"]'
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_modify_input_component(self):
        payload = self.input_component
        payload["base_component_id"] = 3
        payload["props"] = [u'']
        payload.pop("demo", None)
        url = '/api/inputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                                   content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        payload["props"] = [{}]
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], str(payload["props"]))
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_delete_input_component(self):
        payload = self.input_component
        url = '/api/inputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.delete(url)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["removed"], True)

    def test_get_one_output_component(self):
        payload = self.output_component
        url = '/api/outputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_get_all_output_component_one_user(self):
        payload = self.output_component
        url = '/api/outputcomponent/' + str(payload["user_id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(json.dumps(response["props"]), payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_create_output_component(self):
        payload = {
            "id": 500,
            "base_component_id": 2,
            "props": [u'', u'label'],
            "user_id": 100,
        }
        demo = Demo.objects.create(name=self.demo["name"], id="500",
                                   user_id=self.demo[
                                       "user_id"], address=self.demo["address"],
                                   description=self.demo["description"],
                                   footer_message=self.demo["footer_message"],
                                   cover_image=self.demo["cover_image"],
                                   terminal=self.demo[
                                       "terminal"], timestamp=self.demo["timestamp"],
                                   token=self.demo["token"], status=self.demo["status"])
        url = '/api/outputcomponent/'
        response = self.client.post(url, json.dumps(payload),
                                    content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        payload["props"] = '[{}, "label"]'
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_modify_output_component(self):
        payload = self.output_component
        payload["base_component_id"] = 3
        payload["props"] = [u'']
        payload.pop("demo", None)
        url = '/api/outputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                                   content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        payload["props"] = [{}]
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], str(payload["props"]))
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_delete_output_component(self):
        payload = self.output_component
        url = '/api/outputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.delete(url)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["removed"], True)


class CustomPermalinkControllerTests(TestCase):

    def setUp(self):
        self.permalink = {
            "short_relative_url": "/p/1az",
            "full_relative_url": "/qwerty/zxcvb/demo",
            "project_id": 20,
            "user_id": 20
        }
        Permalink.objects.create(short_relative_url=self.permalink["short_relative_url"],
                                 full_relative_url=self.permalink[
                                     "full_relative_url"],
                                 project_id=self.permalink["project_id"],
                                 user_id=self.permalink["user_id"])

    def test_getpermalink_fn(self):
        payload = self.permalink
        payload["short_relative_url"] = payload[
            "short_relative_url"].split('/')[-1]
        url = '/api/getpermalink/' + payload["short_relative_url"]
        responses = self.client.get(url)
        # It returns a list containing a single demo object
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["project_id"], payload["project_id"])
        self.assertEqual(response["short_relative_url"],
                         payload["short_relative_url"])
        self.assertEqual(response["full_relative_url"],
                         payload["full_relative_url"])

    def test_get_one_permalink(self):
        payload = self.permalink
        url = '/api/permalink/' + \
            str(payload["user_id"]) + '/' + str(payload["project_id"])
        response = self.client.get(url)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["project_id"], payload["project_id"])
        self.assertEqual(response["short_relative_url"],
                         payload["short_relative_url"])
        self.assertEqual(response["full_relative_url"],
                         payload["full_relative_url"])

    def test_get_all_user_permalink(self):
        payload = self.permalink
        url = '/api/permalink/' + str(payload["user_id"])
        responses = self.client.get(url)
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["project_id"], payload["project_id"])
        self.assertEqual(response["short_relative_url"],
                         payload["short_relative_url"])
        self.assertEqual(response["full_relative_url"],
                         payload["full_relative_url"])

    def test_create_permalink(self):
        payload = {
            "short_relative_url": "/p/ppoqw",
            "full_relative_url": "/asdfgh/lkjh/demo",
            "project_id": 10,
            "user_id": 10
        }
        url = '/api/permalink/'
        response = self.client.post(url, json.dumps(payload),
                                    content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["project_id"], payload["project_id"])
        self.assertEqual(response["short_relative_url"],
                         payload["short_relative_url"])
        self.assertEqual(response["full_relative_url"],
                         payload["full_relative_url"])

    def test_modify_permalink(self):
        payload = self.permalink
        payload["short_relative_url"] = '/p/qazxsw'
        url = '/api/permalink/' + \
            str(payload["user_id"]) + '/' + str(payload["project_id"])
        response = self.client.put(url, json.dumps(payload),
                                   content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["project_id"], payload["project_id"])
        self.assertEqual(response["short_relative_url"],
                         payload["short_relative_url"])
        self.assertEqual(response["full_relative_url"],
                         payload["full_relative_url"])

    def test_delete_permalink(self):
        payload = self.permalink
        url = '/api/permalink/' + \
            str(payload["user_id"]) + '/' + str(payload["project_id"])
        response = self.client.delete(url)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["removed"], True)
