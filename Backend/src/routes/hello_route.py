from flask import Blueprint

hello_blueprint = Blueprint('hello_blueprint', __name__)


@hello_blueprint.route('/hello')
def hello_route():
    return 'Hello, World!'
