from django.contrib import admin

# Register your models here.
from .models import Track, Favorite, Auth

admin.site.register(Track)
admin.site.register(Favorite)
admin.site.register(Auth)