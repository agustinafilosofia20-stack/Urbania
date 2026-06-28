from django.conf import settings

def analyze_image(image_path):
    try:
        # IMPORT SOLO CUANDO SE USA (evita crash al importar Django)
        from inference_sdk import InferenceHTTPClient

        api_key = getattr(settings, "ROBOFLOW_API_KEY", None)

        if not api_key:
            return {"error": "Missing ROBOFLOW_API_KEY"}

        if not image_path:
            return {"error": "No image provided"}

        client = InferenceHTTPClient(
            api_url="https://serverless.roboflow.com",
            api_key=api_key,
        )

        return client.infer(
            image_path,
            model_id="urbania/1"
        )

    except Exception as e:
        return {
            "error": "Roboflow crashed safely",
            "details": str(e)
        }