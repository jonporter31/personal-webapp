from api.models import ContactLog, TranLog
from django.db.models import Max
from django.db.models import Count
from api.models import PublicIp

from django.conf import settings
from slackclient import SlackClient

from datetime import datetime, timedelta
import pytz
from requests import get

# initialize logger
import logging
logger = logging.getLogger('webapp_main')

SLACK_VERIFICATION_TOKEN = getattr(settings, 'SLACK_VERIFICATION_TOKEN', None)
SLACK_BOT_USER_TOKEN = getattr(settings, 'SLACK_BOT_USER_TOKEN', None)
Client = SlackClient(SLACK_BOT_USER_TOKEN)

def check_need_to_reply():
	logger.debug('scheduled_jobs - check_need_to_reply : checking if outstanding contact records...')
	msg_str = ''
	all_contact = ContactLog.objects.all().filter(did_reply='N',is_archived='N')
	display_list = [':rotating_light: _awaiting replies:_\n\n']
	utc_tz = pytz.timezone("UTC")
	eastern_tz = pytz.timezone("US/Eastern")
	for contact in all_contact:
		reply_by_time_list = str(contact.reply_by - eastern_tz.localize(datetime.now()).astimezone(utc_tz)).split(':')
		if reply_by_time_list[0] in ('',None,'0','00') and reply_by_time_list[1] in ('',None,'0','00'):
			time_display = '*OVERDUE*'
		else:
			time_display = reply_by_time_list[0]+' hrs '+reply_by_time_list[1]+' min'
		display_list += [
			str(contact.contact_log_id)+') *name* : '
			+contact.name+' | *email* : '
			+contact.email+' | *phone* : '
			+contact.phone+' | *job desc* : '
			+contact.job_desc+' | *comments* : '
			+contact.comments+' | *time remaining to reply* : '
			+time_display+'\n\n'
		]

	if len(display_list) <= 1:
		logger.debug('scheduled_jobs - check_need_to_reply : no outstanding records found! good job replying timely :)')
	else:

		for row in display_list:
			msg_str += row
		logger.debug('scheduled_jobs - check_need_to_reply : sending slack message with outstanding contact records...')
		Client.api_call(method='chat.postMessage',channel="#general",text=msg_str)


def check_trans_per_ip():
	logger.debug('scheduled_jobs - check_trans_per_ip : analyzing tran_log data from last 12 hours...')
	msg_str = ''
	utc_tz = pytz.timezone("UTC")
	eastern_tz = pytz.timezone("US/Eastern")
	twelve_hours_ago_in_utc = eastern_tz.localize(datetime.now() - timedelta(hours=12)).astimezone(utc_tz)
	all_trans = TranLog.objects.all().filter(created_dttm__gt=twelve_hours_ago_in_utc,direction='request').only('client_ip').annotate(cnt_tran=Count('tran_log_id'),max_dt=Max('created_dttm'))

	results_dict = {}
	for tran in all_trans:
		if tran.client_ip not in results_dict.keys():
			results_dict[tran.client_ip] = {'cnt_tran':tran.cnt_tran, 'max_dt':tran.max_dt}
		else:
			results_dict[tran.client_ip]['cnt_tran'] += tran.cnt_tran
			results_dict[tran.client_ip]['max_dt'] = tran.max_dt
	
	display_list = [':information_source: _transaction log by ip address:_\n\n']
	for ip_add in results_dict.keys():
		display_list += [
			str(ip_add)+' - '
			+str(results_dict[ip_add]['cnt_tran'])+' transactions in the last 12 hours _[last accessed '
			+results_dict[ip_add]['max_dt'].strftime('%b %d, %Y - %H:%M %p')+' UTC'
			+']_\n\n'
		]

	if len(display_list) <= 1:
		logger.debug('scheduled_jobs - check_trans_per_ip : no transactions in last 12 hours')
	else:

		for row in display_list:
			msg_str += row
		logger.debug('scheduled_jobs - check_trans_per_ip : sending slack message with transaction data...')
		Client.api_call(method='chat.postMessage',channel="#general",text=msg_str)


def check_public_ip():
	logger.debug('scheduled_jobs - check_public_ip : pulling current ip address...')
	ip_address = get('https://api.ipify.org').text
	last_ip = PublicIp.objects.all().order_by('-created_dttm')[0]
	if ip_address == last_ip.ip_address:
		same = True
	else:
		same = False
	new_rec = PublicIp(ip_address=ip_address)
	new_rec.save()

	if same:
		msg_str = ':information_source: your public ip is the same as yesterday _['+ip_address+']_'
	else:
		msg_str = ':rotating_light: your public ip has changed! update dns records on domains.google to '+ip_address

	Client.api_call(method='chat.postMessage',channel="#general",text=msg_str)