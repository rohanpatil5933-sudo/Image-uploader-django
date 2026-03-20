from django.contrib import admin
from .models import UploadedImage

# Register your models here.
admin.site.register(UploadedImage)

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'photo', 'date')