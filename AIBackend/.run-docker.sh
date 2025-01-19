#!/bin/bash

# Define the container name
CONTAINER_NAME=recipt-ai-reader

# Build the Docker image
docker build -t $CONTAINER_NAME .

# Run the Docker container
docker run --name $CONTAINER_NAME -d -p 80:80 $CONTAINER_NAME

# Function to clean up the container on exit
cleanup() {
    echo "Stopping and removing container..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
}

# Trap the EXIT signal to ensure cleanup is called
trap cleanup EXIT

# Wait for the container to stop (this will keep the script running)
docker wait $CONTAINER_NAME