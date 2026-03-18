package kinds

// This is the v1alpha1 version of the kind, which joins the kind metadata and
// version-specific information for the kind, such as the schema
engagementEventv1alpha1: engagementEventKind & {
    // schema is the schema for this version of the kind
    // As an API server-expressable resource, the schema has a restricted format:
    // {
    //     spec: { ... }
    //     status: { ... } // optional
    //     metadata: { ... } // optional
    // }
    // `spec` must always be present, and is the schema for the object.
    // `status` is optional, and should contain status or state information which is typically not user-editable
    // (controlled by controllers/operators). The kind system adds some implicit status information which is
    // common across all kinds, and becomes present in the unified lineage used for code generation and other tooling.
    // `metadata` is optional, and should contain kind- or schema-specific metadata. The kind system adds
    // an explicit set of common metadata which can be found in the definition file for a CUE kind at
    // [https://github.com/grafana/grafana-app-sdk/blob/main/codegen/cuekind/def.cue]
    // additional metadata fields cannot conflict with the common metadata field names
    schema: {
        spec: {
            // Type of engagement event
            // "card_impression" | "swipe" | "detail_open" | "detail_close" | "undo" | "session_start" | "session_end"
            eventType: string
            // ID of the card involved (empty for session events)
            cardId: string | *""
            // Swipe direction: "left" | "right" (only for swipe events)
            swipeDirection: string | *""
            // How long the card was visible before action (milliseconds)
            dwellTimeMs: int | *0
            // How long the user spent reading card details (milliseconds)
            readTimeMs: int | *0
            // How far the user scrolled in details (0.0 to 1.0)
            scrollDepth: float | *0.0
            // Session ID to group events
            sessionId: string
            // ISO 8601 timestamp of the event
            timestamp: string
            // User agent string
            userAgent: string | *""
            // Device type: "mobile" | "tablet" | "desktop"
            deviceType: string | *""
            // IP address of the client (captured server-side)
            ipAddress: string | *""
            // Screen resolution e.g. "1920x1080"
            screenResolution: string | *""
            // Browser viewport size e.g. "1440x900"
            viewportSize: string | *""
            // Browser language e.g. "en-US"
            language: string | *""
            // IANA timezone e.g. "America/New_York"
            timezone: string | *""
            // HTTP referrer
            referrer: string | *""
        }
        status: {
            // Whether the event has been processed for aggregation
            processed: bool | *false
        }
    }
}