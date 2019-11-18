import logging
logger = logging.getLogger('webapp_main')

import json

def separate_inputs(inputs_dict):
	action = None
	subaction = None
	included_data = None
	try:
		action = inputs_dict['action']
	except KeyError:
		pass

	try:
		subaction = inputs_dict['subaction']
	except KeyError:
		pass

	try:
		included_data = inputs_dict['included_data']
	except KeyError:
		pass

	return action,subaction,included_data

def convert_empty_string_and_none(string):
	if string == '':
		return None
	elif string == None:
		return ''
	elif string == 'None':
		return None
	else:
		return string

def build_json(msg_reason,error_code='0',error_msg='--none--',return_string=True,**kwargs):
	#this function takes in the various pieces of the payload to returned in the api json
	#the error_code and _msg can be overwritten but defaults to none
	#the msg_reason is passed as a arg, and then all other kwargs become the key/values of the json
	#all kwargs passed in are considered part of the payload and they become prefaced with 'payload__' in the json
	# if return_string is left as True, json.dumps returned, else a dict is returned

	"""
	error codes:
	0: --none--
	1: service unavailable
	2: unknown source
	3: unknown msg_reason

	999: custom error
	XXX: INTERNAL_JSON_BUILD_ERROR
	"""

	server_name = 'webapp'
	if error_code in ['0','1','2','3'] and msg_reason in ['__error__','cache_response','logs_response','react_response']:
		
		if error_msg == '--none--' and error_code != '0':
			logger.debug('build_json : defaulting error_msg based on code...')
			if error_code == '1':
				error_msg = 'service unavailable'
			elif error_code == '2':
				error_msg = 'unknown source'
			elif error_code == '3':
				error_msg = 'unknown msg_reason'

			elif error_code == '999':
				error_msg = 'custom error'
			else:
				error_msg = 'UNKNOWN_ERROR'

		json_dict = {
			'source': server_name,
			'error_code': error_code,
			'error_msg': error_msg,
			'msg_reason': msg_reason
		}

		
		try:
			payload_dict = kwargs['payload']
			logger.debug('build_json : payload detected in kwargs!! adding directly...')
		except KeyError:
			logger.debug('build_json : adding kwargs to payload_dict...')
			payload_dict = {}

			for key in kwargs:
				payload_dict[key] = kwargs[key]

		json_dict['payload'] = json.dumps(payload_dict)
		logger.debug('build_json : json_dict built!')


		return json_dict

	else:
		logger.debug('build_json : error_code and/or msg_reason not recognized!!! - did you forget to add a new command to the msg_reason list?')
		logger.debug('build_json : error_code = '+str(error_code)+' msg_reason = '+str(msg_reason))
		error_dict = {
			'source': server_name,
			'error_code': 'XXX',
			'error_msg': 'INTERNAL_JSON_BUILD_ERROR',
			'msg_reason': msg_reason,
			'payload': {}
		}

		return error_dict