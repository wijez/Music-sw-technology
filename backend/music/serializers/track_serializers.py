from rest_framework import serializers
from ..models import Track

class TrackSerializer(serializers.ModelSerializer):
    favorites = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='favorites'
     )
    class Meta:
        model = Track
        fields = '__all__'