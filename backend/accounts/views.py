from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .auth_cookies import REFRESH_COOKIE_NAME, delete_auth_cookies, set_auth_cookies
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer


def _tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token), str(refresh)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        access_token, refresh_token = _tokens_for_user(user)

        response = Response(
            {"user": UserSerializer(user).data},
            status=status.HTTP_201_CREATED,
        )
        set_auth_cookies(response, access_token, refresh_token)
        return response


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        access_token, refresh_token = _tokens_for_user(user)

        response = Response({"user": UserSerializer(user).data})
        set_auth_cookies(response, access_token, refresh_token)
        return response


class RefreshView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get(REFRESH_COOKIE_NAME)

        if refresh_token is None:
            return Response(
                {"detail": "Refresh token cookie is missing."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)

        response = Response({"detail": "Token refreshed."})
        set_auth_cookies(
            response,
            serializer.validated_data["access"],
            serializer.validated_data.get("refresh"),
        )
        return response


class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get(REFRESH_COOKIE_NAME)

        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
            except TokenError:
                pass

        response = Response(status=status.HTTP_204_NO_CONTENT)
        delete_auth_cookies(response)
        return response


class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)
