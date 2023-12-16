from django.db import models

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(null=False)
    password = models.CharField(max_length = 255, null=False)
    favorites = models.ManyToManyField('Favorite', related_name='user_favorite', blank=True)

class Favorite(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length = 255, null=False)

    status_choices = [
        ('Alive', 'Alive'),
        ('Dead', 'Dead'),
        ('unknown', 'unknown')
    ]
    status = models.CharField(max_length=10, null=False, choices=status_choices)
    species = models.CharField(max_length=255, null=False)

    gender_choices = [
        ('Female', 'Female'),
        ('Male', 'Male'),
        ('Genderless', 'Genderless'),
        ('unknown', 'unknown')
    ]

    gender = models.CharField(max_length=12, null=False, choices=gender_choices)
    origin = models.CharField(max_length=255, null=False)
    image = models.CharField(max_length=255, null=False)
