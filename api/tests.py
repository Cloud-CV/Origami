# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.contrib.auth import login
from allauth.socialaccount.models import SocialAccount, SocialToken, SocialApp
from django.test import TestCase, Client
import datetime
import json
from api.constants import DEFAULT_IMAGE
from .models import *
from channels import Channel
from channels.test import ChannelTestCase, WSClient
from .consumers import *
from django.conf import settings

# Create your tests here.


class CustomDemoControllerViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.demo = {
            "name": "test",
            "id": 99,
            "username": "test",
            "user_id": 1,
            "description": "description",
            "cover_image": "cover_image",
            "terminal": True,
            "task": "VQA",
            "source_code": "",
            "date": datetime.datetime.now().isoformat(),
            "os": "Linux",
            "python": "3.7",
            "cuda": "8",
        }

        self.test_user = User.objects.create_user(
            username=self.demo["username"], email="email@email.com", password="password")
        # use the id assigned to test_user
        self.demo["user_id"] = self.test_user.id
        Demo.objects.create(
            name=self.demo["name"],
            username=self.demo["username"],
            id=self.demo["id"],
            user_id=self.demo["user_id"],
            description=self.demo["description"],
            cover_image=self.demo["cover_image"],
            terminal=self.demo["terminal"],
            date=self.demo["date"],
            cuda=self.demo["cuda"],
            python=self.demo["python"],
            os=self.demo["os"],
            task=self.demo["task"],
            source_code=self.demo["source_code"]

        )
        self.demo2 = {
            "name": "test2",
            "id": 999,
            "username": "test2",
            "user_id": 11,
            "description": "description",
            "cover_image": "cover_image",
            "terminal": True,
            "task": "GradCam",
            "source_code": "",
            "date": datetime.datetime.now().isoformat(),
            "os": "Linux",
            "python": "2.7",
            "cuda": "8.5",
        }

        self.test_user_2 = User.objects.create_user(
            username=self.demo2["username"], email="email2@email.com", password="password2")

        # creating 2nd user
        self.demo2["user_id"] = self.test_user.id + 1
        Demo.objects.create(
            name=self.demo2["name"],
            username=self.demo2["username"],
            id=self.demo2["id"],
            user_id=self.demo2["user_id"],
            description=self.demo2["description"],
            cover_image=self.demo2["cover_image"],
            terminal=self.demo2["terminal"],
            date=self.demo2["date"],
            cuda=self.demo2["cuda"],
            python=self.demo2["python"],
            os=self.demo2["os"],
            task=self.demo2["task"],
            source_code=self.demo2["source_code"]

        )

    def test_get_redir_user_demo(self):
        payload = {"user": {"username": self.demo["username"]}}
        self.client.login(username=payload["user"]["username"], password="password")
        sapp = SocialApp(provider='github', name='Github', client_id='<test>', secret='<test>')
        sapp.save()
        sacc = SocialAccount(uid=1001, user=self.test_user, provider="github")
        sacc.save()
        stoken = SocialToken(app=sapp, account=sacc, token="test_token")
        stoken.save()
        response = self.client.post('/accounts/profile', follow=True)
        first_url, first_response = response.redirect_chain[0]
        self.assertEqual(first_url, "/login?status=passed&token=test_token&username=test&user_id=1001")
        self.client.login(username=payload["user"]["username"], password="password")
        stoken = SocialToken(app=sapp, account=sacc, token="test_token")
        stoken.save()
        response = self.client.post('/accounts/profile', follow=True)
        first_url, first_response = response.redirect_chain[0]
        self.assertEqual(first_url, "/login?status=passed&token=test_token&username=test&user_id=1001")

    def test_get_all_user_demos(self):
        response = self.client.get('/api/demo/user/%d' % (self.demo["user_id"]))
        responses = json.loads(response.content.decode('utf-8'))
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["user_id"], self.demo["user_id"])
        response = self.client.get('/api/demo/user/%d' % (1000000001))
        self.assertEqual(response.status_code, 200)

    def test_get_all_demos_by_name(self):
        response = self.client.get('/api/demos/', {'search_by': 'demo', 'search_term': self.demo["name"]})
        responses = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(responses), 2)
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["user_id"], self.demo["user_id"])

    def test_get_all_demos_by_username(self):
        response = self.client.get('/api/demos/', {'search_term': self.demo["username"]})
        responses = json.loads(response.content.decode('utf-8'))
        response = responses[0]
        self.assertEqual(response["id"], self.demo["id"])
        self.assertEqual(response["user_id"], self.demo["user_id"])

    def test_get_all_demos_none_search_term(self):
        response = self.client.get('/api/demos/', {'search_by': 'demo', 'search_term': 'not_exist'})
        responses = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(responses), 0)

    def test_get_all_demos_none_search_by_none_search_term(self):
        response = self.client.get('/api/demos/')
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
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["cover_image"], payload["cover_image"])
        self.assertEqual(response["terminal"], payload["terminal"])

    def test_get_demo_with_Sample_inputs(self):

        payload = self.demo
        with open('api/sample_image.png', 'rb') as f:
            response1 = self.client.post("/upload_sample_input", {"demo_id": self.demo["id"], "sample-image": f})
            url = '/api/demo/' + \
                str(payload["user_id"]) + '/' + str(payload["id"])
            response = self.client.get(url)
            response = json.loads(response.content.decode('utf-8'))
            response1 = json.loads(response1.content.decode('utf-8'))

            self.assertEqual(response[0]["sampleinput"], response1)

    def test_get_one_demo_without_id(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(None)
        responses = self.client.get(url)
        # It returns a list containing all the demo of that user
        response = json.loads(responses.content.decode('utf-8'))[0]
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["cover_image"], payload["cover_image"])
        self.assertEqual(response["terminal"], payload["terminal"])

    def test_get_one_demo_without_id_and_userid(self):
        payload = self.demo
        payload2 = self.demo2  # so now there are 2 different demo of 2 diff users
        url = '/api/demo/' + str(None) + '/' + str(None)
        responses = self.client.get(url)
        # It returns a list containing all the demos preset in the database
        response = json.loads(responses.content.decode('utf-8'))[0]  # returns 1st demo config
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["cover_image"], payload["cover_image"])
        self.assertEqual(response["terminal"], payload["terminal"])

        response2 = json.loads(responses.content.decode('utf-8'))[1]  # return second user config
        self.assertEqual(response2["name"], payload2["name"])
        self.assertEqual(response2["id"], payload2["id"])
        self.assertEqual(response2["user_id"], payload2["user_id"])
        self.assertEqual(response2["description"], payload2["description"])
        self.assertEqual(response2["cover_image"], payload2["cover_image"])
        self.assertEqual(response2["terminal"], payload2["terminal"])

    def test_demo_not_found(self):
        payload = self.demo
        payload2 = self.demo2
        url = '/api/demo/' + \
            str(payload["user_id"]) + '/' + str(payload2["id"])
        responses = self.client.get(url)
        response = json.loads(responses.content.decode('utf-8'))
        self.assertEqual(response["text"], "Not Found")

# -----
    def test_create_demo(self):
        payload = {
            "name": "1",
            "id": 1,
            "username": "test",
            "user_id": 100,
            "description": "description",
            "cover_image": "",
            "terminal": True,
            "task": "GradCam",
            "source_code": "",
            "date": datetime.datetime.now().isoformat(),
            "os": "Linux",
            "python": "2.7",
            "cuda": "8.5",
        }
        response = self.client.post('/api/demo/1001', json.dumps(payload), content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["cover_image"], DEFAULT_IMAGE)
        self.assertEqual(response["terminal"], payload["terminal"])

    def test_put_demo(self):
        payload = self.demo
        payload["name"] = "Not Test"
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload), content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["cover_image"], payload["cover_image"])
        self.assertEqual(response["terminal"], payload["terminal"])

    def test_put_demo_without_body_cover_image(self):
        payload = self.demo
        payload["name"] = "Not Test"
        payload["cover_image"] = ""
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.put(url, json.dumps(payload), content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["name"], payload["name"])
        self.assertEqual(response["id"], payload["id"])
        self.assertEqual(response["user_id"], payload["user_id"])
        self.assertEqual(response["description"], payload["description"])
        self.assertEqual(response["cover_image"], DEFAULT_IMAGE)
        self.assertEqual(response["terminal"], payload["terminal"])

    def test_put_without_id_user_id(self):
        payload = self.demo
        payload["name"] = "Not Test"
        payload["cover_image"] = ""
        url = '/api/demo/'
        response = self.client.put(url, json.dumps(payload), content_type="application/json")
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response, "Invalid URL")

    def test_delete_demo(self):
        payload = self.demo
        url = '/api/demo/' + str(payload["user_id"]) + '/' + str(payload["id"])
        response = self.client.delete(url)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["removed"], True)

    def test_delete_without_id_and_user_id(self):
        payload = self.demo
        url = '/api/demo/'
        response = self.client.delete(url)
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response, "Invalid URL")


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
            root_user_github_login_id=self.root_settings["root_user_github_login_id"],
            root_user_github_login_name=self.root_settings["root_user_github_login_name"],
            client_id=self.root_settings["client_id"],
            client_secret=self.root_settings["client_secret"],
            is_cloudcv=self.root_settings["is_cloudcv"],
            allow_new_logins=self.root_settings["allow_new_logins"],
            app_ip=self.root_settings["app_ip"],
            port=self.root_settings["port"])

    def test_get_root_settings(self):
        response = self.client.get('/api/rootsettings')
        response = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response["client_id"], self.root_settings["client_id"])
        self.assertEqual(response["root_user_github_login_id"], self.root_settings["root_user_github_login_id"])

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
        self.assertEqual(response["is_cloudcv"], self.root_settings["is_cloudcv"])


class ChannelTests(ChannelTestCase):
    def test_ws_connect(self):
        client = WSClient()
        client.send_and_consume('websocket.connect')
        self.assertIsNone(client.receive())

    def test_ws_message(self):
        client = WSClient()
        client.send_and_consume('websocket.receive', text={'event': 'ConnectionEstablished', 'socketId': '54'})
        self.assertIsNone(client.receive())

        client.send_and_consume('websocket.receive', text={'event': 'fetchCurrentPort'})
        receive = client.receive()["data"]
        self.assertEqual(receive, settings.PORT)

        client.send_and_consume('websocket.receive', text={'event': 'getPublicIPaddress'})
        receive = client.receive()["data"]
        self.assertEqual(receive, settings.HOST_NAME)
