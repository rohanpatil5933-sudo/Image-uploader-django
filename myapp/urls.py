from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home_view, name='home'),  # 👈 Add this line
    path('upload/', views.upload_image, name='upload_image'),
    path('delete/<int:image_id>/', views.delete_image, name='delete_image'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
    path('register/', views.register_view, name='register'),
    path('gallery/', views.gallery_view, name='gallery'),
]
