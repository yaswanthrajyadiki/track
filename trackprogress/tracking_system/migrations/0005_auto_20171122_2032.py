# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-11-23 01:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracking_system', '0004_auto_20171122_2030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='list',
            name='fall_due_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='list',
            name='winter_due_date',
            field=models.DateField(),
        ),
    ]