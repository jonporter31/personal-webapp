import logging
logger = logging.getLogger('webapp_main')

def validate_contact_inputs(included_data):
	logger.debug('validate_contact_inputs : validating user inputs...')
	valid = True
	msg = 'UNKNOWN ERROR - CONTACT SYSTEM ADMINISTRATOR'

	if included_data['name'] in ('',None):
		logger.debug('validate_contact_inputs : ERROR - name found to be null!!!')
		msg = 'i need to know your name'
		valid = False

	elif included_data['email'] in ('',None):
		logger.debug('validate_contact_inputs : ERROR - email found to be null!!!')
		msg = 'i need your email in order to get in touch with you'
		valid = False

	elif included_data['job'] in ('',None):
		logger.debug('validate_contact_inputs : ERROR - job found to be null!!!')
		msg = 'i need a few details on what you\'re interested in hiring me for'
		valid = False


	if valid:
		msg = False
		logger.debug('validate_contact_inputs : YAY - inputs valid!')

	return valid, msg