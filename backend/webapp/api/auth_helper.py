# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import logout
from django.contrib.auth.models import User, Group
from rest_framework.authtoken.models import Token

from tools.utils import separate_inputs

# initialize logger
import logging
logger = logging.getLogger('webapp_main')

def auth_helper(inputs_dict,request,tran_id,**kwargs):
	response_dict = {}

	if not request.user.is_authenticated:
		logger.debug('auth_helper : tran_id = '+str(tran_id)+' / user is NOT authenticated!!!')
		anon = True
		response_dict['currentConfig'] = 'NONE'
		response_dict['name'] = 'UNAUTHORIZED'

	else:
		logger.debug('auth_helper : tran_id = '+str(tran_id)+' / user is authenticated!')
		anon = False
		
		separated = separate_inputs(inputs_dict)
		action = separated[0]
		subaction = separated[1]
		included_data = separated[2]

		logger.debug('auth_helper : tran_id = '+str(tran_id)+' / activating action '+action+'...')

		if action == 'get_account_name':
			logger.debug('auth_helper : tran_id = '+str(tran_id)+' / ' + action + ' : getting users name based on username...')
			response_dict['name'] = request.user.get_full_name()

		elif action == 'logout':
			logger.debug('auth_helper : tran_id = '+str(tran_id)+' / ' + action + ' : logging out user...')
			response_dict['logout_successful'] = False
			try:
				request.user.auth_token.delete()
				token = Token.objects.create(user=request.user)
				logger.debug('auth_helper : tran_id = '+str(tran_id)+' / ' + action + ' : new token generated!')
				logout(request)
				response_dict['logout_successful'] = True
			except (AttributeError, ObjectDoesNotExist):
				pass

	return response_dict
				