from django.contrib import admin

# Register your models here.
from .models import Track, Favorite, Auth, CartItem

admin.site.register(Track)
admin.site.register(Favorite)
admin.site.register(Auth)
admin.site.register(CartItem)