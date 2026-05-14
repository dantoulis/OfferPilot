from django.conf import settings
from django.db import models

from .company import Company


class JobApplication(models.Model):
    class Status(models.TextChoices):
        SAVED = "saved", "Saved"
        APPLIED = "applied", "Applied"
        IN_REVIEW = "in_review", "In Review"
        INTERVIEWING = "interviewing", "Interviewing"
        TECHNICAL_TEST = "technical_test", "Technical Test"
        OFFER = "offer", "Offer"
        REJECTED = "rejected", "Rejected"
        WITHDRAWN = "withdrawn", "Withdrawn"
        GHOSTED = "ghosted", "Ghosted"

    class WorkplaceType(models.TextChoices):
        REMOTE = "remote", "Remote"
        HYBRID = "hybrid", "Hybrid"
        ONSITE = "onsite", "On-site"

    class Priority(models.TextChoices):
        LOW = "low", "Low"
        MEDIUM = "medium", "Medium"
        HIGH = "high", "High"

    class Currency(models.TextChoices):
        EUR = "EUR", "Euro"
        USD = "USD", "US Dollar"
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="job_applications",
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="job_applications",
    )

    title = models.CharField(max_length=255)
    job_url = models.URLField(blank=True)
    location = models.CharField(max_length=255, blank=True)

    workplace_type = models.CharField(
        max_length=20,
        choices=WorkplaceType.choices,
        blank=True,
    )
    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.APPLIED,
    )
    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.MEDIUM,
    )

    currency = models.CharField(
        max_length=10, 
        choices= Currency.choices,
        default=Currency.EUR
    )

    salary_min = models.PositiveIntegerField(null=True, blank=True, )
    salary_max = models.PositiveIntegerField(null=True, blank=True)

    date_applied = models.DateField(null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)

    description = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        company_name = self.company.name if self.company else "No company"
        return f"{self.title} at {company_name}"
