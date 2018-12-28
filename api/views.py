from django.template.response import TemplateResponse

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route
from django.http import HttpResponse, HttpResponseRedirect
from api.serializers import *
from api.models import *
from django.contrib.auth.models import User
from allauth.socialaccount.models import SocialAccount, SocialToken, SocialApp
from django.contrib.sites.models import Site
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status as response_status
from api.constants import DEFAULT_IMAGE
import datetime
import json
from collections import OrderedDict
import sys
from django.views.decorators.csrf import csrf_exempt
from pprint import pprint
import ast
from django.utils.encoding import smart_text
import zipfile
import hashlib
from shutil import copyfile
import requests
import datetime
import shutil

try:
    # Python 2
    from cStringIO import StringIO
except ImportError:
    # Python 3
    from io import StringIO


class DemoViewSet(ModelViewSet):
    """
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    """
    lookup_field = 'id'
    serializer_class = DemoSerializer

    def get_queryset(self):
        return Demo.objects.all()


class InputComponentViewSet(ModelViewSet):
    """
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    """
    lookup_field = 'id'
    serializer_class = InputComponentSerializer

    def get_queryset(self):
        return InputComponent.objects.all()

    @detail_route(methods=['get'], url_path='user_input_component/(?P<user_id>[0-9]+)')
    def user_input_component(self, request, id, user_id=None):
        data = None
        status = None
        try:
            input = InputComponent.objects.get(base_component_id=id, user_id=user_id)
            serialize = InputComponentSerializer(input)
            data = serialize.data
            status = response_status.HTTP_200_OK
        except:
            data = {"error": "Error 404"}
            status = response_status.HTTP_404_NOT_FOUND

        return Response(data, status=status)


user_input_component = InputComponentViewSet.as_view({'get': 'user_input_component'})


class OutputComponentViewSet(ModelViewSet):
    """
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    """
    lookup_field = 'id'
    serializer_class = OutputComponentSerializer

    def get_queryset(self):
        return OutputComponent.objects.all()

    @detail_route(methods=['get'], url_path='user_output_component/(?P<user_id>[0-9]+)')
    def user_output_component(self, request, id, user_id):
        data = None
        status = None
        try:
            input = OutputComponent.objects.get(base_component_id=id, user_id=user_id)
            serialize = OutputComponentSerializer(input)
            data = serialize.data
            status = response_status.HTTP_200_OK
        except:
            data = {"error": "Error 404"}
            status = response_status.HTTP_404_NOT_FOUND

        return Response(data, status=status)


user_output_component = OutputComponentViewSet.as_view({'get': 'user_output_component'})


class PermalinkViewSet(ModelViewSet):
    """
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    """
    lookup_field = 'id'
    serializer_class = PermalinkSerializer

    def get_queryset(self):
        return Permalink.objects.all()


class RootSettingsViewSet(ModelViewSet):
    """
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    """
    lookup_field = 'id'
    serializer_class = RootSettingsSerializer

    def get_queryset(self):
        return RootSettings.objects.all()


def redirect_login(req):
    """
    Retrieves the token, username and user_id of the user and
    redirects the user to the next page.
    """
    user = User.objects.get(username=req.user.username)
    acc = SocialAccount.objects.get(user=user)
    token = SocialToken.objects.get(account=acc)
    if not str(user.id) == acc.uid:
        tmp = user
        user = user.delete()
        tmp.id = acc.uid
        tmp.save()
        acc.user = tmp
        acc.save()
        return HttpResponseRedirect(
            '/login?status=passed&token=' + token.token + '&username=' + tmp.username + '&user_id=' + str(tmp.id))
    return HttpResponseRedirect(
        '/login?status=passed&token=' + token.token + '&username=' + user.username + '&user_id=' + str(user.id))


@api_view(['GET'])
def is_cloudcv(request):
    """
    Returns all fields in the current RootSettings object.
    """
    settings = RootSettings.objects.all().first()
    serialize = RootSettingsSerializer(settings)
    return Response(serialize.data, status=response_status.HTTP_200_OK)




@api_view(['GET'])
def get_all_user_demos(request, id):
    """
    Returns properties of all demos for the
    user identified by the given id.
    """
    demos = Demo.objects.filter(user_id=id)
    serialize = DemoSerializer(demos, many=True)
    return Response(serialize.data, status=response_status.HTTP_200_OK)


@api_view(['GET'])
def get_all_demos(request):
    """
    If the request parameter search_by is demo,
    returns all demos which contains the search_term as a substring,
    otherwise returns all demos belonging to the user having the
    username matching the given search_term.
    """
    search_by = request.query_params.get('search_by', None)
    search_term = request.query_params.get('search_term', None)
    demos = []
    if search_by == "demo":
        demos = Demo.objects.filter(name__icontains=search_term)
    else:
        try:
            user = User.objects.get(username__iexact=search_term)
            demos = Demo.objects.filter(user_id=user.id)
        except User.DoesNotExist:
            demos = []
    serialize = DemoSerializer(demos, many=True)
    data = serialize.data
    for x in range(len(demos)):
        data[x]["username"] = User.objects.get(id=data[x]["user_id"]).username
    return Response(data, status=response_status.HTTP_200_OK)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def custom_component_controller(request, type_req, user_id, demoid):
    """
    Gets the properties of, adds, updates, or removes an
    InputComponent or OutputComponent given a
    GET, POST, PUT or DELETE request respectively.

    Keyword arguments:
        type_req (str): Specifies whether processing is for an
            InputComponent or OutputComponent.
        user_id (str): The id of the user
        demoid (str): The id of the demo
    """
    model = ""
    serializer = ""
    if type_req == "input":
        model = InputComponent
        serializer = InputComponentSerializer
    elif type_req == "output":
        model = OutputComponent
        serializer = OutputComponentSerializer

    if request.method == "POST":
        body = request.data
        demo_id = body["id"]
        demo = Demo.objects.get(id=demo_id)
        base_comp_id = body["base_component_id"]
        props = []
        for prop in body["props"]:
            if prop:
                props.append({
                    "id": prop["id"].encode("ascii", "ignore").decode('utf-8'),
                    "label": prop["label"].encode("ascii", "ignore").decode('utf-8')
                })
            else:
                props.append({})
        user_id = body["user_id"]
        component = model.objects.create(
            demo=demo, base_component_id=base_comp_id, props=json.dumps(props), user_id=user_id)
        serialize = serializer(component)
        return Response(serialize.data, status=response_status.HTTP_201_CREATED)
    elif request.method == "GET":
        if user_id:
            if demoid:
                demo = Demo.objects.get(id=demoid)
                try:
                    component = model.objects.get(user_id=user_id, demo=demo)
                except Exception:
                    return Response({"text": "Not Found"})

                serialize = serializer(component)
                data = serialize.data
                data["props"] = json.loads(data["props"].encode("ascii", "ignore").decode('utf8'))
                data["demo"] = DemoSerializer(component.demo).data
                data["id"] = component.demo.id
                return Response([data], status=response_status.HTTP_200_OK)
            else:
                components = model.objects.filter(user_id=user_id)
                serialize = serializer(components, many=True)
                data = serialize.data
                for x in range(len(data)):
                    data[x]["props"] = json.loads(data[x]["props"].encode("ascii", "ignore").decode('utf8'))
                    data[x]["demo"] = DemoSerializer(components[x].demo).data
                    data[x]["id"] = components[x].demo.id
                return Response(serialize.data, status=response_status.HTTP_200_OK)
        else:
            return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)
    elif request.method == "PUT":
        body = request.data
        if user_id and demoid:
            demo = Demo.objects.get(id=demoid)
            component = model.objects.get(demo=demo, user_id=user_id)
            component.base_component_id = body["base_component_id"]
            props = []
            for prop in body["props"]:
                if prop:
                    props.append({
                        "id": prop["id"].encode("ascii", "ignore").decode('utf-8'),
                        "label": prop["label"].encode("ascii", "ignore").decode('utf-8')
                    })
                else:
                    props.append({})
            component.props = json.dumps(props)
            component.save()
            serialize = serializer(component)
            return Response(serialize.data, status=response_status.HTTP_200_OK)
        else:
            return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)
    elif request.method == "DELETE":
        if user_id and demoid:
            model.objects.get(id=demoid, user_id=user_id).delete()
            return Response({"removed": True}, status=response_status.HTTP_200_OK)
        else:
            return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)
    return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)


def alive(request):
    """Returns a status 200 if the server is running and 404 otherwise"""
    return HttpResponse(status=200)

@api_view(['POST'])
def bundleup(request,id,user_id):
    file=request.FILES['file']
    hash_=hashlib.md5()
    key=id+user_id
    hash_.update(key)
    hex=hash_.hexdigest()
    os.chdir(settings.MEDIA_ROOT+'bundles/')
    if os.path.exists(hex):
        shutil.rmtree(hex)
    zf=zipfile.ZipFile(file)
    zf.extractall(hex)
    zf.close
    ziph=zipfile.ZipFile(hex+'.zip', 'w', zipfile.ZIP_DEFLATED)
    for root, dirs, files in os.walk(settings.MEDIA_ROOT+'bundles/'+hex):
        for file in files:
            ziph.write(os.path.join(root, file),os.path.basename(file))
    ziph.close()
    url='http://localhost:9002/deploy_trigger/'+id
    data={"bundle_path":settings.MEDIA_ROOT+'bundles/'+hex+'.zip'}
    r = requests.post(url = url, data = data)
    data={'success':True}
    return Response(data, status=response_status.HTTP_200_OK)


@api_view(['GET'])
def bundledown(request,id,user_id):
    demo = Demo.objects.get(id=id, user_id=user_id)
    _os=demo.os
    cuda=demo.cuda
    python=demo.python
    tag=''
    if(_os=="1"):
        _os="ubuntu14.04"
        tag=tag+'ub14.04'
    else:
        _os="ubuntu16.04"
        tag=tag+'ub16.04'
    tag=tag+'-'
    if(python=="1"):
        python="python2.7"
        tag=tag+'py2.7'
    else:
        python="python3.5"
        tag=tag+'py3.5'
    tag=tag+'-'
    if(cuda=="1"):
        cuda="cuda7.0-runtime"
        tag=tag+'cu7.0'
    else:
        cuda="cuda8.0-runtime"
        tag=tag+'cu8.0'
    url="https://raw.githubusercontent.com/Cloud-CV/Dockerfiles/master/"+_os+"/"+python+"/"+cuda+"/Dockerfile"
    hash_=md5.new()
    key=id+user_id
    hash_.update(key)
    hex=hash_.hexdigest()
    directory=settings.MEDIA_ROOT+'bundles/'+hex
    if not os.path.exists(directory):
        os.makedirs(directory)

    docker_path=directory+'/Dockerfile'
    if not os.path.exists(docker_path):
        with open(settings.MEDIA_ROOT+'bundles/template/Dockerfile') as f:
            lines = f.readlines()
        lines[0]='FROM teamcloudcv/origami:'+tag
        with open(docker_path, "w") as f:
            f.writelines(lines)

    os.chdir(settings.MEDIA_ROOT+'bundles/')
    if not os.path.exists(hex+'/requirements.txt'):
        requirements=copyfile('template/requirements.txt', directory+'/requirements.txt')
    if not os.path.exists(hex+'/origami.env'):
        f= open(hex+'/origami.env',"w+")
        f.close()
    if not os.path.exists(hex+'/main.py'):
        main=copyfile('template/main.py', directory+'/main.py')

    l=['/Dockerfile','/requirements.txt','/main.py','/origami.env']
    zipped=zipfile.ZipFile(hex+'.zip','w')
    for i in l:
        zipped.write(hex+i,os.path.basename(hex+i))
    zipped.close()
    file_path=settings.MEDIA_ROOT+'bundles/'+hex+'.zip'
    resp=HttpResponse(open(file_path, 'rb'), content_type='application/zip')
    return resp


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def custom_demo_controller(request, user_id, id):
    """
    Gets the properties of, adds, updates, or removes a demo or
    demos given a GET, POST, PUT or DELETE request respectively.

    A GET request also returns all sample_inputs belonging to
    the demo if request parameter id is specified.
    A GET request returns all demo objects in the database if
    both the user_id and id of the demo are not specified.

    Keyword arguments:
        user_id (str): The id of the user
        id (str): The id of the demo
    """
    if request.method == "GET":
        if id and user_id:
            try:
                demo = Demo.objects.get(id=id, user_id=user_id)
            except Exception:
                return Response({"text": "Not Found"})
            serialize = DemoSerializer(demo).data
            try:
                sample_inputs = SampleInput.objects.filter(demo=demo)
            except Exception:
                sample_inputs = None
            if sample_inputs:
                sample_inputs_serialize = SampleInputSerializer(sample_inputs, many=True).data
                serialize["sampleinput"] = sample_inputs_serialize
            return Response([serialize], status=response_status.HTTP_200_OK)
        elif user_id and not id:
            demos = Demo.objects.filter(user_id=user_id)
            serialize = DemoSerializer(demos, many=True)
            return Response(serialize.data, status=response_status.HTTP_200_OK)
        else:
            demos = Demo.objects.all()
            serialize = DemoSerializer(demos, many=True)
            data = serialize.data
            for x in range(len(demos)):
                data[x]["username"] = User.objects.get(id=data[x]["user_id"]).username
            return Response(data, status=response_status.HTTP_200_OK)
    elif request.method == "POST":
        body = request.data
        name = body["name"]
        id = body["id"]
        user_id = body["user_id"]
        try:
            username=body["username"]
        except:
            username=SocialAccount.objects.get(uid=user_id)
            username=username.user.username.encode('utf-8')
        description = body["description"]
        cover_image = body.get("cover_image")
        os = body["os"]
        cuda = body["cuda"]
        python = body["python"]
        task = body["task"]
        source = body.get("source_code")
        if not cover_image:
            cover_image = DEFAULT_IMAGE
        terminal = body.get("terminal")
        date=datetime.datetime.now().strftime("%D")

        demo = Demo.objects.create(
            name=name,
            id=id,
            username=username,
            user_id=user_id,
            description=description,
            cover_image=cover_image,
            os=os,
            python=python,
            cuda=cuda,
            terminal=terminal,
            source_code=source,
            task=task,
            date=date
            )

        serialize = DemoSerializer(demo)
        return Response(serialize.data, status=response_status.HTTP_201_CREATED)

    elif request.method == "PUT":
        if id and user_id:
            body = request.data
            demo = Demo.objects.get(id=id, user_id=user_id)
            demo.name = body["name"]
            demo.description = body["description"]
            if not body["cover_image"]:
                demo.cover_image = DEFAULT_IMAGE
            else:
                demo.cover_image = body["cover_image"]
            demo.terminal = body["terminal"]
            demo.os=body["os"],
            demo.cuda=body["cuda"],
            demo.python=body["python"],
            demo.source_code=body["source_code"],
            demo.save()
            serialize = DemoSerializer(demo)
            return Response(serialize.data, status=response_status.HTTP_200_OK)
        else:
            return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)

    elif request.method == "DELETE":
        if user_id and id:
            Demo.objects.get(id=id, user_id=user_id).delete()
            return Response({"removed": True}, status=response_status.HTTP_200_OK)
        else:
            return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)
    return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_permalink(request, shorturl):
    """Returns the permalink corresponding to the given shorturl."""
    try:
        permalink = Permalink.objects.get(short_relative_url='/p/' + shorturl)

    except Exception:
        return Response({"text": "Not Found"})

    permalink.short_relative_url = permalink.short_relative_url.split('/')[-1]
    serialize = PermalinkSerializer(permalink)
    return Response([serialize.data], status=response_status.HTTP_200_OK)




@api_view(['GET', 'POST'])
def root_settings(request):
    """
    A GET request returns the RootSettings object.
    A POST request creates the RootSettings object if there is
    no existent RootSettings object, and updates the existing
    object otherwise.

    If a RootSettings object is created, a SocialApp object is
    created as well.
    """
    body = request.data
    root = RootSettings.objects.all().first()
    app = SocialApp.objects.all().first()
    if request.method == "POST":
        if root and app:
            root.root_user_github_login_id = body["root_user_github_login_id"]
            root.root_user_github_login_name = \
                body["root_user_github_login_name"]
            root.client_id = body["client_id"]
            root.client_secret = body["client_secret"]
            root.is_cloudcv = body["is_cloudcv"]
            root.allow_new_logins = body["allow_new_logins"]
            root.app_ip = body["app_ip"]
            root.port = body["port"]
            root.save()
            app.client_id = body["client_id"]
            app.secret = body["client_secret"]
            app.save()
        else:
            root = RootSettings.objects.create(
                root_user_github_login_id=body["root_user_github_login_id"],
                root_user_github_login_name=body["root_user_github_login_name"],
                client_id=body["client_id"],
                client_secret=body["client_secret"],
                is_cloudcv=body["is_cloudcv"],
                allow_new_logins=body["allow_new_logins"],
                app_ip=body["app_ip"],
                port=body["port"])
            app = SocialApp.objects.create(
                provider=u'github',
                name=str(datetime.datetime.now().isoformat()),
                client_id=body["client_id"],
                secret=body["client_secret"])
        site = Site.objects.get(id=1)
        app.sites.add(site)
        app.save()
    serialize = RootSettingsSerializer(root)
    return Response(serialize.data, status=response_status.HTTP_200_OK)


@api_view(['POST'])
def upload_sample_input(request):
    """
    Creates a sample input. Only image input is supported currently.

    The data passed into the POST request needs to contain:
        demo_id (str): The demo that the sample input should belong to.
        sample-image-* (file): A value with its key having 'sample-image'
            as a prefix, containing the image file.
    """
    data = request.data
    demo_id = data["demo_id"]
    demo = Demo.objects.get(id=demo_id)
    for key, value in data.items():
        if key.startswith("sample-image"):
            img = request.FILES[key]
            absolute_path = default_storage.save(settings.MEDIA_ROOT, ContentFile(img.read()))
            relative_path = '/media/' + absolute_path.split('media/')[-1]
            sample_input = SampleInput.objects.create(demo=demo, type_of_input=3, value=relative_path)
            serialize = SampleInputSerializer(sample_input)
            if ("test" in sys.argv):
                os.remove(absolute_path)
    sample_inputs = SampleInput.objects.filter(demo=demo)
    serialize = SampleInputSerializer(sample_inputs, many=True)
    return Response(serialize.data, status=response_status.HTTP_200_OK)
