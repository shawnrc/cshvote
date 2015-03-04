#! /usr/bin/env python
"""
vote.py - Main application logic for CSH Vote

:author: Shawn Chowdhury [shawnrc@csh.rit.edu]
:date: 2015-03-01
:credits: None

This app requires python2.7. Sorry :(


"The best argument against democracy is a five-minute conversation with
the average voter."
-- Winston S. Churchill
"""
# get your imports!

# external libs
import flask_admin
import peewee
from flask import Flask, g, render_template

DB_NAME = 'cshvote'
database = peewee.PostgresqlDatabase(DB_NAME, user='postgres', password='h3rpd3rp')

# local
from models import *


# flask setup
app = Flask(__name__)
app.config.from_object(__name__)


# db connection decorators
@app.before_request
def before_request():
    database.connect()


@app.after_request
def after_request(response):
    database.close()
    return response


# db intialization
def create_tables():
    database.connect()
    User.create_table()
    Question.create_table()
    Choice.create_table()
    Vote.create_table()
    PubVote.create_table()
    UserQuestion.create_table()
    database.close()

# -----------------------------
# End Utilities
# -----------------------------
# Begin Routes
# -----------------------------

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=80,
        debug=True,
    )
