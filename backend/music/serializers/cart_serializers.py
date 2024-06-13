from rest_framework import serializers
from ..models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'track', 'quantity', 'create_at']
