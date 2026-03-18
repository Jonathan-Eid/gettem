// Code generated - EDITING IS FUTILE. DO NOT EDIT.

export interface Spec {
	// Type of engagement event
	// "card_impression" | "swipe" | "detail_open" | "detail_close" | "undo" | "session_start" | "session_end"
	eventType: string;
	// ID of the card involved (empty for session events)
	cardId: string;
	// Swipe direction: "left" | "right" (only for swipe events)
	swipeDirection: string;
	// How long the card was visible before action (milliseconds)
	dwellTimeMs: number;
	// How long the user spent reading card details (milliseconds)
	readTimeMs: number;
	// How far the user scrolled in details (0.0 to 1.0)
	scrollDepth: number;
	// Session ID to group events
	sessionId: string;
	// ISO 8601 timestamp of the event
	timestamp: string;
	// User agent string
	userAgent: string;
	// Device type: "mobile" | "tablet" | "desktop"
	deviceType: string;
	// IP address of the client (captured server-side)
	ipAddress: string;
	// Screen resolution e.g. "1920x1080"
	screenResolution: string;
	// Browser viewport size e.g. "1440x900"
	viewportSize: string;
	// Browser language e.g. "en-US"
	language: string;
	// IANA timezone e.g. "America/New_York"
	timezone: string;
	// HTTP referrer
	referrer: string;
}

export const defaultSpec = (): Spec => ({
	eventType: "",
	cardId: "",
	swipeDirection: "",
	dwellTimeMs: 0,
	readTimeMs: 0,
	scrollDepth: 0,
	sessionId: "",
	timestamp: "",
	userAgent: "",
	deviceType: "",
	ipAddress: "",
	screenResolution: "",
	viewportSize: "",
	language: "",
	timezone: "",
	referrer: "",
});

