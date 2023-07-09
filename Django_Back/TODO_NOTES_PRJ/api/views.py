from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import APIView, permission_classes, api_view
from .models import Note
from .serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class NoteViewSet(APIView):
    permission_classes = [IsAuthenticated]  # Add authentication permission

    def get(self, request, pk=None):
        if pk is not None:
            note = Note.objects.get(id=pk)
            serializer = NoteSerializer(note)
            return Response(serializer.data)
        else:
            notes = Note.objects.all().order_by('-updated')
            serializer = NoteSerializer(notes, many=True)
            return Response(serializer.data)

    def post(self, request):
        data = request.data
        note = Note.objects.create(
            title=data["title"],
            body=data["body"]
        )
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk):
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        note = Note.objects.get(id=pk)
        note.delete()
        return Response("Note deleted")

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)


        # Add custom claims
        token['username'] = user.username
        # ...


        return token




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    return "im protected"
