from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'contents', views.get_page_data, name='get-entire-page'),
    url(r'menu', views.menu, name='get-menu-block'),
]
