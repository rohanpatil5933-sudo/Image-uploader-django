from django.db import models
from django.contrib.auth.models import User

class UploadedImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='uploads/')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.id} - {self.photo} - {self.date.strftime('%Y-%m-%d %H:%M:%S')}"