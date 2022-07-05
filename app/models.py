from django.db import models

# Create your models here.


class Bank(models.Model):
    class Meta:
        db_table = 'banks'

    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title
