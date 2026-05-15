from django.conf import settings

ACCESS_COOKIE_NAME = "access_token"
REFRESH_COOKIE_NAME = "refresh_token"

def _cookie_options(max_age):
    return {
        "max_age": int(max_age.total_seconds()),
        "httponly": True,
        "secure": settings.AUTH_COOKIE_SECURE,
        "samesite": settings.AUTH_COOKIE_SAMESITE,
        "path": "/",
    }


def set_auth_cookies(response, access_token, refresh_token=None):
    response.set_cookie(
        ACCESS_COOKIE_NAME,
        access_token,
        **_cookie_options(settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]),
    )

    if refresh_token:
        response.set_cookie(
            REFRESH_COOKIE_NAME,
            refresh_token,
            **_cookie_options(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]),
        )


def delete_auth_cookies(response):
    response.delete_cookie(
        ACCESS_COOKIE_NAME,
        path="/",
        samesite=settings.AUTH_COOKIE_SAMESITE,
    )
    response.delete_cookie(
        REFRESH_COOKIE_NAME,
        path="/",
        samesite=settings.AUTH_COOKIE_SAMESITE,
    )
