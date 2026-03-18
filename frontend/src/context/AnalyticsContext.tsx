import React, { createContext, useContext, useRef, useCallback, useEffect } from 'react'
import { postEngagementEvent, EngagementEventData } from '../api/strapi'

function generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
}

type AutoFields = 'sessionId' | 'timestamp' | 'userAgent' | 'deviceType' | 'screenResolution' | 'viewportSize' | 'language' | 'timezone' | 'referrer'

interface AnalyticsContextType {
    trackEvent: (event: Omit<EngagementEventData, AutoFields>) => void
    /** Returns a timestamp for measuring durations */
    markTime: () => number
    /** Calculate ms elapsed since a markTime() call */
    elapsed: (mark: number) => number
}

const AnalyticsContext = createContext<AnalyticsContextType>({
    trackEvent: () => {},
    markTime: () => Date.now(),
    elapsed: () => 0,
})

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const sessionId = useRef(generateSessionId())

    const trackEvent = useCallback((event: Omit<EngagementEventData, AutoFields>) => {
        postEngagementEvent({
            ...event,
            sessionId: sessionId.current,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            deviceType: getDeviceType(),
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || '',
        })
    }, [])

    const markTime = useCallback(() => Date.now(), [])
    const elapsed = useCallback((mark: number) => Date.now() - mark, [])

    // Track session start
    useEffect(() => {
        trackEvent({ eventType: 'session_start' })

        const handleUnload = () => {
            trackEvent({ eventType: 'session_end' })
        }
        window.addEventListener('beforeunload', handleUnload)
        return () => window.removeEventListener('beforeunload', handleUnload)
    }, [trackEvent])

    return (
        <AnalyticsContext.Provider value={{ trackEvent, markTime, elapsed }}>
            {children}
        </AnalyticsContext.Provider>
    )
}

export const useAnalytics = () => useContext(AnalyticsContext)
