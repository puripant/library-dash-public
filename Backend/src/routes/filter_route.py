import json
import os
from flask import Blueprint, request
from flask.wrappers import Response
from itertools import groupby
from operator import itemgetter


filter_blueprint = Blueprint('filter_blueprint', __name__)


@filter_blueprint.route('/v1/filter', methods=['POST'])
def filter_route():
    body = json.loads(request.get_data())
    basedim = body['basedim']
    x_dim = body['xDim']
    stack_dim = body['stackDim']
    filters = body['filter']

    data = database[basedim]

    data_by_base_dim = {}
    for key, value in groupby(data, itemgetter(x_dim, stack_dim)):
        if key[0] not in data_by_base_dim:
            data_by_base_dim[key[0]] = {}

        if key[1] not in data_by_base_dim[key[0]]:
            data_by_base_dim[key[0]][key[1]] = list(value)
        else:
            data_by_base_dim[key[0]][key[1]].extend(list(value))

    res = []
    for key, value in data_by_base_dim.items():
        element = {'x': key, 'y': []}
        all_y = []
        for sub_key, sub_value in value.items():
            if not len(filters):
                sub_element = {'x2': sub_key, 'y2': len(sub_value)}
            else:
                sub_element = {'x2': sub_key,
                               'y2': filter_and_count(sub_value, filters)}
            all_y.append(sub_element)

        if stack_dim == 'title':
            all_y.sort(key=lambda y: y['y2'], reverse=True)
            top10 = all_y[:10]
            top10.append({'x2': 'others', 'y2': sum(
                map(lambda x: x['y2'], all_y[10:]))})
            element['y'] = top10
        else:
            element['y'] = all_y
        res.append(element)

    res = sorted(res, key=lambda k: sum(
        item['y2'] for item in k['y']), reverse=True)

    return Response(
        headers={
            "Access-Control-Allow-Origin": "*"
        },
        response=json.dumps(res)
    )


@filter_blueprint.before_app_first_request
def load_data():
    global database
    database = {}

    for path, directories, files in os.walk('src/static/json'):
        for file in files:
            if '.json' in file:
                basedim = file[:-5]
                database[basedim] = get_data(os.path.join(path, file))


def get_data(path):
    with open(path, 'r') as json_file:
        json_file = json.loads(json_file.read())

    return json_file


def filter_and_count(values, filters):
    for element in filters:
        arr = list(
            filter(
                lambda value: value[element['dim']] == element['value'],
                values
            )
        )
    return len(arr)
