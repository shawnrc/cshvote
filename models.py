#! /usr/bin/env python
"""
models.py - Database models definitions
author: shawn chowdhury [shawnrc@csh.rit.edu]
date: 2015-03-01

"But why male models?"
"Are you serious? I just told you that a moment ago."
"""

from peewee import *

global DB_NAME
DB_NAME = 'cshvote.db'
db = SqliteDatabase(DB_NAME)


class BaseModel(Model):
    """
    The peewee base model that everything else inherits from.
    They suggest that this is best practice because it ensures all subsequent
    classes use the same storage.
    """
    class Meta:
        database = db


class User(BaseModel):
    """
    User: The standard user model.
    All user types will inherit from this (I think)
    """
    uuid = CharField(null=False, unique=True)
    name = CharField()


class Question(BaseModel):
    """
    Question: Superclass for I guess the maybe other types of votes?
    TODO determine how to handle multiple question types.
    """
    uuid = CharField(null=False, unique=True)
    title = CharField(null=False)
    date = DateTimeField('Date')
    description = TextField()
    owner = ForeignKeyField(User)


class Choice(BaseModel):
    """

    """
    uuid = CharField(null=False, unique=True)
    choice_text = CharField(null=False)
    question = ForeignKeyField(Question)
    votes = IntegerField(default=0)


class Vote(BaseModel):
    uuid = CharField(null=False, unique=True)
    question = ForeignKeyField(Question)


class STVote(Vote):
    pass


class PubVote(Vote):
    ForeignKeyField(User)




