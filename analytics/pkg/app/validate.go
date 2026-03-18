package app

import (
	"context"
	"errors"
	"fmt"
	"time"

	sdkapp "github.com/grafana/grafana-app-sdk/app"
	"github.com/grafana/grafana-app-sdk/resource"
	v1alpha1 "github.com/wetcat/gettem/analytics/pkg/generated/engagementevent/v1alpha1"
)

// validateEngagementEvent checks an EngagementEvent for structural correctness.
// This is called from AnalyticsApp.Validate() for admission control.
func validateEngagementEvent(_ context.Context, req *sdkapp.AdmissionRequest) error {
	if resource.AdmissionRequest(*req).Action == resource.AdmissionActionDelete {
		return nil
	}

	obj := resource.AdmissionRequest(*req).Object
	event, ok := obj.(*v1alpha1.EngagementEvent)
	if !ok {
		return fmt.Errorf("expected *EngagementEvent, got %T", obj)
	}
	spec := event.Spec

	validTypes := map[string]bool{
		"card_impression": true, "swipe": true,
		"detail_open": true, "detail_close": true,
		"undo": true, "session_start": true, "session_end": true,
		"page_view": true, "link_click": true,
	}
	if !validTypes[spec.EventType] {
		return fmt.Errorf("invalid eventType %q", spec.EventType)
	}

	if spec.SessionId == "" {
		return errors.New("sessionId is required")
	}

	if _, err := time.Parse(time.RFC3339, spec.Timestamp); err != nil {
		if _, err2 := time.Parse(time.RFC3339Nano, spec.Timestamp); err2 != nil {
			return fmt.Errorf("timestamp must be valid ISO 8601: %w", err)
		}
	}

	if spec.ScrollDepth < 0 || spec.ScrollDepth > 1 {
		return fmt.Errorf("scrollDepth must be between 0.0 and 1.0, got %f", spec.ScrollDepth)
	}

	if spec.EventType == "swipe" && spec.SwipeDirection != "left" && spec.SwipeDirection != "right" {
		return fmt.Errorf("swipe events require direction 'left' or 'right', got %q", spec.SwipeDirection)
	}

	if spec.DwellTimeMs < 0 {
		return errors.New("dwellTimeMs must be non-negative")
	}
	if spec.ReadTimeMs < 0 {
		return errors.New("readTimeMs must be non-negative")
	}

	return nil
}
