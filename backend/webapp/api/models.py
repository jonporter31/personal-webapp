# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from datetime import datetime

class TranLog(models.Model):
	tran_log_id = models.AutoField(primary_key=True)
	direction = models.CharField(max_length=10) #request, response
	tran_id = models.IntegerField()
	client_ip = models.CharField(max_length=50,null=True)
	data = models.CharField(max_length=10000,null=True)
	city = models.CharField(max_length=200,null=True)
	region = models.CharField(max_length=200,null=True)
	country = models.CharField(max_length=200,null=True)
	threat_level = models.CharField(max_length=10,default='low')
	lat = models.CharField(max_length=50,null=True)
	lon = models.CharField(max_length=50,null=True)

	created_dttm = models.DateTimeField(auto_now_add=True)
	modified_dttm = models.DateTimeField(auto_now=True,null=True)
	ref_field_1 = models.CharField(max_length=50,null=True)
	ref_field_2 = models.CharField(max_length=50,null=True)

	def __unicode__(self):
		return self.tran_log_id

	class Meta:
		ordering = ('tran_log_id',)


class ContactLog(models.Model):
	contact_log_id = models.AutoField(primary_key=True)
	tran_id = models.IntegerField()
	name = models.CharField(max_length=100)
	email = models.CharField(max_length=100)
	phone = models.CharField(max_length=100,null=True)
	job_desc = models.CharField(max_length=1000)
	comments = models.CharField(max_length=1000,null=True)
	did_reply = models.CharField(max_length=1,default='N')
	reply_by = models.DateTimeField(default=datetime.now)
	is_archived = models.CharField(max_length=1,default='N')

	created_dttm = models.DateTimeField(auto_now_add=True)
	modified_dttm = models.DateTimeField(auto_now=True,null=True)
	ref_field_1 = models.CharField(max_length=50,null=True)
	ref_field_2 = models.CharField(max_length=50,null=True)

	def __unicode__(self):
		return self.contact_log_id

	class Meta:
		ordering = ('contact_log_id',)


class NextUp(models.Model):
	next_up_id = models.AutoField(primary_key=True)
	next_up_type = models.CharField(max_length=25)
	next_up_value = models.IntegerField()
	increment = models.IntegerField()

	created_dttm = models.DateTimeField(auto_now_add=True)
	modified_dttm = models.DateTimeField(auto_now=True,null=True)
	ref_field_1 = models.CharField(max_length=50,null=True)
	ref_field_2 = models.CharField(max_length=50,null=True)

	def __unicode__(self):
		return self.next_up_type

	class Meta:
		ordering = ('next_up_type',)

class PublicIp(models.Model):
	ip_id = models.AutoField(primary_key=True)
	ip_address = models.CharField(max_length=100)

	created_dttm = models.DateTimeField(auto_now_add=True)
	modified_dttm = models.DateTimeField(auto_now=True,null=True)


	def __unicode__(self):
		return self.ip_id

	class Meta:
		ordering = ('ip_id',)