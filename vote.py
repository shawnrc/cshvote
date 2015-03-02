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
from flask import Flask


app = Flask(__name__)
app.config.from_object(__name__)
admin = flask_admin.Admin(app)

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
