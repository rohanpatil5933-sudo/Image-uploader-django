from django.shortcuts import render, get_object_or_404, redirect
from .forms import ImageUploadForm
from .models import UploadedImage
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

@login_required
def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.save(commit=False)
            image.user = request.user  # Track who uploaded
            image.save()
            return redirect('upload_image')
    else:
        form = ImageUploadForm()

    # Restrict image visibility
    if request.user.is_superuser:
        img = UploadedImage.objects.all()
    else:
        img = UploadedImage.objects.filter(user=request.user)

    return render(request, 'upload_image.html', {'form': form, 'img': img})


# Delete image
@login_required
def delete_image(request, image_id):
    image = get_object_or_404(UploadedImage, id=image_id)

    # Only allow deletion by owner or admin
    if request.user == image.user or request.user.is_superuser:
        image.photo.delete()
        image.delete()

    return redirect('upload_image')


# Home page
def home_view(request):
    if request.user.is_authenticated:
        images = UploadedImage.objects.filter(user=request.user)
    else:
        images = UploadedImage.objects.all()[:3]  # Show limited images to guests
    return render(request, 'base.html', {'images': images})

# User registration
def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Log the user in after successful registration
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

# Public gallery view
def gallery_view(request):
    images = UploadedImage.objects.all()  # All uploaded images
    return render(request, 'gallery.html', {'images': images})
