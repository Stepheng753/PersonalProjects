#!/usr/bin/env python3

import datetime
from pytz import timezone
import os.path

import helpers

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ['https://www.googleapis.com/auth/calendar']

def login():
    creds = None

    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json')

    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)

        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return creds


def get_events(creds, calander_title, start=datetime.datetime.now(), end=None):
    try:
        # Call the Calendar API
        service = build('calendar', 'v3', credentials=creds)

        # Find the Specific Calendar
        calendar_list = service.calendarList().list().execute()
        calander_id = None
        for calendar_list_entry in calendar_list['items']:
            if calander_title.lower() in calendar_list_entry['summary'].lower():
                calander_id = calendar_list_entry['id']
        if calander_id == None:
            print("Could Not Find Calander")
            return []


        # Get Events given timeframe
        if end == None:
            day_of_week = start
            start = helpers.first_last_day_of_week(day_of_week)['first'].isoformat() + 'Z'
            end = helpers.first_last_day_of_week(day_of_week)['last'].isoformat() + 'Z'
        else:
            start = helpers.start_of_day(start).isoformat() + 'Z'
            end = helpers.end_of_day(end).isoformat() + 'Z'
        event_result = service.events().list(calendarId=calander_id, timeMin=start, timeMax=end,
                                            singleEvents=True, orderBy='startTime').execute()
        return event_result.get('items', [])
    except HttpError as error:
        return 'An Error Has Occurred:' + error


def calc_income(events):
    if len(events) == 0:
        return "No Events"

    income_str = ''
    total_sum = 0
    total_hrs = 0
    max_title_str_len = 0
    for event in events:
        max_title_str_len = len(event['summary']) if len(event['summary']) > max_title_str_len else max_title_str_len

    for i, event in enumerate(events):
        print_time_format = '%I:%M %p'
        title = event['summary'].ljust(max_title_str_len + 1)
        start = datetime.datetime.strptime(event['start'].get('dateTime')[0:19], '%Y-%m-%dT%H:%M:%S')
        end = datetime.datetime.strptime(event['end'].get('dateTime')[0:19], '%Y-%m-%dT%H:%M:%S')

        num_hours = (end - start).seconds / 3600
        date = start.strftime('%m/%d/%Y')

        start = start.strftime(print_time_format)
        end = end.strftime(print_time_format)

        event_income = helpers.calc_income(title, num_hours)
        total_sum += event_income
        total_hrs += num_hours

        index_time_str = str(i).rjust(2) + " : " + date + ' : ' + start + ' -> ' + end + ' : '
        title_hrs_income_str = title + ' : ' + helpers.decimal_2_format(num_hours) + ' hrs -> $  ' + helpers.dollar_format(event_income)
        income_str += index_time_str + title_hrs_income_str + '\n'

    income_str += "".ljust(len(index_time_str))
    income_str += "Total".ljust(max_title_str_len + 1) + " : " + helpers.decimal_2_format(total_hrs) + ' hrs -> $  ' + helpers.dollar_format(total_sum)

    return income_str


if __name__ == '__main__':
    creds = login()
    events = get_events(creds, 'Tutoring', helpers.convert_str_to_datetime("06/1/2024"), helpers.convert_str_to_datetime("06/30/2024"))
    print(calc_income(events))
    events = get_events(creds, 'Work')
    print(calc_income(events))
