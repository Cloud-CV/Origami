# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-26 11:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_demo_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='demo',
            name='address',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
