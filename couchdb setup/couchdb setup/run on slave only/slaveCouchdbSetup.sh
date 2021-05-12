#!/bin/bash

# use of the file: This file will pull a couchdb 3.1.1 docker image, then will run and set up the slave cluster instance
# note to make sure this can run properly you need http, ssh and couchdb1 (I created) security groups


# Note this file assume you are in root when you run it

# declare the variables
# make sure pass the arguments in following order
# $1 = mynode: ip address of vm instance that current couchdb node located
# declare the variables
nodes="$@" # the input_nodes should be an array of all nodes with the first one be master node
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

