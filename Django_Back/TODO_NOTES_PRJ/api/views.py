from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import APIView
from .models import Note
from .serializers import NoteSerializer

class NoteViewSet(APIView):
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
    