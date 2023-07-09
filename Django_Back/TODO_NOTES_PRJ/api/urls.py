from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    path('notes/', views.NoteViewSet.as_view(), name="notes"),
    path('notes/<int:pk>/', views.NoteViewSet.as_view(), name="notes"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]