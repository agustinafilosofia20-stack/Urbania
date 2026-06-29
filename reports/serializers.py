from rest_framework import serializers
from .models import Report
from .roboflow_service import analyze_image


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"

    def create(self, validated_data):
        report = Report.objects.create(**validated_data)

        try:
            image_path = None

            # 🔥 SAFE IMAGE ACCESS (LOCAL + RENDER)
            if report.image:
                try:
                    image_path = report.image.path
                except Exception:
                    try:
                        image_path = report.image.url
                    except Exception:
                        image_path = None

            # ❌ sin imagen → no rompe
            if not image_path:
                report.category = "sin imagen"
                report.confidence = 0
                report.save()
                return report

            # 🤖 ROBOFLOW SAFE CALL
            try:
                result = analyze_image(image_path)
            except Exception as e:
                print("Roboflow error:", e)
                result = {}

            print("Roboflow result:", result)

            predictions = result.get("predictions", [])

            if predictions:
                best = predictions[0]
                report.category = best.get("class", "desconocido")
                report.confidence = round(
                    best.get("confidence", 0) * 100, 2
                )
            else:
                report.category = "sin detección"
                report.confidence = 0

            report.save()

        except Exception as e:
            # 🔥 NUNCA rompe API
            print("Serializer crash safe:", e)
            report.category = "error"
            report.confidence = 0
            report.save()

        return report




