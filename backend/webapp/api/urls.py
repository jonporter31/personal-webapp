from django.urls import path, include
from . import views
from .views import API, ANON_API, Events
from rest_framework.authtoken import views as rest_framework_views

urlpatterns = [
	path('', views.index, name="index"),
	path('post/anon/', ANON_API.as_view()),
	path('post/', API.as_view()),
	path('slack/', Events.as_view()),
	path('auth/', rest_framework_views.obtain_auth_token, name='get_auth_token'),
]
