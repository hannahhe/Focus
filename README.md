# Focus
Focus is a web-app designed to keep you on topic in your conversations - with the click of a button, our machine learning algorithms will monitor your conversation and gently notify you with a simple beep when your discussion gets sidetracked.

Our project uses the Google Cloud Speech-to-Text API and the Cloud Natural Language API to analyze your verbal conversation and run it through some sentiment analysis and category classification algorithms. We receive user input on what topic you want to discuss from over 600 categories, then periodically check whether or not your discussion is staying on topic. If we think that you may be straying from the original topic you wished to discuss, our app will beep and remind you to stay focused.

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