from flask import Blueprint, request, jsonify
from itertools import groupby
from operator import itemgetter

filter_blueprint = Blueprint('filter_blueprint', __name__)


@filter_blueprint.route('/v1/filter', methods=['POST'])
def filter_route():
    body = request.json
    data = body['data']
    x_dim = body['xDim']
    stack_dim = body['stackDim']
    filter = body['filter']

    data_by_base_dim = {}
    for key, value in groupby(data, itemgetter(x_dim, stack_dim)):
        if key[0] not in data_by_base_dim:
            data_by_base_dim[key[0]] = {}

        if key[1] not in data_by_base_dim[key[0]]:
            data_by_base_dim[key[0]][key[1]] = list(value)
        else:
            data_by_base_dim[key[0]][key[1]].append(list(value)[0])

    res = [{'x': key, 'y':
            [{'x2': sub_key, 'y2': len(sub_value)} for sub_key, sub_value in value.items()]}
           for key, value in data_by_base_dim.items()]

    return jsonify(res)
