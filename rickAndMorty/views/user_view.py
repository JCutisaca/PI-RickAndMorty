from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rickAndMorty.serializer import UserSerializer
from rickAndMorty.models import User

class User_view(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            first_error_message = next(iter(serializer.errors.values()))[0]
            return Response(first_error_message, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email or not password:
            return Response({"message": "Missing Data"}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data.get("email").strip().lower()
        password = request.data.get("password").strip()
        if not len(email) or not len(password):
            return Response({"message": "Missing Data"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"message": "User not found"}, status=status.HTTP_400_BAD_REQUEST)
        response = check_password(password, user.password)
        if not response:
            return Response({"message": "Incorrect Password"}, status=status.HTTP_400_BAD_REQUEST)
        if user and response:
            return Response({"access": True, "userId": user.id}, status=status.HTTP_200_OK)