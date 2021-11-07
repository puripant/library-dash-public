import os

from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS
from .routes.filter_route import filter_blueprint


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, static_url_path="/",
                static_folder="/dist", instance_relative_config=True)

    CORS(app)

    @app.route('/js/<path:path>')
    def send_js(path):
        return send_from_directory('dist', path)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(filter_blueprint)

    return app
