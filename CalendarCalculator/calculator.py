#!/usr/bin/env python3

import datetime
import os.path
import sys

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


def calc_income(events, event_filter=None):
    if len(events) == 0:
        return "No Events"

    income_str = ''
    total_sum = 0
    total_hrs = 0
    max_title_str_len = 0
    idx_title_str_len = 0
    for event in events:
        max_title_str_len = len(event['summary']) if len(event['summary']) > max_title_str_len else max_title_str_len

    for i, event in enumerate(events):
        if event_filter == None or event_filter in event['summary']:
            cal_event = CalendarEvent(event, max_title_str_len)
            total_sum += cal_event.event_income
            total_hrs += cal_event.num_hours
            income_str += str(i).rjust(2) + " : " + str(cal_event) + '\n'
            idx_title_str_len = cal_event.index_time_str_len

    income_str += "".ljust(idx_title_str_len + 5) + "Total".ljust(max_title_str_len + 1) + " : " + helpers.decimal_2_format(total_hrs) + ' hrs -> $  ' + helpers.dollar_format(total_sum)

    return income_str

class CalendarEvent:

    def __init__(self, event, max_title_str_len):
        self.max_title_str_len = max_title_str_len
        self.title = event['summary']
        self.start = datetime.datetime.strptime(event['start'].get('dateTime')[0:19], '%Y-%m-%dT%H:%M:%S')
        self.end = datetime.datetime.strptime(event['end'].get('dateTime')[0:19], '%Y-%m-%dT%H:%M:%S')
        self.num_hours = (self.end - self.start).seconds / 3600
        self.event_income = helpers.calc_income(self.title, self.num_hours)

    def __str__(self):
        title = self.title.ljust(self.max_title_str_len + 1)
        date = self.start.strftime('%m/%d/%Y')
        start = self.start.strftime('%I:%M %p')
        end = self.end.strftime('%I:%M %p')

        index_time_str = date + ' : ' + start + ' -> ' + end + ' : '
        self.index_time_str_len = len(index_time_str)
        title_hrs_income_str = title + ' : ' + helpers.decimal_2_format(self.num_hours) + ' hrs -> $  ' + helpers.dollar_format(self.event_income)
        return index_time_str + title_hrs_income_str


if __name__ == '__main__':
    calendar = 'Work'
    start_time = datetime.datetime.now().strftime('%m/%d/%Y')
    end_time = None
    event_filter = None

    if len(sys.argv) > 1:
        calendar = sys.argv[1]
        if len(sys.argv) > 2:
            start_time = sys.argv[2]
            if len(sys.argv) > 3:
                end_time = sys.argv[3]
                if len(sys.argv) > 4:
                    event_filter = sys.argv[4]


    creds = login()
    events = get_events(creds, calendar, helpers.convert_str_to_datetime(start_time), helpers.convert_str_to_datetime(end_time))
    print(calc_income(events, event_filter))
