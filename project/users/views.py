import json
from django.db import IntegrityError
from django.http import *
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view

from .models import *
from django.core.mail import send_mail


# Create your views here.

def index(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        try:
            user = User.objects.create_user(body["name"], body["email"], body["password"])
            user.is_active = False
            user.save()
            email_guid = EmailGuid(user=user)
            email_guid.save()
            send_mail("django test", "localhost:8000/user/validate?guid=" + email_guid.guid,
                      "validate@mail.wesearchers.pt",
                      [user.email])
            return HttpResponse()
        except KeyError:
            return HttpResponseBadRequest("Request badly formatted")
        except IntegrityError:
            return HttpResponseBadRequest("User already exists")
    elif request.method == "GET":
        try:
            user = authenticate(request, username=request.GET["name"], password=request.GET["password"])
        except KeyError:
            return HttpResponseBadRequest("Request badly formatted")
        if user is not None:
            login(request, user)
            return HttpResponse()
        else:
            return HttpResponseBadRequest("User Doesn't Exist")
    else:
        return HttpResponseNotAllowed("Method not Allowed")


def validate(request):
    try:
        guid = EmailGuid.objects.get(guid=request.GET["guid"])
    except KeyError:
        return HttpResponseBadRequest("Request badly formatted")
    if guid is not None:
        user = guid.user
        user.is_active = True
        user.save()
        guid.delete()
        return HttpResponse()
    else:
        return HttpResponseNotFound()
