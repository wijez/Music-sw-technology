# music/models.py
from django.db import models
from ..contanst.genre_contanst import GenreEnum

class Track(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100, blank=True)
    release = models.DateField()
    genre = models.CharField(max_length=50, choices=GenreEnum.choices())
    audio_file = models.FileField(upload_to='tracks/')
    image = models.ImageField(upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    favorites = models.ManyToManyField('Favorite', related_name='favorite_tracks')


    def __str__(self):
        return self.title