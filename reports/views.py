from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Report
from .serializers import ReportSerializer


@api_view(["GET", "POST"])
def reports_list(request):

    if request.method == "GET":
        reports = Report.objects.all().order_by("-id")
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = ReportSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


@api_view(["DELETE"])
def delete_report(request, pk):

    try:
        report = Report.objects.get(id=pk)

    except Report.DoesNotExist:
        return Response(
            {"error": "Reporte no encontrado"},
            status=status.HTTP_404_NOT_FOUND,
        )

    report.delete()

    return Response(
        {"message": "Reporte eliminado"},
        status=status.HTTP_200_OK,
    )