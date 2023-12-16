import re
from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    def validate_email(self, value):
        email = value.strip().lower()
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if User.objects.filter(email = email).exists():
            raise serializers.ValidationError("The entered email is already registered.")
        if not re.match(email_regex, email):
            raise serializers.ValidationError('The entered email is not valid')
        if len(email) > 35:
            raise serializers.ValidationError('Email cannot exceed 35 characters')
        return email
    def validate_password(self, value):
        password = value.strip()
        if len(password) < 6 or len(password) > 12:
            raise serializers.ValidationError('Password must be between 6 and 12 characters')
        hashed_password = make_password(password)
        return hashed_password