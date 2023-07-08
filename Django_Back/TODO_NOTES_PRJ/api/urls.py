from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteViewSet.as_view(), name="notes"),
    path('notes/<int:pk>/', views.NoteViewSet.as_view(), name="notes"),
]