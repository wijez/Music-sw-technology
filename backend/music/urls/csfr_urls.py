from django.urls import path
from ..views import csrf_token

urlpatterns = [
    path('csrf-token/', csrf_token),
]