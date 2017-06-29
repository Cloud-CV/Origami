from django.template.response import TemplateResponse

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from api.serializers import *
from api.models import *
from django.contrib.auth.models import User
from allauth.socialaccount.models import SocialAccount, SocialToken


class DemoViewSet(ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = DemoSerializer

    def get_queryset(self):
        return Demo.objects.all()


class InputComponentViewSet(ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = InputComponentSerializer

    def get_queryset(self):
        return InputComponent.objects.all()

    @detail_route(methods=['get'])
    def user_input_component(self, request, id, userid):
        input = InputComponent.objects(id=id, userid=userid).first()
        serialize = InputComponentSerializer(input)
        return JsonResponse(serialize.data)

user_input_component = InputComponentViewSet.as_view(
    {'get': 'user_input_component'})


class OutputComponentViewSet(ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = OutputComponentSerializer

    def get_queryset(self):
        return OutputComponent.objects.all()

    @detail_route(methods=['get'])
    def user_output_component(self, request, id, userid):
        output = OutputComponent.objects(id=id, userid=userid).first()
        serialize = OutputComponentSerializer(output)
        return JsonResponse(serialize.data)

user_output_component = OutputComponentViewSet.as_view(
    {'get': 'user_output_component'})


class PermalinkViewSet(ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = PermalinkSerializer

    def get_queryset(self):
        return Permalink.objects.all()


class RootSettingsViewSet(ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = RootSettingsSerializer

    def get_queryset(self):
        return RootSettings.objects.all()


def redirect_login(req):
    user = User.objects.get(username=req.user.username)
    acc = SocialAccount.objects.get(user=user)
    token = SocialToken.objects.get(account=acc)
    print req.user.username
    print user.id
    print acc.user.id
    tmp = user
    user = user.delete()
    tmp.id = acc.uid
    tmp.save()
    acc.user = tmp
    acc.save()
    return HttpResponseRedirect('/login?status=passed&token=' + token.token + '&username=' + tmp.username + '&userid=' + str(tmp.id))

def isCloudCV(request):
    settings = RootSettings.objects.all().first()
    send = {
        "isCloudCV" : settings.isCloudCV,
        "rootUserGithubLoginId" : settings.rootUserGithubLoginId,
        "appip" : settings.appip,
        "port" : settings.port
    }
    return JsonResponse(send)

def getAllDemos(request, id):
    demos = Demo.objects.filter(userid = id)
    response = []
    for demo in demos:
        d = {
            "id" : demo.id,
            "userid" : demo.userid
        }
        response.append(d)
    return JsonResponse(response, safe=False)

def custom_component_controller(request, type_req, userid, demoid):
    model = ""
    if type_req ==  "input":
        model = InputComponent
    elif type_req == "output":
        model = OutputComponent
    else:
        return HttpResponse("Invalid URL")
    if request.method == "POST":
        print request.body
        print request.POST
        body = json.loads(request.body)
        demo_id = body["id"]
        demo = Demo.objects.get(id=demo_id)
        base_comp_id = body["baseComponentId"]
        props = []
        for prop in body["props"]:
            if prop:
                props.append(prop.encode("ascii", "ignore").replace("'","\\" + "\'"))
            else:
                props.append({})
        print props
        user_id = body["userid"]

        model.objects.create(demo=demo, baseComponentId=base_comp_id, 
            props=props, userid=user_id, id = demo_id)
        return JsonResponse(body)
    elif request.method == "GET":
        if userid:
            if demoid:
                demo = Demo.objects.get(id=demoid)
                try:
                    component = model.objects.get(userid=userid, demo=demo)
                except Exception,e:
                    return JsonResponse({})
                
                send = [{
                    "id" : demoid,
                    "userid" : userid,
                    "baseComponentId" : component.baseComponentId,
                    "props" : json.loads(component.props)
                }]
                return JsonResponse(send, safe=False)
            else:
                components = model.objects.filter(userid = userid)
                response = []
                for component in components:
                    d = {
                        "id" : component.demo.id,
                        "userid" : component.userid,
                        "baseComponentId" : component.baseComponentId,
                        "props" : component.props
                    }
                    response.append(d)
                return JsonResponse(response, safe=False)
        else:
            return HttpResponse("Invalid URL")
    elif request.method == "PUT":
        body = json.loads(request.body)
        if userid and demoid:
            component = model.objects.get(id=demoid, userid = userid)
            component.baseComponentId = body["baseComponentId"]
            props = []
            for prop in body["props"]:
                if prop:
                    props.append(prop.encode("ascii", "ignore").replace("'","\\" + "\'"))
                else:
                    props.append({})
            component.props = props        
            component.save()
            return JsonResponse(body)
        else:    
            return HttpResponse("Invalid URL")
    elif request.method == "DELETE":
        if userid and demoid:
            model.objects.get(id=demoid, userid = userid).delete()
            return JsonResponse({"removed":True})
        else:
            return HttpResponse("Invalid URL")
    return HttpResponse("Invalid URL")

def alive(request):
    return HttpResponse(status=200)


def custom_demo_controller(request, userid, id):
    if request.method == "GET":
        if id:
            try:
                demo = Demo.objects.get(id=id, userid=userid)
            except Exception,e:
                return JsonResponse({})
            serialize = DemoSerializer(demo)
            return JsonResponse([serialize.data], safe=False)
        else:
            demos = Demo.objects.filter(userid=userid)
            serialize = DemoSerializer(demos, many=True)
            return JsonResponse(serialize.data, safe=False)
    elif request.method == "POST":
        body = json.loads(request.body)
        name = body["name"]
        id = body["id"]
        userid = body["userid"]
        address = body ["address"]
        description = body["description"]
        footerMessage = body["footerMessage"]
        coverImage = body["coverImage"]
        terminal = body["terminal"]
        timestamp = body["timestamp"]
        token = body["token"]
        status = body["status"]
        demo = Demo.objects.create(name=name, id=id, userid=userid, 
                address=address, description=description, footerMessage=footerMessage,
                coverImage=coverImage, terminal=terminal, timestamp=timestamp,
                token=token, status=status)
        serialize = DemoSerializer(demo)
        return JsonResponse(serialize.data)

    elif request.method == "PUT":
        if id and userid:
            body = json.loads(request.body)
            demo = Demo.objects.get(id=id, userid=userid)
            demo.name = body["name"]
            demo.address = body ["address"]
            demo.description = body["description"]
            demo.footerMessage = body["footerMessage"]
            demo.coverImage = body["coverImage"]
            demo.terminal = body["terminal"]
            #demo.timestamp = body["timestamp"]
            demo.token = body["token"]
            demo.status = body["status"]
            demo.save()
            serialize = DemoSerializer(demo)
            return JsonResponse(serialize.data, safe=False)
        else:
            return Http("Invalid URL")

    elif request.method == "DELETE":
        if userid and id:
            Demo.objects.get(id=id, userid = userid).delete()
            return JsonResponse({"removed":True})
        else:
            return HttpResponse("Invalid URL")
    return HttpResponse("Invalid URL")


def getpermalink(request, shorturl):
    
    try:
        permalink = Permalink.objects.get(shortRelativeURL='/p/' + shorturl)

    except Exception,e:
        print e
        return JsonResponse({})

    send = [{
        "shortRelativeURL" : shorturl,
        "fullRelativeURL" : permalink.fullRelativeURL,
        "projectId" : permalink.projectId,
        "userId" : permalink.userId
    }]
    return JsonResponse(send, safe=False)

def custom_permalink_controller(request, userId, projectId):
    
    if request.method == "GET":    
        if userId and projectId:
            try:
                permalink = Permalink.objects.get(projectId=projectId, userId=userId)
            
            except Exception,e:
                return JsonResponse({})
        
            return JsonResponse(PermalinkSerializer(permalink).data)
        else:
            try:
                permalinks = Permalink.objects.all()
        
            except Exception,e:
                return JsonResponse({})

            return JsonResponse(PermalinkSerializer(permalinks, many=True).data, safe=False)

    elif request.method == "POST":
        print request.body
        body = json.loads(request.body)
        shortRelativeURL = body["shortRelativeURL"]
        fullRelativeURL = body["fullRelativeURL"]
        projectId = body["projectId"]
        userId = body["userId"]
        permalink = Permalink.objects.create(shortRelativeURL=shortRelativeURL,
                    fullRelativeURL=fullRelativeURL, projectId=projectId, userId=userId)
        return JsonResponse(PermalinkSerializer(permalink).data)

    elif request.method == "PUT":
        if userId and projectId:
            body = json.loads(request.body)
            perm = Permalink.objects.get(userId=userId, projectId=projectId)
            perm.shortRelativeURL = body["shortRelativeURL"]
            perm.fullRelativeURL = body["fullRelativeURL"]
            perm.save()
            return JsonResponse(PermalinkSerializer(perm).data)
        else:
            return HttpResponse("Invalid URL")

    elif request.method == "DELETE":
        if userId and projectId:
            Permalink.objects.get(projectId=projectId, userId = userId).delete()
            return JsonResponse({"removed":True})
        else:
            return HttpResponse("Invalid URL")
    return HttpResponse("Invalid URL")

