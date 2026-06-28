from django.conf import settings
import requests

def analyze_image(image_path):
    url = "https://serverless.roboflow.com/urbania/1"

    with open(image_path, "rb") as f:
        response = requests.post(
            url,
            params={"api_key": settings.ROBOFLOW_API_KEY},
            files={"file": f},
        )

    return response.json()