import axios from 'axios';

export const STRAPI_URL = process.env.STRAPI_URL

const AUTH_TOKEN = process.env.STRAPI_AUTH_TOKEN

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

export async function getCardsFromCategory(category) {

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

