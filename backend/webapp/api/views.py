# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
import io
import os
#import pickle
#import urllib.request
#import PyPDF2
from django.http import FileResponse, HttpResponse

from slackclient import SlackClient

from rest_framework.decorators import authentication_classes, permission_classes

#import thread
import json
import logging
# from tools.log_util import get_log_string

logger = logging.getLogger('webapp_main')

from django.core.cache import cache
from .permission_checker import permission_checker
from .form_submit import form_submit
from .auth_helper import auth_helper
from .slack_helper import slack_helper

from tools.utils import build_json
from .models import TranLog, NextUp
from ipware import get_client_ip
#from ipstack import GeoLookup
import _thread
from tools.utils import update_locn_on_trans


SLACK_VERIFICATION_TOKEN = getattr(settings, 'SLACK_VERIFICATION_TOKEN', None)
SLACK_BOT_USER_TOKEN = getattr(settings, 'SLACK_BOT_USER_TOKEN', None)
Client = SlackClient(SLACK_BOT_USER_TOKEN)

@ensure_csrf_cookie
def index(request):
	return HttpResponse("Hello, world! The  /api/ endpoint is used for integration with internal and external applications. You're probably looking for toolkit.scapath.com - try that!")

class API(APIView):

	def post(self, request, *args, **kwargs):

		tran_id_next_up = NextUp.objects.get(next_up_type='tran_id')
		new_tran_id = tran_id_next_up.next_up_value
		tran_id_next_up.next_up_value = new_tran_id + tran_id_next_up.increment
		tran_id_next_up.save()

		ip, is_routable = get_client_ip(request)		

		new_tran = TranLog(
			direction='request',
			tran_id=new_tran_id,
			client_ip=str(ip),
			data=str(request.data)
		)
		new_tran.save()

		self.message_data = request.data
		logger.debug('\n\nSTART OF NEW MESSAGE PROCESSING\n\n')
		logger.debug('post : tran_id = '+str(new_tran_id)+' / tran_log_id = '+str(new_tran.tran_log_id)+' / inbound request data '+str(self.message_data))		
		
		_thread.start_new_thread( update_locn_on_trans, (new_tran.tran_log_id, ip, ) )

		output_json = None


		if self.message_data['error_code'] == '0':
			logger.debug('post : tran_id = '+str(new_tran_id)+' / no errors detected! parsing...')
			#structure exists to pass in an error code, although it doesn't really make sense to be calling
			#	the api and passing in an error...

			if self.message_data['source'] == 'react':
				logger.debug('post : tran_id = '+str(new_tran_id)+' / message from react! msg_reason = '+self.message_data['msg_reason'])
				if self.message_data['msg_reason'] == 'form_submit':
					output_json = build_json(msg_reason='react_response',payload=form_submit(self.message_data['payload'],request,new_tran_id))

				elif self.message_data['msg_reason'] == 'auth':
					output_json = build_json(msg_reason='react_response',payload=auth_helper(self.message_data['payload'],request,new_tran_id))

				elif self.message_data['msg_reason'] == 'permission_check':
					output_json = build_json(msg_reason='react_response',payload=permission_checker(self.message_data['payload'],request,new_tran_id))

				else:
					logger.debug('post : tran_id = '+str(new_tran_id)+' / unknown msg_reason coming from react!!! returing error...')
					output_json = build_json(error_code='3',msg_reason='__error__')
			
			else:
				output_json = build_json(error_code='2',msg_reason='--none--')


			#in this setup, the resposne from build_json is always returned, even if there's an internal json build error
			new_resp = TranLog(
				direction='response',
				tran_id=new_tran_id,
				client_ip=str(ip),
				data=str(output_json)
			)
			new_resp.save()
			logger.debug('post : tran_id = '+str(new_tran_id)+' / tran_log_id = '+str(new_resp.tran_log_id)+' / outbound response data '+str(output_json))

			return JsonResponse(output_json)
		else:
			#if passed in with an error - more of a future framework at this point
			if self.message_data['error_code'] == '1':
				return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)
			else:
				return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)






@authentication_classes([])
@permission_classes([])
class ANON_API(APIView):

	def post(self, request, *args, **kwargs):

		tran_id_next_up = NextUp.objects.get(next_up_type='tran_id')
		new_tran_id = tran_id_next_up.next_up_value
		tran_id_next_up.next_up_value = new_tran_id + tran_id_next_up.increment
		tran_id_next_up.save()

		ip, is_routable = get_client_ip(request)				

		new_tran = TranLog(
			direction='request',
			tran_id=new_tran_id,
			client_ip=str(ip),
			data=str(request.data)
		)
		new_tran.save()

		self.message_data = request.data
		logger.debug('\n\nSTART OF NEW MESSAGE PROCESSING\n\n')
		logger.debug('post : tran_id = '+str(new_tran_id)+' / tran_log_id = '+str(new_tran.tran_log_id)+' / inbound request data '+str(self.message_data))		
		
		_thread.start_new_thread( update_locn_on_trans, (new_tran.tran_log_id, ip, ) )

		output_json = None


		if self.message_data['error_code'] == '0':
			logger.debug('post : tran_id = '+str(new_tran_id)+' / no errors detected! parsing...')
			#structure exists to pass in an error code, although it doesn't really make sense to be calling
			#	the api and passing in an error...

			if self.message_data['source'] == 'react':
				logger.debug('post : tran_id = '+str(new_tran_id)+' / message from react! msg_reason = '+self.message_data['msg_reason'])
				if self.message_data['msg_reason'] == 'form_submit':
					output_json = build_json(msg_reason='react_response',payload=form_submit(self.message_data['payload'],request,new_tran_id))

				elif self.message_data['msg_reason'] == 'appbar_load':
					output_json = build_json(msg_reason='react_response',payload={'successful':True})

				else:
					logger.debug('post : tran_id = '+str(new_tran_id)+' / unknown msg_reason coming from react!!! returing error...')
					output_json = build_json(error_code='3',msg_reason='__error__')
			
			else:
				output_json = build_json(error_code='2',msg_reason='--none--')


			#in this setup, the resposne from build_json is always returned, even if there's an internal json build error
			new_resp = TranLog(
				direction='response',
				tran_id=new_tran_id,
				client_ip=str(ip),
				data=str(output_json)
			)
			new_resp.save()
			logger.debug('post : tran_id = '+str(new_tran_id)+' / tran_log_id = '+str(new_resp.tran_log_id)+' / outbound response data '+str(output_json))

			return JsonResponse(output_json)
		else:
			#if passed in with an error - more of a future framework at this point
			if self.message_data['error_code'] == '1':
				return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)
			else:
				return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@authentication_classes([])
@permission_classes([])
class Events(APIView):
	def post(self, request, *args, **kwargs):

		slack_message = request.data
		logger.debug('slack_post : '+str(slack_message))

		if slack_message.get('token') != SLACK_VERIFICATION_TOKEN:
			return Response(status=status.HTTP_403_FORBIDDEN)

		# verification challenge
		if slack_message.get('type') == 'url_verification':
			return Response(data=slack_message,
							status=status.HTTP_200_OK)
		# greet bot
		if 'event' in slack_message:							  #4
			event_message = slack_message.get('event')			#
			
			# ignore bot's own message
			if event_message.get('subtype') == 'bot_message':	 #5
				return Response(status=status.HTTP_200_OK)		#
			
			# process user's message
			user = event_message.get('user')
			text = event_message.get('text')
			channel = event_message.get('channel')
			slack_helper(user,text,channel)
			return Response(status=status.HTTP_200_OK)

		return Response(status=status.HTTP_200_OK)


def download_resume(request):
	with open('/home/jonathanporter/webapp/backend/webapp/files/Jonathan_Porter_Resume.pdf', 'rb') as pdf:
		response = HttpResponse(pdf.read(), content_type='application/pdf')
		response['Content-Disposition'] = 'inline;filename=Jonathan_Porter_Resume.pdf'
		return response
