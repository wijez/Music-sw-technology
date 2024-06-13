# cart/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import CartItem
from ..models import Track
from ..serializers import CartItemSerializer

@api_view(['POST'])
def add_to_cart(request):
    track_id = request.data.get('track_id')
    quantity = request.data.get('quantity', 1)

    try:
        track = Track.objects.get(pk=track_id)
    except Track.DoesNotExist:
        return Response({"error": "Track not found"}, status=status.HTTP_404_NOT_FOUND)

    cart_item, created = CartItem.objects.get_or_create(track=track)
    cart_item.quantity += int(quantity)
    cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
