"""
References: 
https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-all

"""

import requests
import json
from datetime import datetime, timezone
import getpass

# Query header
bearer_token = getpass.getpass("Please enter your bearer token: ")#os.environ.get("BEARER_TOKEN")
get_headers = {"Authorization": f"Bearer {bearer_token}"}

# Base URL
base_url = "https://api.twitter.com/2/tweets/search/all"

# Query parameters
query = "has:geo place_country:AU lang:en" # Search Query
start_time = datetime(2016, 1, 1, 0, 0, tzinfo=timezone.utc) # YYYY-MM-DDTHH:MM
end_time =  datetime(2016, 12, 31, 0, 0, tzinfo=timezone.utc)
tweet_fields = "geo,created_at" # Include coordinates and tweet time in data
max_results = 10 # 1-100

query_params = {
    'query': query,
    'start_time': start_time.isoformat().split("+")[0] + "Z", # Formatting
    'end_time': end_time.isoformat().split("+")[0] + "Z",
    'tweet.fields': tweet_fields, #Not sure if this is the one causing the trouble
    'max_results': max_results
}

results = []
next_token = ''

while next_token != '' or len(results) == 0:
    response = requests.get(base_url, params=query_params, headers=get_headers)
    content = json.loads(response.content)

    # Something went wrong, exit program
    if response.status_code != 200:
        print(content)
        break

    # For pagination
    if 'next_token' in content['meta'].keys():
        next_token = content['meta']['next_token']
        query_params['next_token'] = next_token
    
    # Insert to list
    for tweet_data in content['data']:
        # Careful: Retweets somehow is included, they dont contain geo info
        results.append(tweet_data)

    # Break after 20 tweets = 2 requests
    if len(results) == 20:
        break

print(results)