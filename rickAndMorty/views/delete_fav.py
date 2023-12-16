from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from rickAndMorty.models import User, Favorite
import json

class Delete_fav(viewsets.ModelViewSet):
    def create(self, request):
        data = json.loads(request.body.decode('utf-8'))
        required_fields = ['userId', 'id']

        if not all(data.get(field) for field in required_fields):
            return Response("error: Missing data.", status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                user = User.objects.get(id=data['userId'])
                favorite = Favorite.objects.get(id=data['id'])
                user.favorites.remove(favorite)

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
        except Favorite.DoesNotExist:
            return Response("error: Favorite not found.", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(f"error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response_data = {"message": "Favorite successfully deleted", "favorites": serialized_favorites}
        return Response(response_data, status=status.HTTP_200_OK)
