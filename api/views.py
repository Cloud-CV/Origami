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
    def user_input_component(self, request, id, user_id):
        input = InputComponent.objects(id=id, user_id=user_id).first()
        serialize = InputComponentSerializer(input)
        return Response(serialize.data, status=response_status.HTTP_200_OK)


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
    def user_output_component(self, request, id, user_id):
        output = OutputComponent.objects(id=id, user_id=user_id).first()
        serialize = OutputComponentSerializer(output)
        return Response(serialize.data, status=response_status.HTTP_200_OK)


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
    if not str(user.id) == acc.uid:
        tmp = user
        user = user.delete()
        tmp.id = acc.uid
        tmp.save()
        acc.user = tmp
        acc.save()
        return HttpResponseRedirect('/login?status=passed&token=' + token.token + '&username=' + tmp.username + '&user_id=' + str(tmp.id))
    return HttpResponseRedirect('/login?status=passed&token=' + token.token + '&username=' + user.username + '&user_id=' + str(user.id))


@api_view(['GET'])
def is_cloudcv(request):
    settings = RootSettings.objects.all().first()
    serialize = RootSettingsSerializer(settings)
    return Response(serialize.data, status=response_status.HTTP_200_OK)


@api_view(['GET'])
def get_all_user_demos(request, id):
    demos = Demo.objects.filter(user_id=id)
    serialize = DemoSerializer(demos, many=True)
    return Response(serialize.data, status=response_status.HTTP_200_OK)


@api_view(['GET'])
def get_all_demos(request):
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
    model = ""
    serializer = ""
    if type_req == "input":
        model = InputComponent
        serializer = InputComponentSerializer
    elif type_req == "output":
        model = OutputComponent
        serializer = OutputComponentSerializer
    else:
        return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        body = request.data
        demo_id = body["id"]
        demo = Demo.objects.get(id=demo_id)
        base_comp_id = body["base_component_id"]
        props = []
        for prop in body["props"]:
            if prop:
                props.append({"id": prop["id"].encode(
                    "ascii", "ignore").decode('utf-8'),
                    "label": prop["label"].encode(
                        "ascii", "ignore").decode('utf-8')})
            else:
                props.append({})
        user_id = body["user_id"]
        component = model.objects.create(demo=demo, base_component_id=base_comp_id,
                                         props=json.dumps(props), user_id=user_id)
        serialize = serializer(component)
        return Response(serialize.data, status=response_status.HTTP_201_CREATED)
    elif request.method == "GET":
        if user_id:
            if demoid:
                demo = Demo.objects.get(id=demoid)
                try:
                    component = model.objects.get(user_id=user_id, demo=demo)
                except Exception as e:
                    return Response({"text": "Not Found"})

                serialize = serializer(component)
                data = serialize.data
                data["props"] = json.loads(data["props"].encode(
                    "ascii", "ignore").decode('utf8'))
                data["demo"] = DemoSerializer(component.demo).data
                data["id"] = component.demo.id
                return Response([data], status=response_status.HTTP_200_OK)
            else:
                components = model.objects.filter(user_id=user_id)
                serialize = serializer(components, many=True)
                data = serialize.data
                for x in range(len(data)):
                    data[x]["props"] = json.loads(data[x]["props"].encode(
                        "ascii", "ignore").decode('utf8'))
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
                    props.append({"id": prop["id"].encode(
                        "ascii", "ignore").decode('utf-8'),
                        "label": prop["label"].encode(
                        "ascii", "ignore").decode('utf-8')})
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
    return HttpResponse(status=200)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def custom_demo_controller(request, user_id, id):
    if request.method == "GET":
        if id and user_id:
            try:
                demo = Demo.objects.get(id=id, user_id=user_id)
            except Exception as e:
                return Response({"text": "Not Found"})
            serialize = DemoSerializer(demo).data
            try:
                sample_inputs = SampleInput.objects.filter(demo=demo)
            except Exception as e:
                sample_inputs = None
            if sample_inputs:
                sample_inputs_serialize = SampleInputSerializer(
                    sample_inputs, many=True).data
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
                data[x]["username"] = User.objects.get(
                    id=data[x]["user_id"]).username
            return Response(data, status=response_status.HTTP_200_OK)
    elif request.method == "POST":
        body = request.data
        name = body["name"]
        id = body["id"]
        user_id = body["user_id"]
        address = body["address"]
        description = body["description"]
        footer_message = body["footer_message"]
        cover_image = body["cover_image"]
        if not cover_image:
            cover_image = DEFAULT_IMAGE
        terminal = body["terminal"]
        timestamp = body["timestamp"]
        token = body["token"]
        status = body["status"]
        demo = Demo.objects.create(name=name, id=id, user_id=user_id,
                                   address=address, description=description, footer_message=footer_message,
                                   cover_image=cover_image, terminal=terminal, timestamp=timestamp,
                                   token=token, status=status)
        serialize = DemoSerializer(demo)
        return Response(serialize.data, status=response_status.HTTP_201_CREATED)

    elif request.method == "PUT":
        if id and user_id:
            body = request.data
            demo = Demo.objects.get(id=id, user_id=user_id)
            demo.name = body["name"]
            demo.address = body["address"]
            demo.description = body["description"]
            demo.footer_message = body["footer_message"]
            if not body["cover_image"]:
                demo.cover_image = DEFAULT_IMAGE
            else:
                demo.cover_image = body["cover_image"]
            demo.terminal = body["terminal"]
            demo.token = body["token"]
            demo.status = body["status"]
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

    try:
        permalink = Permalink.objects.get(short_relative_url='/p/' + shorturl)

    except Exception as e:
        return Response({"text": "Not Found"})

    permalink.short_relative_url = permalink.short_relative_url.split('/')[-1]
    serialize = PermalinkSerializer(permalink)
    return Response([serialize.data], status=response_status.HTTP_200_OK)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def custom_permalink_controller(request, user_id, project_id):

    if request.method == "GET":
        if user_id and project_id:
            try:
                permalink = Permalink.objects.get(
                    project_id=project_id, user_id=user_id)

            except Exception as e:
                return Response({"text": "Not Found"})
            serialize = PermalinkSerializer(permalink)
            return Response(serialize.data, status=response_status.HTTP_200_OK)
        else:
            try:
                permalinks = Permalink.objects.all()

            except Exception as e:
                return Response({"text": "Not Found"})
            serialize = PermalinkSerializer(permalinks, many=True)
            return Response(serialize.data, status=response_status.HTTP_200_OK)

    elif request.method == "POST":
        body = request.data
        short_relative_url = body["short_relative_url"]
        full_relative_url = body["full_relative_url"]
        project_id = body["project_id"]
        user_id = body["user_id"]
        permalink = Permalink.objects.create(short_relative_url=short_relative_url,
                                             full_relative_url=full_relative_url, project_id=project_id, user_id=user_id)
        serialize = PermalinkSerializer(
            permalink)
        return Response(serialize.data, status=response_status.HTTP_201_CREATED)

    elif request.method == "PUT":
        if user_id and project_id:
            body = request.data
            perm = Permalink.objects.get(
                user_id=user_id, project_id=project_id)
            perm.short_relative_url = body["short_relative_url"]
            perm.full_relative_url = body["full_relative_url"]
            perm.save()
            serialize = PermalinkSerializer(perm)
            return Response(serialize.data, status=response_status.HTTP_200_OK)
        else:
            return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)

    elif request.method == "DELETE":
        if user_id and project_id:
            Permalink.objects.get(project_id=project_id,
                                  user_id=user_id).delete()
            return Response({"removed": True}, status=response_status.HTTP_200_OK)
        else:
            return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)
    return Response("Invalid URL", status=response_status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def root_settings(request):
    body = request.data
    root = RootSettings.objects.all().first()
    app = SocialApp.objects.all().first()
    if request.method == "POST":
        if root and app:
            root.root_user_github_login_id = body["root_user_github_login_id"]
            root.root_user_github_login_name = body["root_user_github_login_name"]
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
            root = RootSettings.objects.create(root_user_github_login_id=body["root_user_github_login_id"],
                                               root_user_github_login_name=body[
                                               "root_user_github_login_name"],
                                               client_id=body["client_id"], client_secret=body[
                                               "client_secret"],
                                               is_cloudcv=body["is_cloudcv"], allow_new_logins=body[
                                               "allow_new_logins"],
                                               app_ip=body["app_ip"], port=body["port"])
            app = SocialApp.objects.create(provider=u'github', name=str(datetime.datetime.now().isoformat()),
                                           client_id=body["client_id"], secret=body["client_secret"])
        site = Site.objects.get(id=1)
        app.sites.add(site)
        app.save()
    serialize = RootSettingsSerializer(root)
    return Response(serialize.data, status=response_status.HTTP_200_OK)


@api_view(['POST'])
def upload_sample_input(request):
    data = request.data
    demo_id = data["demo_id"]
    demo = Demo.objects.get(id=demo_id)
    for key, value in data.items():
        if key.startswith("sample-image"):
            img = request.FILES[key]
            absolute_path = default_storage.save(
                settings.MEDIA_ROOT, ContentFile(img.read()))
            relative_path = '/media/' + absolute_path.split('media/')[-1]
            sample_input = SampleInput.objects.create(
                demo=demo, type_of_input=3, value=relative_path)
            serialize = SampleInputSerializer(sample_input)
    sample_inputs = SampleInput.objects.filter(demo=demo)
    serialize = SampleInputSerializer(sample_inputs, many=True)
    return Response(serialize.data, status=response_status.HTTP_200_OK)
