from __future__ import print_function
import time
import os, sys
import requests, json
from flask import Flask
from flask_cors import CORS
from flask import request
import config

app = Flask(__name__)
CORS(app)

API_KEY = config.api_key

@app.route('/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/api/search', methods=['GET'])
def get_yelp_data():
	if request.args:
		cat = request.args['cat']
		location = request.args['location']
		# print(api_key,file=sys.stderr)
		headers = {'Authorization':'Bearer %s' % API_KEY}

		url='https://api.yelp.com/v3/businesses/search'

		# In the dictionary, term can take values like food, cafes or businesses like McDonalds
		params = {'term':cat,'location':location, 'sort-by':'best_match'}

		req = requests.get(url, params=params, headers=headers)

		res = json.loads(req.text)
		return res
		
	else:
		print('no request args')
		return {}
	
	

@app.route('/api/parentCategories')
def get_categories():
	f = open('./data/categories.json')
	data = json.load(f)
	res = {'categories':[]}

	for i in range(len(data)):
		res['categories'].append(data[i]['title'])
	f.close()
	return res

@app.route('/api/getdetails', methods=['GET'])
def get_restaurantDetails():
	if request.args:
		business_id = request.args['id']
		headers = {'Authorization':'Bearer %s' % API_KEY}

		url = 'https://api.yelp.com/v3/businesses/' + business_id
		req = requests.get(url, headers=headers)

		res = json.loads(req.text)
		return res

	else:
		print('no request args')
		return {}
