from django.db import models

class Pitch(models.Model):
    founder_name = models.CharField(max_length=100)
    startup_pitch = models.TextField()
    predicted_category = models.CharField(max_length=50)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.founder_name