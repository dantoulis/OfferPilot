from django.test import SimpleTestCase


class ModelPackageImportTests(SimpleTestCase):
    def test_models_can_be_imported_from_split_modules(self):
        from applications.models import Company, JobApplication
        from applications.models.application import JobApplication as SplitJobApplication
        from applications.models.company import Company as SplitCompany

        self.assertIs(Company, SplitCompany)
        self.assertIs(JobApplication, SplitJobApplication)
