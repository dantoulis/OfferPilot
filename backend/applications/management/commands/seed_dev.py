from datetime import date, timedelta
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from applications.models import Company, JobApplication

class Command(BaseCommand):
    help = "Seed local development data."

    @transaction.atomic
    def handle(self, *args, **options):
        if not settings.DEBUG:
            raise CommandError("seed_dev can only run when DEBUG=True.")

        User = get_user_model()
        user, created = User.objects.get_or_create(
            username="demo",
            defaults={"email": "demo@example.com"},
        )

        if created:
            user.set_password("demo")
            user.save(update_fields=["password"])
        elif not user.check_password("demo"):
            user.set_password("demo")
            user.save(update_fields=["password"])

        today = date.today()
        seed_rows = [
            {
                "company": "Acme",
                "title": "Frontend Developer",
                "location": "Athens, Greece",
                "workplace_type": JobApplication.WorkplaceType.REMOTE,
                "status": JobApplication.Status.APPLIED,
                "priority": JobApplication.Priority.HIGH,
                "salary_min": 30000,
                "salary_max": 45000,
                "date_applied": today - timedelta(days=4),
                "deadline": today + timedelta(days=10),
            },
            {
                "company": "Northstar Labs",
                "title": "Backend Developer",
                "location": "Berlin, Germany",
                "workplace_type": JobApplication.WorkplaceType.HYBRID,
                "status": JobApplication.Status.IN_REVIEW,
                "priority": JobApplication.Priority.MEDIUM,
                "salary_min": 42000,
                "salary_max": 58000,
                "date_applied": today - timedelta(days=12),
                "deadline": today + timedelta(days=5),
            },
            {
                "company": "PixelForge",
                "title": "Full Stack Engineer",
                "location": "Remote",
                "workplace_type": JobApplication.WorkplaceType.REMOTE,
                "status": JobApplication.Status.INTERVIEWING,
                "priority": JobApplication.Priority.HIGH,
                "salary_min": 50000,
                "salary_max": 70000,
                "date_applied": today - timedelta(days=21),
                "deadline": today + timedelta(days=3),
            },
            {
                "company": "CloudNest",
                "title": "DevOps Engineer",
                "location": "Amsterdam, Netherlands",
                "workplace_type": JobApplication.WorkplaceType.ONSITE,
                "status": JobApplication.Status.TECHNICAL_TEST,
                "priority": JobApplication.Priority.HIGH,
                "salary_min": 55000,
                "salary_max": 75000,
                "date_applied": today - timedelta(days=16),
                "deadline": today + timedelta(days=2),
            },
            {
                "company": "DataSpring",
                "title": "Data Analyst",
                "location": "London, UK",
                "workplace_type": JobApplication.WorkplaceType.HYBRID,
                "status": JobApplication.Status.OFFER,
                "priority": JobApplication.Priority.HIGH,
                "salary_min": 38000,
                "salary_max": 52000,
                "date_applied": today - timedelta(days=35),
                "deadline": today + timedelta(days=7),
            },
            {
                "company": "BrightPath",
                "title": "Junior React Developer",
                "location": "Thessaloniki, Greece",
                "workplace_type": JobApplication.WorkplaceType.REMOTE,
                "status": JobApplication.Status.REJECTED,
                "priority": JobApplication.Priority.LOW,
                "salary_min": 22000,
                "salary_max": 30000,
                "date_applied": today - timedelta(days=28),
                "deadline": today - timedelta(days=8),
            },
            {
                "company": "Orbit Systems",
                "title": "Python Developer",
                "location": "Madrid, Spain",
                "workplace_type": JobApplication.WorkplaceType.HYBRID,
                "status": JobApplication.Status.GHOSTED,
                "priority": JobApplication.Priority.MEDIUM,
                "salary_min": 36000,
                "salary_max": 48000,
                "date_applied": today - timedelta(days=45),
                "deadline": today - timedelta(days=15),
            },
            {
                "company": "GreenByte",
                "title": "QA Automation Engineer",
                "location": "Lisbon, Portugal",
                "workplace_type": JobApplication.WorkplaceType.ONSITE,
                "status": JobApplication.Status.WITHDRAWN,
                "priority": JobApplication.Priority.LOW,
                "salary_min": 28000,
                "salary_max": 40000,
                "date_applied": today - timedelta(days=18),
                "deadline": today + timedelta(days=1),
            },
            {
                "company": "LaunchWorks",
                "title": "Product Engineer",
                "location": "Remote",
                "workplace_type": JobApplication.WorkplaceType.REMOTE,
                "status": JobApplication.Status.SAVED,
                "priority": JobApplication.Priority.MEDIUM,
                "salary_min": 45000,
                "salary_max": 65000,
                "date_applied": None,
                "deadline": today + timedelta(days=21),
            },
            {
                "company": "CodeHarbor",
                "title": "Django REST Framework Developer",
                "location": "Paris, France",
                "workplace_type": JobApplication.WorkplaceType.HYBRID,
                "status": JobApplication.Status.APPLIED,
                "priority": JobApplication.Priority.HIGH,
                "salary_min": 48000,
                "salary_max": 68000,
                "date_applied": today - timedelta(days=2),
                "deadline": today + timedelta(days=14),
            },
        ]

        created_applications = 0

        for row in seed_rows:
            company, _ = Company.objects.get_or_create(
                user=user,
                name=row["company"],
                defaults={
                    "website": "https://example.com",
                    "location": row["location"],
                    "notes": "Seeded company for local development.",
                },
            )

            application, was_created = JobApplication.objects.get_or_create(
                user=user,
                company=company,
                title=row["title"],
                defaults={
                    "job_url": "https://example.com",
                    "location": row["location"],
                    "workplace_type": row["workplace_type"],
                    "status": row["status"],
                    "priority": row["priority"],
                    "currency": JobApplication.Currency.EUR,
                    "salary_min": row["salary_min"],
                    "salary_max": row["salary_max"],
                    "date_applied": row["date_applied"],
                    "deadline": row["deadline"],
                    "description": "Seeded job application for local development.",
                    "notes": f"Seeded with status: {row['status']}.",
                    "active": row["status"]
                    not in [
                        JobApplication.Status.REJECTED,
                        JobApplication.Status.WITHDRAWN,
                        JobApplication.Status.GHOSTED,
                    ],
                },
            )

            if not was_created and company.website != "https://example.com":
                company.website = "https://example.com"
                company.save(update_fields=["website"])

            if was_created:
                created_applications += 1

        self.stdout.write(
            self.style.SUCCESS(
                "Seeded demo user and applications. "
                f"Created {created_applications} new applications. "
                "Login: demo / demo"
            )
        )
