from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
import os
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    print(os.getenv('SECRET_KEY'),'asdfasd')

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]