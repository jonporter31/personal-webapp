from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
    	from tools import updater
    	updater.start()