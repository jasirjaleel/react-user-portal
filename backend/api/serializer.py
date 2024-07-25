from rest_framework import serializers
from .models import User,UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['profile_pic'] = cls.get_profile_pic_url(user, None)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        request = self.context['request']
        data['user'] = {
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'profile_pic': self.get_profile_pic_url(self.user, request),
            'email': self.user.email,
            'phone_number': self.user.phone_number,
        }
        return data

    @staticmethod
    def get_profile_pic_url(user, request):
        profile_pic = user.profile.profile_pic
        if profile_pic:
            if request:
                return request.build_absolute_uri(profile_pic.url)
            else:
                # Fallback if request is not available
                return f"{settings.BASE_DIR}{profile_pic.url}"
        return None

# User Register Serializer
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name','last_name', 'phone_number', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

# User Profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_pic']

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()  # Nested profile data

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number', 'email', 'profile']


# User Update Serializer
class UserUpdateSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['first_name','last_name', 'phone_number', 'email', 'profile']  # Exclude 'is_active'

    def update(self, instance, validated_data):
        # Extract profile data
        profile_data = validated_data.pop('profile', None)

        # Update user fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        if profile_data:
            profile_instance, created = UserProfile.objects.get_or_create(user=instance)
            profile_pic = profile_data.get('profile_pic')
            if profile_pic is not None:
                profile_instance.profile_pic = profile_pic
            profile_instance.save()

        return instance