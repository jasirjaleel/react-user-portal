from rest_framework import serializers
from .models import User,UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ensure the user has a profile
        profile, created = UserProfile.objects.get_or_create(user=user)
        
        token['profile_pic'] = cls.get_profile_pic_url(user, None)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Ensure the user has a profile
        profile, created = UserProfile.objects.get_or_create(user=self.user)
        
        user_data = UserSerializer(self.user, context=self.context).data
        data['user'] = user_data
        return data

    @staticmethod
    def get_profile_pic_url(user, request):
        try:
            profile_pic = user.profile.profile_pic
            if profile_pic:
                if request:
                    return request.build_absolute_uri(profile_pic.url)
                else:
                    # Use the site's domain for URL construction
                    return f"{settings.BASE_DIR}{profile_pic.url}"
        except UserProfile.DoesNotExist:
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
        exclude = ('password',)


# User Update Serializer
class UserUpdateSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        
        fields = ['first_name', 'last_name', 'phone_number', 'email', 'profile', 'is_active']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)

        # Update user fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.email = validated_data.get('email', instance.email)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()

        # Update or create profile
        if profile_data:
            profile_instance, created = UserProfile.objects.get_or_create(user=instance)
            profile_pic = profile_data.get('profile_pic')
            if profile_pic is not None:
                profile_instance.profile_pic = profile_pic
            profile_instance.save()

        return instance

    
    ########### Admin ############
        
class AdminUserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'phone_number', 'email', 'profile', 'is_active','is_superuser','profile']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'error_messages': {'required': 'Please provide the first name.'}},
            'last_name': {'error_messages': {'required': 'Please provide the last name.'}},
            'phone_number': {'error_messages': {'required': 'Please provide the phone number.'}},
            'email': {'error_messages': {'required': 'Please provide the email address.'}},
        }
    
    def create(self, validated_data):
        profile_data = validated_data.pop('User_Profile', None)
        password = validated_data.pop('password', None)
        user_instance = self.Meta.model(**validated_data)
        if password is not None:
            user_instance.set_password(password)
        user_instance.is_active = True
        user_instance.save()
        if profile_data:
            UserProfile.objects.create(user=user_instance, **profile_data)
        return user_instance