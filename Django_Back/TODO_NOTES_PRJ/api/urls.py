from django.urls import path
from . import views

urlpatterns = [
    path('notes/<int:user_id>/', views.UserNoteListView.as_view(), name="user_notes"),
    path('notes/<int:user_id>/<int:pk>/', views.UserNoteDetailView.as_view(), name="user_note_detail"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', views.refresh_access_token),
    path('register/', views.UserRegistrationView.as_view()),
    path('updateUser/<int:id>/', views.UserProfileUpdateView.as_view())
]
