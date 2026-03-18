// Code generated - EDITING IS FUTILE. DO NOT EDIT.

package v1alpha1

// +k8s:openapi-gen=true
type Spec struct {
	// Type of engagement event
	// "card_impression" | "swipe" | "detail_open" | "detail_close" | "undo" | "session_start" | "session_end"
	EventType string `json:"eventType"`
	// ID of the card involved (empty for session events)
	CardId string `json:"cardId"`
	// Swipe direction: "left" | "right" (only for swipe events)
	SwipeDirection string `json:"swipeDirection"`
	// How long the card was visible before action (milliseconds)
	DwellTimeMs int64 `json:"dwellTimeMs"`
	// How long the user spent reading card details (milliseconds)
	ReadTimeMs int64 `json:"readTimeMs"`
	// How far the user scrolled in details (0.0 to 1.0)
	ScrollDepth float64 `json:"scrollDepth"`
	// Session ID to group events
	SessionId string `json:"sessionId"`
	// ISO 8601 timestamp of the event
	Timestamp string `json:"timestamp"`
	// User agent string
	UserAgent string `json:"userAgent"`
	// Device type: "mobile" | "tablet" | "desktop"
	DeviceType string `json:"deviceType"`
	// IP address of the client (captured server-side)
	IpAddress string `json:"ipAddress"`
	// Screen resolution e.g. "1920x1080"
	ScreenResolution string `json:"screenResolution"`
	// Browser viewport size e.g. "1440x900"
	ViewportSize string `json:"viewportSize"`
	// Browser language e.g. "en-US"
	Language string `json:"language"`
	// IANA timezone e.g. "America/New_York"
	Timezone string `json:"timezone"`
	// HTTP referrer
	Referrer string `json:"referrer"`
}

// NewSpec creates a new Spec object.
func NewSpec() *Spec {
	return &Spec{
		CardId:           "",
		SwipeDirection:   "",
		DwellTimeMs:      0,
		ReadTimeMs:       0,
		ScrollDepth:      0,
		UserAgent:        "",
		DeviceType:       "",
		IpAddress:        "",
		ScreenResolution: "",
		ViewportSize:     "",
		Language:         "",
		Timezone:         "",
		Referrer:         "",
	}
}

// OpenAPIModelName returns the OpenAPI model name for Spec.
func (Spec) OpenAPIModelName() string {
	return "com.github.wetcat.gettem.analytics.pkg.generated.engagementevent.v1alpha1.Spec"
}
