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
import json
import peewee
from flask import Flask, g, jsonify, render_template, request
from jinja2 import utils

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
# Begin API
# -----------------------------

@app.route('/api/categories', methods=['GET'])
def get_categories():

    parcel = Category.select()

    response = []

    for row in parcel:
        response.append({
            'catName': row.name,
            'prettyName': row.pretty_name
        })

    return json.dumps(response), 200


# -----------------------------
# DEBUG
@app.route('/api/add_cat', methods=['POST'])
def new_category():
    parcel = request.get_json()
    pretty_name = str(utils.escape(parcel['catName']))
    name = '-'.join(pretty_name.lower().split())

    try:
        Category.create(
            name=name,
            pretty_name=pretty_name
        )
    except IntegrityError:
        return jsonify({
            'status': "Category already exists."
        }), 409

    return jsonify({
        'status': "Category Added."
    }), 201

@app.route('/del_cat', methods=['DELETE'])
def delete_categories():

    category = Category.get(Category.name == request.form['catName'])
    dels = category.delete_instance()

    if not dels:
        return jsonify({
            'status': "Category not found."
        }), 304

    return jsonify({
        'status': "Resource successfully deleted."
    }), 200

# -----------------------------
# End API
# -----------------------------

@app.route('/')
def home():
    return render_template(
        'index.html'
    ), 200

@app.route('/admin')
@app.route('/admin/')
def admin():
    return render_template(
        'admin.html'
    ), 200

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
    )
