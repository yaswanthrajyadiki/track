# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-11-23 01:30
from __future__ import unicode_literals

from django.db import migrations, models
import tracking_system.models


class Migration(migrations.Migration):

    dependencies = [
        ('tracking_system', '0003_auto_20171117_1221'),
    ]

    operations = [
        migrations.RenameField(
            model_name='process',
            old_name='percentage',
            new_name='actual_mark',
        ),
        migrations.AddField(
            model_name='list',
            name='mark',
            field=models.IntegerField(default=None, validators=[tracking_system.models.validate_range]),
        ),
    ]