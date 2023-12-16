# Generated by Django 5.0 on 2023-12-14 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('Alive', 'Alive'), ('Dead', 'Dead'), ('unknown', 'unknown')], max_length=10)),
                ('species', models.CharField(max_length=255)),
                ('gender', models.CharField(choices=[('Female', 'Female'), ('Male', 'Male'), ('Genderless', 'Genderless'), ('unknown', 'unknown')], max_length=12)),
                ('origin', models.CharField(max_length=255)),
                ('image', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=12)),
                ('favorites', models.ManyToManyField(blank=True, related_name='user_favorite', to='rickAndMorty.favorite')),
            ],
        ),
    ]
