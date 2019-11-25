from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .scheduled_jobs import *

# initialize logger
import logging
logger = logging.getLogger('webapp_main')

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_need_to_reply, 'interval', minutes=180) #180 minutes = 3 hours
    scheduler.add_job(check_trans_per_ip, 'interval', minutes=720) #720 minutes = 12 hours
    scheduler.add_job(check_public_ip, 'interval', minutes=1440) #1440 minutes = 24 hours
    scheduler.start()
    logger.debug('start : scheduled jobs started successfully!')