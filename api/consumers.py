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
    body = json.loads(message.content['text'])
    if body["event"] == "ConnectionEstablished":
        Group(body["socketId"]).add(message.reply_channel)

    elif body["event"] == "fetchCurrentPort":
        text = json.dumps({
            "data": settings.PORT,
                    "event": "fetchedCurrentPort"
        })
        message.reply_channel.send({"text": text})

    elif body["event"] == "getPublicIPaddress":
        text = json.dumps({
            "data": settings.HOST_NAME,
                    "event": "gotPublicIP"
        })
        message.reply_channel.send({"text": text})


@csrf_exempt
@api_view(['POST'])
def inject(request):
    if request.method == "POST":
        body = request.data
        text = json.dumps({
            "data": body,
            "event": "injectOutputData"
        })
        Group(body["socketId"]).send({"text": text})
        return Response(status=response_status.HTTP_200_OK)
