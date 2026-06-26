from inference_sdk import InferenceHTTPClient
from django.conf import settings

CLIENT = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key=settings.ROBOFLOW_API_KEY,
)

def analyze_image(image_path):
    result = CLIENT.infer(
        image_path,
        model_id="urbania/1"
    )

    return result