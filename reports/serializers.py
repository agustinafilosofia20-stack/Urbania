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
            result = analyze_image(report.image.path)

            # Debug: ver qué devuelve Roboflow
            print("Roboflow result completo:", result)

            predictions = result.get("predictions", [])

            # Debug: ver predictions
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




