# from rest_framework import generics, viewsets, permissions
# from rest_framework.permissions import IsAuthenticated
# from .models import User, UserProfile
# from .serializer import (
#     UserRegisterSerializer, 
#     UserSerializer, 
#     UserProfileSerializer, 
#     UserUpdateSerializer, 
#     AdminUserSerializer
# )

# # User Registration View
# class UserRegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserRegisterSerializer
#     permission_classes = [permissions.AllowAny]

# # User Detail View
# class UserDetailView(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     lookup_field = 'pk'
#     permission_classes = [IsAuthenticated]

# # User Profile Update View
# class UserProfileView(generics.RetrieveUpdateAPIView):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileSerializer
#     permission_classes = [IsAuthenticated]

# # User Update View
# class UserUpdateView(generics.UpdateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserUpdateSerializer
#     lookup_field = 'pk'
#     permission_classes = [IsAuthenticated]


# class IsAdmin(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_staff

# # Admin User ViewSet
# class AdminUserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = AdminUserSerializer
#     permission_classes = [IsAuthenticated,IsAdmin]

from rest_framework import generics ,views
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import User,UserProfile
from .serializer import UserSerializer,UserRegisterSerializer,UserUpdateSerializer,MyTokenObtainPairSerializer,UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from django.http import JsonResponse

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

class UserDetailView(generics.RetrieveAPIView):
    # queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user

class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return the queryset based on the current user
        return User.objects.filter(pk=self.request.user.pk)
    
    def get_object(self):
        return self.request.user
    

    def update(self, request, *args, **kwargs):
        # Print the incoming request data to the console
        print("Request data:", request.body)
        return super().update(request, *args, **kwargs)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

class UploadProfileImageView(views.APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        print("Request data:", request.data)
        print("Files:", request.FILES)
        
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            print("Profile image uploaded successfully:", serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)