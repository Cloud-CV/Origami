# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-21 19:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Demo',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('userid', models.IntegerField()),
                ('coverImage', models.CharField(max_length=300)),
                ('footerMessage', models.CharField(max_length=400)),
                ('description', models.CharField(max_length=1000)),
                ('terminal', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('token', models.CharField(max_length=200)),
                ('status', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='InputComponent',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('baseComponentId', models.IntegerField()),
                ('props', models.TextField()),
                ('demo', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Demo')),
            ],
        ),
        migrations.CreateModel(
            name='OutputComponent',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('baseComponentId', models.IntegerField()),
                ('props', models.TextField()),
                ('demo', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Demo')),
            ],
        ),
        migrations.CreateModel(
            name='Permalink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shortRelativeURL', models.CharField(max_length=100)),
                ('fullRelativeURL', models.CharField(max_length=300)),
                ('demo', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Demo')),
            ],
        ),
        migrations.CreateModel(
            name='RootSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rootUserGithubLoginId', models.IntegerField()),
                ('rootUserGithubLoginName', models.CharField(max_length=30)),
                ('clientid', models.CharField(max_length=40)),
                ('clientsecret', models.CharField(max_length=75)),
                ('isCloudCV', models.BooleanField(default=True)),
                ('allowNewLogins', models.BooleanField(default=True)),
                ('appip', models.CharField(max_length=30)),
                ('port', models.CharField(max_length=5)),
            ],
        ),
    ]
