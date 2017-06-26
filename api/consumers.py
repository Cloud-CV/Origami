from django.utils import timezone
from django.conf import settings
from django.http import HttpResponseRedirect
from channels import Group
import json

def ws_connect(message):
    print "User connnected via Socket".upper()
    message.reply_channel.send({"accept": True})

def ws_message(message):
    body = json.loads(message.content['text'])
    print "INCOMING REQUEST"
    if body["event"] == "ConnectionEstablished":
        #message.reply_channel.send({"text": "Avais"})
        pass

    elif body["event"] == "fetchcurrentport":
        text = json.dumps({
                    "data": "8000",
                    "event" : "fetchedcurrentport"
                    })
        message.reply_channel.send({"text": text})

    elif body["event"] == "getpublicipaddress":
        text = json.dumps({
                    "data": "localhost",
                    "event" : "gotpublicip"
                    })
        message.reply_channel.send({"text": text})

    '''elif body['event'] == "imageSubmitted":
        print "Image submitted from user"
        GameRound.objects.create(
            socket_id=body['socketid'],
            user_picked_image=body['user_picked_image'],
            worker_id=body['worker_id'],
            assignment_id=body['assignment_id'],
            level=body['level'],
            hit_id=body['hit_id'],
            game_id=body['game_id'],
            round_id=body['round_id'],
            question=body['question'],
            answer=body['answer'].replace("<START>", "").replace("<END>", ""),
            history=body['history'],
            target_image=body['target_image'],
            bot=body['bot'],
        )
        log_to_terminal(body["socketid"], {"image_selection_result": True})

    elif body['event'] == 'finalImagesSelected':
        ImageRanking.objects.create(
            socket_id=body['socketid'],
            final_image_list=body['final_image_list'],
            worker_id=body['worker_id'],
            assignment_id=body['assignment_id'],
            level=body['level'],
            hit_id=body['hit_id'],
            game_id=body['game_id'],
            bot=body['bot'],
            target_image=body['target_image'],
            score=body['bonus'],
        )'''

def ws_disconnect(message):
    print message.content
    # Group("chat").discard(message.reply_channel)