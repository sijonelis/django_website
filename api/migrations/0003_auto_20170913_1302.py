# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-13 05:02
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20170913_1151'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='collection',
            name='image_list',
        ),
        migrations.AddField(
            model_name='collection',
            name='gallery',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Collection'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='CollectionImage',
        ),
    ]