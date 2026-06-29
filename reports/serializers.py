from rest_framework import serializers
from .models import Report
from .roboflow_service import analyze_image


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

    def create(self, validated_data):
        report = Report.objects.create(**validated_data)

        try:
            image_path = None

            # 🔥 FIX RENDER: manejo seguro de ImageField
            if report.image:
                try:
                    image_path = report.image.path
                except Exception:
                    image_path = report.image.name  # fallback seguro

            # Si no hay imagen, no rompe
            if not image_path:
                report.category = "sin imagen"
                report.confidence = 0
                report.save()
                return report

            result = analyze_image(image_path)

            print("Roboflow result completo:", result)

            predictions = result.get("predictions", [])

            print("Predictions:", predictions)

            if predictions:
                best_prediction = predictions[0]
                report.category = best_prediction.get("class", "")
                report.confidence = round(
                    best_prediction.get("confidence", 0) * 100, 2
                )
            else:
                report.category = "sin detección"
                report.confidence = 0

            report.save()

        except Exception as e:
            print("Error Roboflow:", e)
            report.category = "error"
            report.confidence = 0
            report.save()

        return report




