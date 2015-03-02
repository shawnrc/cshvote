#! /usr/bin/env python
"""
enums.py - Contains various enums used in this project.
author: shawn chowdhury [shawnrc@csh.rit.edu]
date: 2015-03-01
:credits: None

"I'll think of a good quote later."
--
"""

from hashlib import md5


class VoteSystem(object):
    STV = md5("Single transferable vote")
    FPP = md5("First-past-the-post")
    APV = md5("Approval voting")


class QuestionType(object):
    BALLOT = md5("Balloted vote")
    OPINION = md5("Opinion poll")
    PRIVATE_OP = md5("Private opinion poll")
