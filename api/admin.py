# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from api.models import Demo, InputComponent, OutputComponent, RootSettings, Permalink

# Register your models here.

admin.site.register(Demo)
admin.site.register(InputComponent)
admin.site.register(OutputComponent)
admin.site.register(RootSettings)
admin.site.register(Permalink)
