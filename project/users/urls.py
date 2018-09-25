from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('validate', views.validate),
    path('', views.index),
]
