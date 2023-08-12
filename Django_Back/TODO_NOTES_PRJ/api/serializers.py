from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .models import Notes

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'


User = get_user_model()

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    