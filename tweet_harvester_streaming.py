"""
References: 
https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/quick-start
https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/integrate/build-a-rule

curl commands to check stream established:
curl https://api.twitter.com/2/tweets/search/stream -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAANalPQEAAAAATs%2B47CKMBBL6vay%2BgbPNgUxs6A8%3D8XTceKLv6a84FQG6f1ITMjuio2yteQ9ooxyo9KKhOQHXl6solx"
curl -v https://api.twitter.com/2/tweets/search/stream/rules -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAANalPQEAAAAATs%2B47CKMBBL6vay%2BgbPNgUxs6A8%3D8XTceKLv6a84FQG6f1ITMjuio2yteQ9ooxyo9KKhOQHXl6solx"
curl -X POST 'https://api.twitter.com/2/tweets/search/stream/rules' -H "Content-type: application/json" -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAANalPQEAAAAATs%2B47CKMBBL6vay%2BgbPNgUxs6A8%3D8XTceKLv6a84FQG6f1ITMjuio2yteQ9ooxyo9KKhOQHXl6solx" 
-d '{"delete": {"ids": ["1391668964502036484","1391668964502036483"]}}'
"""

import requests
import json
import time

# Base URL and Credentials
base_url = "https://api.twitter.com/2/tweets/search/stream"
bearer_token = 'AAAAAAAAAAAAAAAAAAAAANalPQEAAAAATs%2B47CKMBBL6vay%2BgbPNgUxs6A8%3D8XTceKLv6a84FQG6f1ITMjuio2yteQ9ooxyo9KKhOQHXl6solx'

# Create stream and add rules. TODO: replace with place:melbourne once researcher application approved
covid_keywords_rule = {
    'value': '(covid OR coronavirus OR covid19) melbourne', 
    'tag':'covid keywords and melbourne'
}
rules = {'add':[covid_keywords_rule]}
rule_api = '/rules'
post_headers = {
    "Content-type":"application/json", 
    "Authorization": f"Bearer {bearer_token}"
}
response = requests.post(base_url+rule_api, headers=post_headers, data=json.dumps(rules))
print(response.text)

# Wait a bit
time.sleep(3)

# Send a GET request to Tweet stream
get_headers = {"Authorization": f"Bearer {bearer_token}"}
get_request_params = "?tweet.fields=geo"
response = requests.get(base_url+get_request_params, headers=get_headers, stream=True)

# Iterate through streamed tweets
for line in response.iter_lines():
    if line:
        tweet_json = json.loads(line)
        print(json.dumps(tweet_json, indent=4))


