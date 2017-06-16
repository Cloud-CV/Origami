"""django-server URL Configuration

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

from api.views import *

from rest_framework_mongoengine import routers

router = routers.DefaultRouter()
router.register(r'demo', DemoViewSet, r"demo")
router.register(r'input-component', InputComponentViewSet, r"input-component")
router.register(r'output-component', InputComponentViewSet, r"output-component")
router.register(r'getpermalink', DemoViewSet, r"getpermalink")
router.register(r'root-settings', DemoViewSet, r"root-settings")

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls, namespace='api')),
    url(r'^api/demo/(\d+)/(\d+)', user_demo),
    url(r'^api/input-component/(\d+)/(\d+)', user_input_component),
    url(r'^api/output-component/(\d+)/(\d+)', user_output_component),
    url(r'^$',
        generic.TemplateView.as_view(template_name='view1.html')),
]
