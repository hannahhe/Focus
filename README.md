![alt text](https://github.com/hannahhe/Focus/blob/master/static/img/5.png "Focus")

# Focus
Focus is a web-app designed to keep you on topic in your conversations - with the click of a button, our machine learning algorithms will monitor your conversation and gently notify you when your discussion gets sidetracked.

Our project uses the Google Cloud Speech-to-Text API and the Cloud Natural Language API to analyze your verbal conversation and run it through some sentiment analysis and category classification algorithms. We receive user input on what topic you want to discuss from over 600 categories, then periodically check whether or not your discussion is staying on topic. If we think that you may be straying from the original topic you wished to discuss, our app will remind you to stay focused.

Stay on task. Focus on what matters to you. **Hocus, focus, pocus!**

*Built with Flask and React.*

## Running Focus

Make sure you have the environment variable `FLASK_APP=server.py`. On one terminal window, enter 

```
python -m flask run
```

then open up another window and run

```
npm run watch
```

then go to the URL printed to access the web app.


## Development Process & Inspiration
This project was created to address a problem we encountered many times before, even while coming up with an idea for TartanHacks. A web-app that could tell us when we are getting too off-topic in our conversations that are meant to be focused would greatly help with productivity.

For this project we decided to use a React frontend to provide a clean and responsive UI, communicating with our Flask backend for API calls and data processing.


## Future Improvements
* Make our algorithms even more complex, considering more factors that can define being "on-topic"
* Bring into consideration how different categories may be interrelated, allowing us to better classify conversations as "off-topic"
* At the end of the conversation, provide analytics and graphs describing the amount of focus held over the course of the conversation
* Expand to add support for different languages and even functionality across instant messaging platforms