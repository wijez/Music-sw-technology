from django.urls import path, include
from rest_framework.routers import SimpleRouter
from ..views import AuthView, LoginView, RegistrationView, RefreshView
from ..views import current_user

# Define a SimpleRouter instance
router = SimpleRouter()

# Register viewsets with the router
router.register(r'user', AuthView, basename='user')
router.register(r'login', LoginView, basename='auth-login')
router.register(r'register', RegistrationView, basename='auth-register')
router.register(r'refresh', RefreshView, basename='auth-refresh')


urlpatterns = [
    path('current-user/', current_user, name='current_user'),
    path('', include(router.urls)),
]