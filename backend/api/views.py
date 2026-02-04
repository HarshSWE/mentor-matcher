import json
from pathlib import Path

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Pitch
from ml.classifier import predict_category


BASE_DIR = Path(__file__).resolve().parent.parent


class PitchCreateView(APIView):
    def post(self, request):
        print("PITCH:", request.data["startup_pitch"])

        category, confidence = predict_category(request.data["startup_pitch"])

        pitch = Pitch.objects.create(
            founder_name=request.data["founder_name"],
            startup_pitch=request.data["startup_pitch"],
            predicted_category=category,
            confidence=confidence,
        )

        return Response({
            "id": pitch.id,
            "founder_name": pitch.founder_name,
            "predicted_category": pitch.predicted_category,
            "confidence": pitch.confidence,
        })


class MentorRecommendationView(APIView):
    def get(self, request, pk):
        pitch = get_object_or_404(Pitch, pk=pk)

        mentors_path = BASE_DIR / "ml" / "data" / "mentors.json"
        with open(mentors_path, "r", encoding="utf-8") as f:
            mentors = json.load(f)

        filtered = [
            m for m in mentors
            if m.get("specialty") == pitch.predicted_category
        ]

        return Response(filtered[:3])

