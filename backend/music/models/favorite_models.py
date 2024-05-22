from django.db import models
from django.conf import settings

class Favorite(models.Model):
  user_id = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE,
                               related_name='favorites')
  track_id = models.ForeignKey('Track', related_name='track', on_delete=models.CASCADE)
  