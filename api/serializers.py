from rest_framework import serializers
from api.models import Demo, InputComponent, OutputComponent, Permalink, RootSettings


class DemoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)

    class Meta:
        model = Demo
        fields = '__all__'


class InputComponentSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=False)

    class Meta:
        model = InputComponent
        fields = ('base_component_id', 'user_id', 'props')


class OutputComponentSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=False)

    class Meta:
        model = OutputComponent
        fields = ('base_component_id', 'user_id', 'props')


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
