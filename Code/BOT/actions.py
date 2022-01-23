# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests, json

class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_hello_world"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Hello World!")

        return []

class ActionCoroanStatewiseTotal(Action):

     def name(self):
      return "action_corona_tracker_statewise_total"

     def run(self, dispatcher, tracker, domain):
      response = requests.get("https://api.covid19india.org/data.json").json()
      # print("Length ", len(response["statewise"]))

      entities = tracker.latest_message['entities']
      # print("Last Message Now ", entities)
      state = None
      for e in entities:
            if e['entity'] == "state":
                state = e['value']
      
      # print("State ", state) 
      if state == "corona":
          state = "Total"
      if state == "india":
          state = "Total"   

      # print("State ", state.title())   
      message = "Please enter correct STATE name"
      if(state != None):
          # message = "Please enter correct STATE name"
          for data in response["statewise"]:
              if data["state"] == state.title():
                  print(data)
                  message = "Active cases: "+data["active"] +", Total Confirmed: " + data["confirmed"] +", Total Recovered: " + data["recovered"] + ", Total Deaths: " + data["deaths"] + ", Last updated on " + data["lastupdatedtime"]

      dispatcher.utter_message(message)
      # var = {"title": "abc", "img_url": "xyz.com"}
      # dispatcher.utter_attachment(var)

      return []

	
class ActionCoroanStatewiseSingle(Action):

     def name(self):
      return "action_corona_tracker_statewise_single"

     def run(self, dispatcher, tracker, domain):
      response = requests.get("https://api.covid19india.org/data.json").json()
      # print("Length ", len(response["statewise"]))

      entities = tracker.latest_message['entities']
      # print("Last Message Now ", entities)
      state = None
      status = None
      for e in entities:
            if e['entity'] == "state":
                state = e['value']
            if e['entity'] == "status":
            	status = e['value']
      
      # print("State ", state) 
      if state == "corona":
          state = "Total"
      if state == "india":
          state = "Total"   

      # print("State ", state.title())   
      message = "Please enter correct STATE name. Ex: Total recovered cases in Rajasthan, Total active cases in Uttar Pradesh etc."
      if(state != None and status != None):
          for data in response["statewise"]:
              if data["state"] == state.title():
                  print(data)
                  if(status.lower() == "recovered"):
                  	message = "Total Recovered: " + data["recovered"] + ", Last updated on " + data["lastupdatedtime"]
                  if(status.lower() == "dead"):
                  	message = "Total Deaths: " + data["deaths"] + ", Last updated on " + data["lastupdatedtime"]
                  if(status.lower() == "deaths"):
                  	message = "Total Deaths: " + data["deaths"] + ", Last updated on " + data["lastupdatedtime"]
                  if(status.lower() == "confirmed"):
                  	message = "Total Confirmed: " + data["confirmed"] + ", Last updated on " + data["lastupdatedtime"]
                  if(status.lower() == "active"):
                  	message = "Active cases: "+data["active"] + ", Last updated on " + data["lastupdatedtime"]

      dispatcher.utter_message(message)

      return []


class ActionLatestnews(Action):

     def name(self):
      return "action_covid_news"

     def run(self, dispatcher, tracker, domain):
      response = requests.get("http://newsapi.org/v2/top-headlines?q=Covid-19&country=in&apiKey=dcc3c5e128ae4940bf84457edbbb1aa7").json()
      print(response)

      if response != {} or response is not None:
        dispatcher.utter_attachment(response)

      return []

