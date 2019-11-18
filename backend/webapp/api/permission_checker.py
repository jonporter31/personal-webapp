# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User

from tools.utils import separate_inputs

# initialize logger
import logging
logger = logging.getLogger('webapp_main')


def permission_checker(inputs_dict,request,tran_id,**kwargs):
	response_dict = {}

	if not request.user.is_authenticated:
		logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user is NOT authenticated!!!')
		anon = True
		response_dict['has_permission'] = False


	else:
		logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user is authenticated!')
		anon = False
		
		separated = separate_inputs(inputs_dict)
		action = separated[0]
		subaction = separated[1]
		included_data = separated[2]

		logger.debug('permission_checker : tran_id = '+str(tran_id)+' / checking for permission '+action+' / '+subaction+'...')

		if action == 'override':
			if subaction == 'staff' or subaction == 'admin':
				if request.user.is_staff:
					logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user is admin!')
					response_dict['has_permission'] = True
				else:
					logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user is NOT admin!!!')
					response_dict['has_permission'] = False
			elif subaction == 'superuser':
				if request.user.is_superuser:
					logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user is superuser!')
					response_dict['has_permission'] = True
				else:
					logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user is NOT superuser!!!')
					response_dict['has_permission'] = False
		elif request.user.has_perm(action+'.'+subaction):
			logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user has permission!')
			response_dict['has_permission'] = True
		else:
			logger.debug('permission_checker : tran_id = '+str(tran_id)+' / user DOES NOT have permission!!!')
			response_dict['has_permission'] = False


	response_dict['anon'] = anon
	logger.debug('react_helper : response dict '+str(response_dict))
	return response_dict


