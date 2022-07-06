from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import generics
from rest_framework.views import APIView
from .models import Bank
from .serializers import BankSerializer
from rest_framework.response import Response
from django.core import serializers

# Create your views here.


class BankList(generics.ListCreateAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BankDetail(APIView):
    def get(self, request, bank_id):
        try:
            queryset = Bank.objects.get(id=bank_id)
            data = BankSerializer(queryset)
            return Response(data.data)
        except Bank.DoesNotExist:
            return Response({"error": True, "message": "Resource does not exist"})
