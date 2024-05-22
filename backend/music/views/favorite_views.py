from rest_framework.views import APIView
from ..models import Favorite
from ..serializers import FavoriteSerializer
from django.http import JsonResponse

class FavoriteView(APIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
