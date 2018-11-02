# -*- coding: utf-8 -*-
import sys
if sys.version[0] =='3':
  pass
else:
  from __future__ import unicode_literals

from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'
