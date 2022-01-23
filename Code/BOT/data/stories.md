## happy path
* greet
  - utter_greet
* mood_great
  - utter_happy

## sad path 1
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* affirm
  - utter_happy

## sad path 2
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* deny
  - utter_goodbye

## say goodbye
* goodbye
  - utter_goodbye

## bot challenge
* bot_challenge
  - utter_iamabot

## corona_statewise_total_tracker
* greet
  - utter_greet
* corona_statewise_total
  - action_corona_tracker_statewise_total
* goodbye
  - utter_goodbye

## corona_statewise_single_tracker
* greet
  - utter_greet
* corona_statewise_single
  - action_corona_tracker_statewise_single
* goodbye
  - utter_goodbye

## corona_about
* greet
  - utter_greet
* about_covid
  - utter_about_covid

## corona_spread
* greet
  - utter_greet
* covid_spread
  - utter_covid_spread

## corona_protect
* greet
  - utter_greet
* covid_protect
  - utter_covid_protect

## corona_symptoms
* greet
  - utter_greet
* covid_symptoms
  - utter_covid_symptoms

## corona_news
* greet
  - utter_greet
* covid_news
  - action_covid_news