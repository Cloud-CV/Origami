from rest_framework import serializers
from rest_framework_mongoengine import serializers as mongoserializers

from models import *

class DemoSerializer(mongoserializers.DocumentSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = Demo
        fields = '__all__'

class InputComponentSerializer(mongoserializers.DocumentSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = InputComponent
        fields = '__all__'

class OutputComponentSerializer(mongoserializers.DocumentSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = OutputComponent
        fields = '__all__'

class PermalinkSerializer(mongoserializers.DocumentSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = Permalink
        fields = '__all__'

class RootSettingsSerializer(mongoserializers.DocumentSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = RootSettings
        fields = '__all__'   
