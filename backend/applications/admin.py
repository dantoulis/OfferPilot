from django.contrib import admin
from .models import Company, JobApplication

# Register your models here.
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name", "user", "website", "location", "created_at"]
    search_fields = ["name", "website", "location"]
    list_filter = ["created_at"]


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "company",
        "user",
        "status",
        "priority",
        "active",
        "date_applied",
        "created_at",
    ]
    search_fields = ["title", "company__name", "location"]
    list_filter = ["status", "priority", "workplace_type", "active", "created_at"]
