from django.utils import timezone
from django.conf import settings
from channels import Group
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json


def ws_connect(message):
    message.reply_channel.send({"accept": True})


def ws_message(message):
    body = json.loads(message.content['text'])
    if body["event"] == "ConnectionEstablished":
        Group(body["socketId"]).add(message.reply_channel)

    elif body["event"] == "fetchcurrentport":
        text = json.dumps({
            "data": "8000",
                    "event": "fetchedcurrentport"
        })
        message.reply_channel.send({"text": text})

    elif body["event"] == "getpublicipaddress":
        text = json.dumps({
            "data": "localhost",
                    "event": "gotpublicip"
        })
        message.reply_channel.send({"text": text})


def ws_disconnect(message):
    print (message.content)


@csrf_exempt
def inject(request):
    if request.method == "POST":
        body = json.loads(request.body)
        text = json.dumps({
            "data": body,
            "event": "injectoutputdata"
        })
        Group(body["socketId"]).send({"text": text})
        return HttpResponse(status=200)
