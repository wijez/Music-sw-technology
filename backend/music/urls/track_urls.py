
from django.urls import path
from ..views import TrackListCreate, TrackDetail
from ..views.track_views import search_tracks
urlpatterns = [
    path('tracks/', TrackListCreate.as_view(), name='track-list-create'),
    path('tracks/<int:pk>', TrackDetail.as_view(), name='track-detail'),
    path('search/', search_tracks, name='search-track')
]