#!/bin/bash

# use of the file: This file will pull a couchdb 3.1.1 docker image, then will run and set up the slave cluster instance
# note to make sure this can run properly you need http, ssh and couchdb1 (I created) security groups

# make sure run this file in the root 
# make sure master node is first argument


# declare the variables
nodes=(45.113.232.197 45.113.233.123 45.113.235.45) # the input_nodes should be an array of all nodes with the first one be master node
export masternode=`echo ${nodes} | cut -f1 -d' '`
export declare othernodes=`echo ${nodes[@]} | sed s/${masternode}//` # set rest node as slave
export declare mynode=${masternode}  
export size="$#" # subsitute total_size with the total number of couchdb instances in couchdb cluster
export user='admin' # set the admin user 
export pass='admin' # set admin password
export VERSION='3.1.1' # select couchdb image version
export cookie='a192aeb9904e6590849337933b000c99' # set cookie

echo ${othernodes[@]}

# pull the docker image
docker pull ibmcom/couchdb3:${VERSION}


# create the container 
docker create -p 5984:5984/tcp -p 4369:4369/tcp -p 9100:9100/tcp --name couchdb${mynode} --env COUCHDB_USER=${user}\
      --env COUCHDB_PASSWORD=${pass}\
      --env COUCHDB_SECRET=${cookie}\
      --env ERL_FLAGS="-setcookie \"${cookie}\" -name \"couchdb@${mynode}\""\
      ibmcom/couchdb3:${VERSION}


# start the container
docker start couchdb${mynode}
sleep 15s

echo 'first part OK'
# Those commands only need to run on master couchdb host
# those are for setup the cluster
for node in ${othernodes} 
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup" \
      --header "Content-Type: application/json"\
      --data "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\",\
             \"username\": \"${user}\", \"password\":\"${pass}\", \"port\": \"5984\",\
             \"remote_node\": \"${node}\", \"node_count\": \"$(echo ${nodes[@]} | wc -w)\",\
             \"remote_current_user\":\"${user}\", \"remote_current_password\":\"${pass}\"}"
done

echo 'second part OK'
sleep 10s
for node in ${othernodes}
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
      --header "Content-Type: application/json"\
      --data "{\"action\": \"add_node\", \"host\":\"${node}\",\
             \"port\": \"5984\", \"username\": \"${user}\", \"password\":\"${pass}\"}"
done


# Finishing set up the cluster
curl -XGET "http://${user}:${pass}@${masternode}:5984/"
curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
    --header "Content-Type: application/json" --data "{\"action\": \"finish_cluster\"}"
