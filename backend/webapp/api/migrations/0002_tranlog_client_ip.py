# Generated by Django 2.2.7 on 2019-11-13 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tranlog',
            name='client_ip',
            field=models.CharField(max_length=50, null=True),
        ),
    ]