# Generated by Django 2.2.7 on 2019-11-17 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_contactlog_reply_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublicIp',
            fields=[
                ('ip_id', models.AutoField(primary_key=True, serialize=False)),
                ('ip_address', models.CharField(max_length=100)),
                ('created_dttm', models.DateTimeField(auto_now_add=True)),
                ('modified_dttm', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'ordering': ('ip_id',),
            },
        ),
    ]