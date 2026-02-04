from django.urls import path
from .views import PitchCreateView, MentorRecommendationView

urlpatterns = [
    path("pitches/", PitchCreateView.as_view()),
    path("pitches/<int:pk>/recommendations/", MentorRecommendationView.as_view()),
]
