import hashlib
import random
from django.contrib.auth.models import User
from django.db import models
from rest_framework import serializers


class EmailGuid(models.Model):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.guid = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()

    user = models.OneToOneField(User, models.CASCADE, primary_key=True)
    guid = models.CharField(max_length=40)
