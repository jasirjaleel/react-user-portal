from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.conf import settings
from django.conf.urls.static import static
from .views import (
   UserDetailView,
   UserRegisterView,
   UserUpdateView,
   MyTokenObtainPairView,
   UploadProfileImageView,
   AdminUserListCreateView,
   AdminUserRetrieveUpdateDestroyView
   
)


urlpatterns = [
    # User Management URLs
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('user/update/', UserUpdateView.as_view(), name='user-update'),
     path('upload/', UploadProfileImageView.as_view(), name='upload-profile-image'),

     # Admin

    path('admin/users/', AdminUserListCreateView.as_view(), name='admin-user-list-create'),
    path('admin/users/<int:id>/', AdminUserRetrieveUpdateDestroyView.as_view(), name='admin-user-detail'),
    
    # JWT Token URLs
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)