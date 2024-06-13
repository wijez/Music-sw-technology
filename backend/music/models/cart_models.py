# cart/models.py
from django.db import models
from ..models import Track

class CartItem(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    create_at = models.DateTimeField(auto_now_add=True)
    tax = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.quantity} x {self.track.title} x {self.tax} x {self.create_at}"
