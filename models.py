#! /usr/bin/env python
"""
models.py - Database model definitions
author: shawn chowdhury [shawnrc@csh.rit.edu]
date: 2015-03-01
:credits: None

"But why male models?"
"Are you serious? I just told you that a moment ago."
"""

from peewee import *
from vote import database as db


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
    name = CharField()


class Question(BaseModel):
    """
    Question: Superclass for I guess the maybe other types of votes?
    TODO determine how to handle multiple question types.
    """
    title = CharField(null=False)
    date = DateTimeField('date')
    description = TextField()
    owner = ForeignKeyField(User)
    type = CharField(null=False)
    active = BooleanField(null=False)

    class Meta:
        order_by = ('-date',)


class Choice(BaseModel):
    """
    Choice: Class for choices that map to questions.
    """
    choice_text = CharField(null=False)
    question = ForeignKeyField(Question)
    votes = IntegerField(default=0)


class Vote(BaseModel):
    choice = ForeignKeyField(Choice)


class PubVote(Vote):
    ForeignKeyField(User)


class UserQuestion(BaseModel):
    """
    UserQuestion: Many-to-many table to assist in the task of determining
                  who has voted on what.
    """

    user = ForeignKeyField(User)
    question = ForeignKeyField(Question)
