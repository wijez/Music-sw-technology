# music/urls.py
from django.urls import path
from ..views import FavoriteListCreateAPIView, FavoriteRetrieveDestroyAPIView,CheckFavoriteAPIView,AddFavoriteAPIView

urlpatterns = [
     path('add/', FavoriteListCreateAPIView.as_view(), name='favorite-list-create'),
    path('favorites/<int:pk>/', FavoriteRetrieveDestroyAPIView.as_view(), name='favorite-retrieve-destroy'),
    path('check/<int:pk>/', CheckFavoriteAPIView.as_view(), name='check-favorite'),
    path('add/<int:track_id>/', AddFavoriteAPIView.as_view(), name='add-favorite'),
]

