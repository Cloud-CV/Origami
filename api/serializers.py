from rest_framework import serializers
from api.models import *


class DemoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)

    class Meta:
        model = Demo
        fields = '__all__'


class InputComponentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = InputComponent
        fields = '__all__'


class OutputComponentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = OutputComponent
        fields = '__all__'


class PermalinkSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = Permalink
        fields = '__all__'


class RootSettingsSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=False)

    class Meta:
        model = RootSettings
        fields = '__all__'
