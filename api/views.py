from django.template.response import TemplateResponse

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from api.serializers import *
from api.models import *



class DemoViewSet(ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = DemoSerializer

    def get_queryset(self):
        return Demo.objects.all()

    @detail_route(methods=['get'])
    def user_demo(self, request, id, userid):
    	demo = Demo.objects(id=id, userid=userid).first()
    	serialize = DemoSerializer(demo)
    	return JsonResponse(serialize.data)

user_demo = DemoViewSet.as_view({'get':'user_demo'})

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

user_input_component = InputComponentViewSet.as_view({'get':'user_input_component'})

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

user_output_component = OutputComponentViewSet.as_view({'get':'user_output_component'})

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
