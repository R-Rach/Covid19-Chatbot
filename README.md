An AI powered contextual Chatbot assistant using RASA Framework for giving information about covid19 like 
- Tell me about covid 19
- What is covid 19
- how coronavirus spreads?
- how to protect from coronavirus
- how to prevent coronavirus
- what are the symptoms of covid 19

Chatbot integrates with covid19.org open-api to fetch latest numbers. It handles queries like
- Current status of {state_name/India}
- Number of cases in {state_name/India}
- Total recovered cases in {state_name/India}
- Total deaths in {state_name/India}
- Total confirmed cases in {state_name/India}
- Total active cases in {state_name/India}

Chatbot also integrates with news open api and shows latest news for queries like
- Show me the latest news
- Latest news on coronavirus
- Coronavirus news

#HOW TO RUN

1. Make a virtual  environment named "rasa-env" and install all packages from requirments.txt, using following command -> pip install -r requirements.txt

2. Open two instances of terminal and activate "rasa-env" environment on both instances.

3. Go to 'Code/BOT/' in FIRST terminal profile and run the command -> " rasa run -m models --enable-api --cors "*" --debug --port 5007 "

4. Go to 'Code/BOT/' in the SECOND terminal profile and run the command -> " rasa run actions "

7. Now open 'index.html' in 'UI' folder on a browser (Chrome preferred) and use the bot.

8. Bot offers the functionality to type or voice recognition by pressing mic button. 