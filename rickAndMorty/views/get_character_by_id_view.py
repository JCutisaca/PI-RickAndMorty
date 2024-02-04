# from django.shortcuts import render

# Create your views here.
import requests
from rest_framework import viewsets, serializers
from rest_framework.response import Response

class CharacterSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    status = serializers.CharField()
    name = serializers.CharField()
    species = serializers.CharField()
    origin = serializers.CharField()
    image = serializers.CharField()
    gender = serializers.CharField()

class Get_character_by_id_view(viewsets.ModelViewSet):
    serializer_class = CharacterSerializer
    def retrieve(self, request, pk=None):
        api_url = f"https://rickandmortyapi.com/api/character/{pk}"
        response = requests.get(api_url)
        data = response.json()

        character_data = {
            "id": data.get("id"),
            "status": data.get("status"),
            "name": data.get("name"),
            "species": data.get("species"),
            "origin": data.get("origin"),
            "image": data.get("image"),
            "gender": data.get("gender"),
        }

        return Response(character_data)


# def get_character_by_id_view(request, id):
#     api_url = f"https://rickandmortyapi.com/api/character/{id}"
#     response = requests.get(api_url)
#     data = response.json()
#     character = {
#         "id": data.get("id"),
#         "status": data.get("status"),
#         "name": data.get("name"),
#         "species": data.get("species"),
#         "origin": data.get("origin"),
#         "image": data.get("image"),
#         "gender": data.get("gender"),
#     }

#     return JsonResponse(character)
