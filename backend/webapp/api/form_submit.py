# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db.models import Q
from django.core.mail import send_mail
from django.conf import settings

from tools.utils import separate_inputs, convert_empty_string_and_none
from tools.validators import validate_contact_inputs
from datetime import datetime, timedelta
import _thread

from .models import ContactLog

from django.conf import settings
from slackclient import SlackClient


# initialize logger
import logging
logger = logging.getLogger('webapp_main')

SLACK_VERIFICATION_TOKEN = getattr(settings, 'SLACK_VERIFICATION_TOKEN', None)
SLACK_BOT_USER_TOKEN = getattr(settings, 'SLACK_BOT_USER_TOKEN', None)
Client = SlackClient(SLACK_BOT_USER_TOKEN)

def form_submit(inputs_dict,request,tran_id,**kwargs):
	response_dict = {}

	separated = separate_inputs(inputs_dict)
	action = separated[0]
	subaction = separated[1]
	included_data = separated[2]

	if not request.user.is_authenticated:
		logger.debug('form_submit : tran_id = '+str(tran_id)+' / user is NOT authenticated!!!')
		anon = True
		
		if action == 'contact_me':
			logger.debug('form_submit : tran_id = '+str(tran_id)+' / activating action '+action+'...')

			response_dict['successful'] = False
			valid, msg = validate_contact_inputs(included_data)
			
			if valid:
				new_contact = ContactLog(
					tran_id=tran_id,
					name=included_data['name'],
					email=included_data['email'],
					phone=included_data['phone'],
					job_desc=included_data['job'],
					comments=included_data['comment'],
					reply_by=datetime.now() + timedelta(hours=24)
				)
				new_contact.save()

				_thread.start_new_thread( do_email_and_slack, (included_data, new_contact.contact_log_id, ) )

				response_dict['successful'] = True

			else:
				response_dict['error_msg'] = msg


		else:
			pass
			#TODO should log out the user if somehow end up here

	else:
		logger.debug('form_submit : tran_id = '+str(tran_id)+' / user is authenticated!')
		anon = False
		
		

		logger.debug('form_submit : tran_id = '+str(tran_id)+' / activating action '+action+'...')
	return response_dict


def do_email_and_slack(included_data,contact_log_id):
	msg_str = 'WEBSITE CONTACT on '+datetime.now().strftime('%a - %b %d - %-I:%M %p')+'\n\n'
	msg_str += 'name : '+included_data['name']+'\n'
	msg_str += 'email : '+included_data['email']+'\n'
	msg_str += 'phone : '+included_data['phone']+'\n'
	msg_str += 'job_desc : '+included_data['job']+'\n'
	msg_str += 'comments : '+included_data['comment']+'\n'
	msg_str += '\n\nassigned contact id : '+str(contact_log_id)
	msg_str += '\n\nYOU MUST REPLY BY\n'+(datetime.now() + timedelta(hours=24)).strftime('%a - %b %d, %Y at %-I:%M %p')

	subject = '!! WEBSITE CONTACT !! from '+included_data['name']+' at '+datetime.now().strftime('%a - %b %d - %-I:%M %p')
	send_mail( subject, msg_str, settings.EMAIL_HOST_USER, ['jon.porter31@gmail.com',] )

	msg_str = ':computer: '+msg_str
	Client.api_call(method='chat.postMessage',channel="#general",text=msg_str)