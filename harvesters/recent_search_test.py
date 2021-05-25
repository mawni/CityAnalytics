"""
CCC2021-Team55  

Team Member   | Student ID  
--------------------------
Yingrui Zhang |     825593  
Jinyu Yang    |     980619  
Cheng Wang    |     825299  
Jin Kai Teh   |     938613  
Mustafa Awni  |     763078  

References: 
https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-all

"""

import requests
import json
from datetime import datetime, timezone
import getpass

# Load credentials
#load_dotenv(find_dotenv())

# Query header
bearer_token = getpass.getpass("Please enter your bearer token: ") #os.environ.get("BEARER_TOKEN")
get_headers = {"Authorization": f"Bearer {bearer_token}"}

# Base URL
#base_url = "https://api.twitter.com/2/tweets/search/all"
base_url = "https://api.twitter.com/2/tweets/search/recent"

# Query parameters
query = "melbourne" #has:geo # Search Query
start_time = datetime(2021, 5, 15, 0, 0, tzinfo=timezone.utc) # YYYY-MM-DDTHH:MM
end_time =  datetime(2021, 5, 16, 0, 0, tzinfo=timezone.utc)
tweet_fields = "geo" # Include coordinates in response data
max_results = 50 # 1-100

query_params = {
    'query': query,
    'start_time': start_time.isoformat().split("+")[0] + "Z", # Formatting
    #'end_time': end_time.isoformat().split("+")[0] + "Z",
    'tweet.fields': tweet_fields, #Not sure if this is the one causing the trouble
    'max_results': max_results
}


"""
Testing using 7-day search
#TODO: Rate limiting
#TODO: Catching errors
"""
results = []
next_token = ''
test_counter = 0

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
    
    # Append tweet if only have geo coordinate, not needed if using academic because API will capture via search query
    for tweet_dict in content['data']:
        if "geo" in tweet_dict.keys():
            results.append(tweet_dict)

    # Testing: break if we have 5 tweets containing coordinates
    if len(results) == 5:
        break

print(results)