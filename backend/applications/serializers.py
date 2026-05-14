from rest_framework import serializers
from .models import Company, JobApplication

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
      model = Company
      fields = [
          "id",
          "name",
          "website",
          "location",
          "notes",
          "created_at",
          "updated_at",
      ]
      read_only_fields = ["id", "created_at", "updated_at"]

class JobApplicationSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = JobApplication
        fields = [
            "id",
            "company",
            "company_name",
            "title",
            "job_url",
            "location",
            "workplace_type",
            "status",
            "priority",
            "currency",
            "salary_min",
            "salary_max",
            "date_applied",
            "deadline",
            "description",
            "notes",
            "active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate(self, attrs):
        salary_min = attrs.get("salary_min", getattr(self.instance, "salary_min", None))
        salary_max = attrs.get("salary_max", getattr(self.instance, "salary_max", None))

        if salary_min is not None and salary_max is not None and salary_min > salary_max:
            raise serializers.ValidationError(
                {"salary_max": "Salary max must be greater than or equal to salary min."}
            )

        return attrs
