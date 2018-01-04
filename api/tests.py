# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
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
            "user_id": None,
            "address": "address",
            "description": "description",
            "footer_message": "footer_message",
            "cover_image": "cover_image",
            "terminal": True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token": "token",
            "status": "input",
            "username": "testname"
        }

        self.test_user = User.objects.create_user(
            username=self.demo["username"],
            email="email@email.com",
            password="password")
        # use the id assigned to test_user
        self.demo["user_id"] = self.test_user.id
        Demo.objects.create(name=self.demo["name"], id=self.demo["id"],
                            user_id=self.demo[
                                "user_id"], address=self.demo["address"],
                            description=self.demo["description"],
                            footer_message=self.demo["footer_message"],
                            cover_image=self.demo["cover_image"],
                            terminal=self.demo[
                                "terminal"], timestamp=self.demo["timestamp"],
                            token=self.demo["token"],
                            status=self.demo["status"])

        self.demo2 = {
            "name": "test2",
            "id": 999,
            "user_id": None,
            "address": "address2",
            "description": "description2",
            "footer_message": "footer_message2",
            "cover_image": "cover_image2",
            "terminal": True,
            "timestamp": datetime.datetime.now().isoformat(),
            "token": "token2",
            "status": "input2",
            "username": "testname2"
        }

        self.test_user_2 = User.objects.create_user(
        username=self.demo2["username"],
        email="email2@email.com",
        password="password2")

        #creating 2nd user
        self.demo2["user_id"] = self.test_user.id+1 
        Demo.objects.create(name=self.demo2["name"], id=self.demo2["id"],
                            user_id=self.demo2[
                                "user_id"], address=self.demo2["address"],
                            description=self.demo2["description"],
                            footer_message=self.demo2["footer_message"],
                            cover_image=self.demo2["cover_image"],
                            terminal=self.demo2[
                                "terminal"], timestamp=self.demo2["timestamp"],
                            token=self.demo2["token"],
                            status=self.demo2["status"])

    def test_get_all_user_demos(self):
        response = self.client.get('/api/demo/user/%d' %
                                   (self.demo["user_id"]))
        responses = json.loads(response.content.decode('utf-8'))
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["user_id"], self.demo["user_id"])

    def test_get_all_demos_by_name(self):
        response = self.client.get('/api/demos/',
                                   {'search_by': 'demo',
                                    'search_term': self.demo["name"]})
        responses = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(responses), 2)
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["user_id"], self.demo["user_id"])

    def test_get_all_demos_by_username(self):
        response = self.client.get('/api/demos/',
                                   {'search_term': self.demo["username"]})
        responses = json.loads(response.content.decode('utf-8'))
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["user_id"], self.demo["user_id"])

    def test_get_all_demos_none(self):
        response = self.client.get('/api/demos/', {'search_by': 'demo',
                                                   'search_term': 'not_exist'})
        responses = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(responses), 0)

    def test_get_one_demo_with_id(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(payload["id"])
        responses = self.client.get(url)
        # It returns a list containing a single demo object belonging to that
        # particular id
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

    def test_get_one_demo_without_id(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(None)
        responses = self.client.get(url)
        # It returns a list containing all the demo of that user
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

    def test_get_one_demo_without_id_and_userid(self):
        payload = self.demo
        payload2 = self.demo2 #so now there are 2 different demo of 2 diff users
        url = '/api/demo/' + str(None) + '/' + str(None)
        responses = self.client.get(url)
        # It returns a list containing all the demos preset in the database
        response = json.loads(responses.content.decode(
            'utf-8'))[0]  # returns 1st demo config
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

        response2 = json.loads(responses.content.decode(
            'utf-8'))[1]  # return second user config
        self.assertEqual(response2["name"], payload2["name"])
        self.assertEqual(response2["id"], payload2["id"])
        self.assertEqual(response2["user_id"], payload2["user_id"])
        self.assertEqual(response2["address"], payload2["address"])
        self.assertEqual(response2["description"], payload2["description"])
        self.assertEqual(response2["footer_message"],
                         payload2["footer_message"])
        self.assertEqual(response2["cover_image"], payload2["cover_image"])
        self.assertEqual(response2["terminal"], payload2["terminal"])
        self.assertEqual(response2["token"], payload2["token"])
        self.assertEqual(response2["status"], payload2["status"])

    def test_demo_not_found(self):
        payload = self.demo
        payload2 = self.demo2
        url = '/api/demo/' + \
            str(payload["user_id"]) + '/' + str(payload2["id"])
        responses = self.client.get(url)
        response = json.loads(responses.content.decode('utf-8'))
        self.assertEqual(response["text"], "Not Found")

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
        self.demo_object = Demo.objects.create(
            name=self.demo["name"],
            id=self.demo["id"],
            user_id=self.demo["user_id"],
            address=self.demo["address"],
            description=self.demo["description"],
            footer_message=self.demo["footer_message"],
            cover_image=self.demo["cover_image"],
            terminal=self.demo["terminal"],
            timestamp=self.demo["timestamp"],
            token=self.demo["token"],
            status=self.demo["status"])

        self.input_component = {
            "id": self.demo_object.id,
            "base_component_id": 1,
            "props": json.dumps([{}]),
            "user_id": 99,
            "demo": self.demo_object
        }

        self.input_component_object = InputComponent.objects.create(
            id=self.input_component["id"],
            base_component_id=self.input_component["base_component_id"],
            props=self.input_component["props"],
            user_id=self.input_component["user_id"],
            demo=self.input_component["demo"])

        self.output_component = {
            "id": self.demo_object.id,
            "base_component_id": 1,
            "props": json.dumps([{}]),
            "user_id": 99,
            "demo": self.demo_object
        }

        self.output_component_object = OutputComponent.objects.create(
            id=self.input_component["id"],
            base_component_id=self.input_component["base_component_id"],
            props=self.input_component["props"],
            user_id=self.input_component["user_id"],
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
            "props": [{"id": "1", "label": "label"}],
            "user_id": 100,
        }
        Demo.objects.create(name=self.demo["name"], id="500",
                            user_id=self.demo["user_id"],
                            address=self.demo["address"],
                            description=self.demo["description"],
                            footer_message=self.demo["footer_message"],
                            cover_image=self.demo["cover_image"],
                            terminal=self.demo["terminal"],
                            timestamp=self.demo["timestamp"],
                            token=self.demo["token"],
                            status=self.demo["status"])
        url = '/api/inputcomponent/'
        response = self.client.post(url, json.dumps(payload),
                                    content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        response["props"] = json.loads(response["props"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_modify_input_component(self):
        payload = self.input_component
        payload["base_component_id"] = 3
        payload["props"] = [{"id": "1", "label": ""}]
        payload.pop("demo", None)
        url = '/api/inputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                                   content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        response["props"] = json.loads(response["props"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], payload["props"])
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
            "props": [{"id": "1", "label": "label"}],
            "user_id": 100,
        }
        Demo.objects.create(name=self.demo["name"], id="500",
                            user_id=self.demo["user_id"],
                            address=self.demo["address"],
                            description=self.demo["description"],
                            footer_message=self.demo["footer_message"],
                            cover_image=self.demo["cover_image"],
                            terminal=self.demo["terminal"],
                            timestamp=self.demo["timestamp"],
                            token=self.demo["token"],
                            status=self.demo["status"])
        url = '/api/outputcomponent/'
        response = self.client.post(url, json.dumps(payload),
                                    content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        response["props"] = json.loads(response["props"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_modify_output_component(self):
        payload = self.output_component
        payload["base_component_id"] = 3
        payload["props"] = [{"id": "3", "label": ""}]
        payload.pop("demo", None)
        url = '/api/outputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                                   content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        response["props"] = json.loads(response["props"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], payload["props"])
        self.assertEqual(response["user_id"], payload["user_id"])

    def test_modify_empty_output_components(self):
        payload = self.output_component
        payload["base_component_id"] = 3
        payload["props"] = [{}]
        payload.pop("demo", None)
        url = '/api/outputcomponent/' + \
            str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload),
                                   content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        response["props"] = json.loads(response["props"])
        self.assertEqual(response["base_component_id"],
                         payload["base_component_id"])
        self.assertEqual(response["props"], payload["props"])
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
        Permalink.objects.create(
            short_relative_url=self.permalink["short_relative_url"],
            full_relative_url=self.permalink["full_relative_url"],
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


class CustomUploadSampleInputControllerTests(TestCase):

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
        Demo.objects.create(name=self.demo["name"],
                            id=self.demo["id"],
                            user_id=self.demo["user_id"],
                            address=self.demo["address"],
                            description=self.demo["description"],
                            footer_message=self.demo["footer_message"],
                            cover_image=self.demo["cover_image"],
                            terminal=self.demo["terminal"],
                            timestamp=self.demo["timestamp"],
                            token=self.demo["token"],
                            status=self.demo["status"])

    def test_upload_sample_input_nofile(self):
        response = self.client.post("/upload_sample_input",
                                    {"demo_id": self.demo["id"]})
        self.assertContains(response, '', None, 200)

    def test_upload_sample_input(self):
        with open('api/sample_image.png', 'rb') as f:
            response = self.client.post(
                "/upload_sample_input",
                {"demo_id": self.demo["id"], "sample-image": f})
            self.assertContains(response, '', None, 200)
            response = json.loads(response.content.decode('utf-8'))
            response = response[0]
            self.assertEqual(int(response["type_of_input"]),
                             3, str(dir(response)))


class CustomRootSettingsControllerClass(TestCase):

    def setUp(self):
        self.client = Client()
        self.root_settings = {
            "root_user_github_login_id": 101,
            "root_user_github_login_name": "name",
            "client_id": "clientID",
            "client_secret": "randomstring_sdfdsfdsfdsf",
            "is_cloudcv": True,
            "allow_new_logins": True,
            "app_ip": "0.0.0.0",
            "port": "80"
        }
        RootSettings.objects.create(
            root_user_github_login_id=self.root_settings[
                "root_user_github_login_id"],
            root_user_github_login_name=self.root_settings[
                "root_user_github_login_name"],
            client_id=self.root_settings["client_id"],
            client_secret=self.root_settings["client_secret"],
            is_cloudcv=self.root_settings["is_cloudcv"],
            allow_new_logins=self.root_settings["allow_new_logins"],
            app_ip=self.root_settings["app_ip"],
            port=self.root_settings["port"])

    def test_get_root_settings(self):
        response = self.client.get('/api/rootsettings')
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["client_id"],
                         self.root_settings["client_id"])
        self.assertEqual(
            response["root_user_github_login_id"],
            self.root_settings["root_user_github_login_id"])

    def test_create_root_settings(self):
        # create social app for rootsetting object
        response = self.client.post('/api/rootsettings', self.root_settings)
        self.assertContains(response, '', None, 200)
        # updates rootsetting object
        changeID = "ClientID2"
        self.root_settings["client_id"] = changeID
        response = self.client.post('/api/rootsettings', self.root_settings)
        self.assertContains(response, '', None, 200)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["client_id"], changeID)

    def test_is_cloudcv(self):
        response = self.client.get('/api/is_cloudcv/')
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["is_cloudcv"],
                         self.root_settings["is_cloudcv"])
