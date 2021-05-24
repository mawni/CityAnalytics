. ./unimelb-comp90024-2021-grp-55-openrc.sh; ansible-playbook --ask-become-pass mrc.yaml

ansible-playbook -i ./inventory/inventory.ini -u ubuntu --key-file=./test_key.pem instance_couchdb.yaml

ansible-playbook -i ./inventory/inventory.ini -u ubuntu --key-file=./test_key.pem instance_twitter_harvester.yaml