# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db.models import Q
#from django.core.mail import send_mail

#from tools.utils import separate_inputs, convert_empty_string_and_none
#from tools.validators import validate_contact_inputs
from datetime import datetime, timedelta
import pytz
#import _thread

from .models import ContactLog

from django.conf import settings
from slackclient import SlackClient


# initialize logger
import logging
logger = logging.getLogger('webapp_main')

SLACK_VERIFICATION_TOKEN = getattr(settings, 'SLACK_VERIFICATION_TOKEN', None)
SLACK_BOT_USER_TOKEN = getattr(settings, 'SLACK_BOT_USER_TOKEN', None)
Client = SlackClient(SLACK_BOT_USER_TOKEN)

def slack_helper(user,text,channel,**kwargs):
	logger.debug('slack_helper : processing message from '+user+'...')

	msg_str = ''
	if text.strip(' ') not in ('',None):
		try:
			words_list = text.split(' ')
		except:
			words_list = []

		if len(words_list) > 0:
			if words_list[0].lower() in ['r','replied','reply','repliedto','replyto']:
				go = False
				try:
					entered_id = int(words_list[1])
					go = True
				except IndexError:
					logger.debug('slack_helper : no id found in slack message!!!')
					msg_str = ':warning: *error*: please enter an id to update'
				except ValueError:
					logger.debug('slack_helper : invalid id found in slack message!!! could not convert to int')
					msg_str = ':warning: *error*: please enter a numeric value for id to update'

				if go:
					try:
						upd_contact = ContactLog.objects.get(pk=entered_id)
					except ContactLog.DoesNotExist:
						upd_contact = False

					if not upd_contact:
						logger.debug('slack_helper : invalid id found in slack message!!! contact not found in db')
						msg_str = ':warning: *error*: entered id not found'
					else:
						upd_contact.did_reply = 'Y'
						upd_contact.save()
						logger.debug('slack_helper : contact replied - '+str(entered_id))
						msg_str = ':heavy_check_mark: *success*: contact record '+str(entered_id)+' marked as replied to'

			elif words_list[0].lower() in ['v','view','l','list']:
				go = False
				try:
					parm = words_list[1]
					go = True
				except IndexError:
					logger.debug('slack_helper : no replied/unreplied parameter found in slack message!!!')
					msg_str = ':warning: *error*: please specify replied vs unreplied using "u" or "r" as the second value'

				if go:
					display_list = []
					if parm in ['u','unread','unreplied','unreply','unrepliedto','unreplyto']:
						display_list += [':information_source: _you need to reply to these people:_\n\n']
						all_contact = ContactLog.objects.all().filter(did_reply='N',is_archived='N')
						#source_tz = pytz.timezone("UTC")
						eastern_tz = pytz.timezone("US/Eastern")
						for contact in all_contact:
							display_list += [
								str(contact.contact_log_id)+') *name* : '
								+contact.name+' | *email* : '
								+contact.email+' | *phone* : '
								+contact.phone+' | *job desc* : '
								+contact.job_desc+' | *comments* : '
								+contact.comments+' | *reply before* : '
								+contact.reply_by.astimezone(eastern_tz).strftime('%a - %b %d - %-I:%M %p')+' EST\n\n'
							]
						if len(display_list) <= 1:
							display_list += ['_no records found_']

					elif parm in ['r','read','replied','reply']:
						display_list += [':information_source: _you have recently replied to these people:_\n\n']
						all_contact = ContactLog.objects.all().filter(did_reply='Y',is_archived='N')
						for contact in all_contact:
							display_list += [
								str(contact.contact_log_id)+') *name* : '
								+contact.name+' | *email* : '
								+contact.email+' | *phone* : '
								+contact.phone+' | *job desc* : '
								+contact.job_desc+' | *comments* : '
								+contact.comments+'\n\n'
							]
						if len(display_list) <= 1:
							display_list += ['_no records found_']

					else:
						logger.debug('slack_helper : invalid replied/unreplied parameter found in slack message!!!')
						msg_str = ':warning: *error*: please specify replied vs unreplied using "u" or "r" as the second value'
					
					for row in display_list:
						msg_str += row

			elif words_list[0].lower() in ['a','archive','h','hide']:
				go = False
				try:
					entered_id = int(words_list[1])
					go = True
				except IndexError:
					logger.debug('slack_helper : no id found in slack message!!!')
					msg_str = ':warning: *error*: please enter an id to update'
				except ValueError:
					logger.debug('slack_helper : invalid id found in slack message!!! could not convert to int')
					msg_str = ':warning: *error*: please enter a numeric value for id to update'

				if go:
					try:
						upd_contact = ContactLog.objects.get(pk=entered_id)
					except ContactLog.DoesNotExist:
						upd_contact = False

					if not upd_contact:
						logger.debug('slack_helper : invalid id found in slack message!!! contact not found in db')
						msg_str = ':warning: *error*: entered id not found'
					else:
						upd_contact.is_archived = 'Y'
						upd_contact.save()
						logger.debug('slack_helper : contact replied - '+str(entered_id))
						msg_str = ':heavy_check_mark: *success*: contact record '+str(entered_id)+' archived'

			Client.api_call(method='chat.postMessage',channel="#general",text=msg_str)







	