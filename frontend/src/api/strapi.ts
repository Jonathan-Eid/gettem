import axios from 'axios';

export const STRAPI_URL = process.env.REACT_APP_STRAPI_URL

const AUTH_TOKEN = process.env.REACT_APP_STRAPI_AUTH_TOKEN

axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}` 


export async function getCards() {

    try{
        const response = await axios.get(`${STRAPI_URL}/api/cards?populate=images`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function getCardsFromCategory(category: string) {

    try{
        const response = await axios.get(`${STRAPI_URL}/api/cards?populate=images&filters[category][$eq]=${category}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}


export async function getCardCategories() {
    try{
        const response = await axios.get(`${STRAPI_URL}/api/content-type-builder/content-types/api::card.card`)
        return response.data.data.schema.attributes.category.enum
    } catch (error) {
        console.log(error)
    }
}


export async function getResume() {

    try{
        const response = await axios.get(`${STRAPI_URL}/api/resume?populate=document`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function getGithub() {

    try{
        const response = await axios.get(`${STRAPI_URL}/api/github`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

