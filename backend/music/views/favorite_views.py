from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from ..models import Favorite, Track
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import FavoriteSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

@method_decorator(ensure_csrf_cookie, name='dispatch')
class FavoriteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class FavoriteRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]
    
@method_decorator(ensure_csrf_cookie, name='dispatch')
class CheckFavoriteAPIView(generics.RetrieveAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

    def retrieve(self, request, *args, **kwargs):
        track_id = self.kwargs.get('pk')
        user_id = request.user.id
        try:
            favorite = Favorite.objects.get(user_id=user_id, track_id=track_id)
            return Response({'is_favorite': True}, status=status.HTTP_200_OK)
        except Favorite.DoesNotExist:
            return Response({'is_favorite': False}, status=status.HTTP_200_OK)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class AddFavoriteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, track_id):
        user = request.user
        try:
            track = Track.objects.get(id=track_id)
        except Track.DoesNotExist:
            return Response({'error': 'Track does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        favorite, created = Favorite.objects.get_or_create(user_id=user, track_id=track)
        
        if created:
            return Response({'status': 'added to favorites'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'status': 'already in favorites'}, status=status.HTTP_200_OK)
