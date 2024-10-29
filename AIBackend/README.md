# How to create the python environment

1. Have conda installed
2. `conda env create -f environment.yml`
3. `conda activate scan-split`

# How to run the code
`fastapi dev main.py`

# How to test the endpoint
## Manually

1. Open a browser and go to `http://localhost:8000/docs`
2. Upload the recipt image
3. Click on the `Try it out` button

## Curl
`curl -X 'POST' \
  'http://localhost:8000/scan-split' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/your/image.jpg'`