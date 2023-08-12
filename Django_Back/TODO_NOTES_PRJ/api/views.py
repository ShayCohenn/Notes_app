from rest_framework.response import Response
from rest_framework.decorators import APIView, permission_classes, api_view
from .models import Notes
from .serializers import NoteSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404 

User = get_user_model()  # Get the active User model based on your AUTH_USER_MODEL setting

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        user = get_object_or_404(User, id=id)

        if user != request.user:
            return Response({"error": "You are not authorized to update this user."}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserNoteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({"error":"Not authorized to view these notes"}, status=status.HTTP_403_FORBIDDEN)
        user = get_object_or_404(User, id=user_id)
        notes = Notes.objects.filter(user=user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    
    def post(self, request, user_id):
        data = request.data
        data['user'] = user_id
        serializer = NoteSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserNoteDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id, pk):
        note = get_object_or_404(Notes, id=pk, user=request.user)
        if request.user.id != user_id:
            return Response({"error":"Not authorized to view these notes"}, status=status.HTTP_403_FORBIDDEN)
        user = get_object_or_404(User, id=user_id)
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, user_id, pk):
        note = get_object_or_404(Notes, id=pk, user=request.user)
        data = request.data
        user = request.user
        note = get_object_or_404(Notes, id=pk, user=user)
        serializer = NoteSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, pk):
        note = get_object_or_404(Notes, id=pk, user=request.user)
        user = request.user
        note = get_object_or_404(Notes, id=pk, user=user)
        note.delete()
        return Response("Note deleted", status=status.HTTP_204_NO_CONTENT)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['pook'] = 'chick'

        return token


@api_view(['POST'])
def refresh_access_token(request):
    refresh_token = request.data.get('refresh_token')
    if refresh_token:
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({'access_token': access_token})
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=400)
    else:
        return Response({'error': 'Refresh token not provided'}, status=400)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    return "im protected"



# class NoteViewSet(APIView):
#     # permission_classes = [IsAuthenticated]  # Add authentication permission

#     def get(self, request, pk=None):
#         if pk is not None:
#             note = Note.objects.get(id=pk)
#             serializer = NoteSerializer(note)
#             return Response(serializer.data)
#         else:
#             notes = Note.objects.all().order_by('-updated')
#             serializer = NoteSerializer(notes, many=True)
#             return Response(serializer.data)

#     def post(self, request):
#         data = request.data
#         note = Note.objects.create(
#             title=data["title"],
#             body=data["body"]
#         )
#         serializer = NoteSerializer(note)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         data = request.data
#         note = Note.objects.get(id=pk)
#         serializer = NoteSerializer(instance=note, data=data)
#         if serializer.is_valid():
#             serializer.save()
#         return Response(serializer.data)

#     def delete(self, request, pk):
#         note = Note.objects.get(id=pk)
#         note.delete()
#         return Response("Note deleted")