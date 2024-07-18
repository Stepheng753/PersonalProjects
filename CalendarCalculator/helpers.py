import datetime
import json

def first_last_day_of_week(dt):
	dt = reset_time(dt)
	if dt.weekday() == 6:
		dt += datetime.timedelta(days=1)

	first = dt - datetime.timedelta(days=(dt.weekday() + 1))
	last = first + datetime.timedelta(days=6)

	return {'first': start_of_day(first), 'last': end_of_day(last)}

def start_of_day(start_day):
	return start_day + datetime.timedelta(hours=7)

def end_of_day(end_day):
	return end_day + datetime.timedelta(hours=30, minutes=59, seconds=59)

def reset_time(datetimeObj):
	date_str = datetime.datetime.strftime(datetimeObj, '%Y-%m-%d')
	return convert_str_to_datetime(date_str, '%Y-%m-%d')

def calc_income(eventName, hrs):
	# Get Tutoring Rates
	rates = None
	with open('rates.json') as ratesJSON:
		rates = json.load(ratesJSON)

	for rate in rates:
		if rate in eventName:
			return rates[rate] * hrs
	return 0

def convert_str_to_datetime(date_str, date_format="%m/%d/%Y"):
	return datetime.datetime.strptime(date_str, date_format)

def dollar_format(dollar_amt):
	return "{:8,.2f}".format(dollar_amt)

def decimal_2_format(num):
	return "{:5.2f}".format(num)