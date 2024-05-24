# music/views.py
from rest_framework import generics, status
from ..models import Track
from ..serializers import TrackSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

class TrackListCreate(generics.ListCreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

class TrackDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
# views.py

@api_view(['GET'])
def get_tracks(request):
    tracks = Track.objects.all()
    track_list = [{
        "id": track.id,
        "title": track.title,
        "artist": track.artist,
        "album": track.album,
        "genre": track.genre,
        "audio_file": track.audio_file.url  # Include the URL of the audio file
    } for track in tracks]
    return JsonResponse(track_list, safe=False)

@api_view(['GET'])
def search_tracks(request):
    query = request.GET.get('q', '')
    if query:
        tracks = Track.objects.filter(
            Q(title__icontains=query) |
            Q(artist__icontains=query) |
            Q(album__icontains=query)
        )
    else:
        tracks = Track.objects.all()
    serializer = TrackSerializer(tracks, many=True)
    return Response(serializer.data)

# class TrackUpdate(generics.UpdateAPIView):
#     queryset = Track.objects.all()
#     serializer_class = TrackSerializer
    



# class TrackDelete(generics.DestroyAPIView):
#     queryset = Track.objects.all()
#     serializer_class = TrackSerializer

