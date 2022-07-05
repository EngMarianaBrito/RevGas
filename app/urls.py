from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^banks/', views.BankList.as_view(), name='bank-list'),
    re_path(r'^bank/(?P<bank_id>[0-9]+)/$',
            views.BankDetail.as_view(), name='bank-detail'),
]
