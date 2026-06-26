from django.urls import path
from .views import reports_list, delete_report

urlpatterns = [
    path("reports/", reports_list),
    path("reports/<int:pk>/", delete_report),
]