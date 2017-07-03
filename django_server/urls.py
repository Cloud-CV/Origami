"""django_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.views import generic
from api.consumers import inject
from api.views import *

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'demo', DemoViewSet, r"demo")
router.register(r'input-component', InputComponentViewSet, r"input-component")
router.register(r'output-component',
                OutputComponentViewSet, r"output-component")
router.register(r'get-permalink', PermalinkViewSet, r"get-permalink")
router.register(r'root-settings', RootSettingsViewSet, r"root-settings")

urlpatterns = [
    url(r'^admin', admin.site.urls),
    url(r'alive', alive),
    url(r'^accounts/profile', redirect_login),
    url(r'^auth/', include('allauth.urls')),
    url(r'api/is_cloudcv', is_cloudcv),
    url(r'api/rootsettings', root_settings),
    url(r'api/getpermalink/([A-Za-z0-9]+)/?$', get_permalink),
    url(r'api/demo/user/(\d+)', get_all_demos),
    url(r'api/(input|output)component/?(\d*)/?(\d*)', custom_component_controller),
    url(r'^api/demo/(\d+)/?(\d*)', custom_demo_controller),
    url(r'^api/permalink/?(\d*)/?(\d*)', custom_permalink_controller),
    url(r'^api/', include(router.urls, namespace='api')),
    url(r'^inject$', inject),
    url(r'^$',
        generic.TemplateView.as_view(template_name='view1.html')),
    url(r'^(?:.*)/?$',
        generic.TemplateView.as_view(template_name='view1.html')),
]
