# test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_upload_photo():
    # Path to a sample image file for testing
    file_path = "Tests/test_receipt.jpeg"

    with open(file_path, "rb") as file:
        # Send POST request to the endpoint
        response = client.post(
            "/upload-photo",
            files={"file": ("test_recipt.jpg", file, "image/jpeg")}
        )

    print(response.json())
    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response is an empty JSON object as expected
    assert response.json() == {}