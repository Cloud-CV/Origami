from django.utils import timezone
from django.conf import settings
from channels import Group
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status as response_status
import json


def ws_connect(message):
    message.reply_channel.send({"accept": True})


def ws_message(message):
    print("1")
    body = json.loads(message.content['text'])
    if body["event"] == "ConnectionEstablished":
        print("2")
        Group(body["socketId"]).add(message.reply_channel)

    elif body["event"] == "fetchCurrentPort":
        print("3")
        text = json.dumps({
            "data": settings.PORT,
                    "event": "fetchedCurrentPort"
        })
        message.reply_channel.send({"text": text})

    elif body["event"] == "getPublicIPaddress":
        print("4")
        text = json.dumps({
            "data": settings.HOST_NAME,
                    "event": "gotPublicIP"
        })
        message.reply_channel.send({"text": text})


@csrf_exempt
@api_view(['POST'])
def inject(request):
    print("aaya 1")
    if request.method == "POST":
        print("aaya 2")
        body = request.data
        text = json.dumps({
            "data": body,
            "event": "injectOutputData"
        })
        Group(body["socketId"]).send({"text": text})
        return Response(status=response_status.HTTP_200_OK)
