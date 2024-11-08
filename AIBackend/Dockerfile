# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the environment.yml file into the container at /app
COPY environment.yml /app/environment.yml

# Install conda and the dependencies from environment.yml
RUN apt-get update && apt-get install -y \
    wget \
    && wget -O ~/miniconda.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && bash ~/miniconda.sh -b -p ~/miniconda \
    && ~/miniconda/bin/conda init \
    && ~/miniconda/bin/conda env create -f /app/environment.yml \
    && ~/miniconda/bin/conda clean -a -y

# Make RUN commands use the new environment:
SHELL ["~/miniconda/bin/conda", "run", "-n", "scan-split", "/bin/bash", "-c"]

# Copy the current directory contents into the container at /app
COPY . /app

# Install any remaining dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["conda", "run", "--no-capture-output", "-n", "scan-split", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]