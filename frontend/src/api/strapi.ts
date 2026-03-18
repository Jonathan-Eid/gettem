import axios from 'axios';

export const STRAPI_URL = process.env.REACT_APP_STRAPI_URL

const AUTH_TOKEN = process.env.REACT_APP_STRAPI_AUTH_TOKEN

const strapi = axios.create({
    baseURL: STRAPI_URL
})

strapi.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}` 


export async function getCards() {

    try{
        const response = await strapi.get(`/api/cards?populate=images&sort=order:desc`) 
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function getCardsFromCategory(category: string) {

    try{
        const response = await strapi.get(`/api/cards?populate=images&filters[category][$eq]=${category}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}


export async function getCardCategories() {
    try{
        const response = await strapi.get(`/api/content-type-builder/content-types/api::card.card`)
        return response.data.data.schema.attributes.category.enum
    } catch (error) {
        console.log(error)
    }
}


export async function getResume() {

    try{
        const response = await strapi.get(`/api/resume?populate=document`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function getGithub() {

    try{
        const response = await strapi.get(`/api/github`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export interface EngagementEventData {
    eventType: 'card_impression' | 'swipe' | 'detail_open' | 'detail_close' | 'undo' | 'session_start' | 'session_end' | 'page_view' | 'link_click'
    cardId?: string
    swipeDirection?: 'left' | 'right'
    dwellTimeMs?: number
    readTimeMs?: number
    scrollDepth?: number
    sessionId: string
    timestamp: string
    userAgent?: string
    deviceType?: 'mobile' | 'tablet' | 'desktop'
    screenResolution?: string
    viewportSize?: string
    language?: string
    timezone?: string
    referrer?: string
}

const ANALYTICS_URL = process.env.REACT_APP_ANALYTICS_URL

export async function postEngagementEvent(event: EngagementEventData) {
    try {
        await fetch(`${ANALYTICS_URL}/ingest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
        })
    } catch (error) {
        console.log('Analytics event failed:', error)
    }
}

