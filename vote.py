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
from flask import Flask, g, jsonify, render_template, request

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
    User.create_table(True)
    Question.create_table(True)
    Choice.create_table(True)
    Vote.create_table(True)
    PubVote.create_table(True)
    UserQuestion.create_table(True)
    Category.create_table()
    database.close()

# -----------------------------
# End Utilities
# -----------------------------
# Begin Routes
# -----------------------------

@app.route('/')
def home():
    categories = Category.select()
    return render_template('index.html', categories=categories,
                           exists=categories.exists()), 200

@app.route('/add_cats', methods=['POST'])
def new_category():

    try:
        new_cat = Category.create(name=request.form['categoryName'])
    except IntegrityError:
        return jsonify({
            'status': "Category already exists."
        }), 409

    return jsonify({
        'status': "Category Added."
    }), 201


@app.route('/get_cats', methods=['GET'])
def get_categories():

    return jsonify(dict(Category.select())), 200


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
    )
