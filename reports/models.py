from django.db import models

class Report(models.Model):
    image = models.ImageField(upload_to='reports/')
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    confidence = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # ── NUEVO ──
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Reporte {self.id} - {self.category}"
