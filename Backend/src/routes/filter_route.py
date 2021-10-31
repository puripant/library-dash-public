import json
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

    data = get_data(basedim)

    data_by_base_dim = {}
    for key, value in groupby(data, itemgetter(x_dim, stack_dim)):
        if key[0] not in data_by_base_dim:
            data_by_base_dim[key[0]] = {}

        if key[1] not in data_by_base_dim[key[0]]:
            data_by_base_dim[key[0]][key[1]] = list(value)
        else:
            data_by_base_dim[key[0]][key[1]].append(list(value)[0])

    res = []
    for key, value in data_by_base_dim.items():
        element = {'x': key, 'y': []}
        for sub_key, sub_value in value.items():
            if not len(filters):
                sub_element = {'x2': sub_key, 'y2': len(sub_value)}
            else:
                if sub_key == filters[0]['value']:
                    sub_element = {'x2': sub_key, 'y2': len(sub_value)}
                else:
                    sub_element = {'x2': sub_key, 'y2': 0}
            element['y'].append(sub_element)
        res.append(element)

    return Response(
        headers={
            "Access-Control-Allow-Origin": "*"
        },
        response=json.dumps(res)
    )


def get_data(basedim):
    path = 'src/static/json/{basedim}.json'.format(basedim=basedim)

    with open(path, 'r') as json_file:
        json_file = json.loads(json_file.read())

    return json_file
