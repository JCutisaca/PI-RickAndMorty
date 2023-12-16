from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from rickAndMorty.models import User, Favorite
import json

class Post_fav(viewsets.ModelViewSet):
    def create(self, request):
        data = json.loads(request.body.decode('utf-8'))
        required_fields = ['userId', 'id', 'status', 'name', 'species', 'origin', 'image', 'gender']

        if not all(data.get(field) for field in required_fields):
            return Response("error: Missing required fields", status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                user = User.objects.get(id=data['userId'])
                favorite_data = {
                    "id": data.get("id"),
                    "status": data.get("status"),
                    "name": data.get("name"),
                    "species": data.get("species"),
                    "origin": data.get("origin"),
                    "image": data.get("image"),
                    "gender": data.get("gender"),
                }

                favorite = Favorite.objects.create(**favorite_data)
                user.favorites.add(favorite)

                user_favorites = user.favorites.all()
                serialized_favorites = [{
                    'id': fav.id,
                    'status': fav.status,
                    'name': fav.name,
                    'species': fav.species,
                    'origin': fav.origin,
                    'image': fav.image,
                    'gender': fav.gender,
                } for fav in user_favorites]

        except User.DoesNotExist:
            return Response("error: User not found.", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(f"error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response_data = {"message": "Favorite successfully created", "favorites": serialized_favorites}
        return Response(response_data, status=status.HTTP_201_CREATED)