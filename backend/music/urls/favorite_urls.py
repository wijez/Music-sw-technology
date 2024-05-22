from django.urls import path
from ..views import FavoriteView

urlpatterns = [
     path('favorite/', FavoriteView.as_view(), name="favorite")
]
