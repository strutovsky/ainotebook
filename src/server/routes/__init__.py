from flask import Blueprint

routes = Blueprint("routes", __name__)

from .notebooks import *
from .loginization import *
