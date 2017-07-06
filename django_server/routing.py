from channels.routing import route
from api.consumers import ws_connect, ws_message

channel_routing = [
    route("websocket.connect", ws_connect),
    route("websocket.receive", ws_message),
]
