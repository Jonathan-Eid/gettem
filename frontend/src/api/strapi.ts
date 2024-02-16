import axios from 'axios';

const access_token = "9e53a9de0b413e1f8e52d8f19a8dba33d8c694c95a7b9d8c7f067f1d000a7b705af8422b580b10e79bb99c4bea799a7621140973b1e07f86278efc017b22e44659caee0aaec26f6353ca9daebdfaf6f977435ad6ec7b907e27b051659bba76bd8eec00bde62843d04461f2cd8f18986b8b568be3158f940cb88b432dfb732eef"

axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 


export async function getCards() {

    try{
        const response = await axios.get("http://localhost:1337/api/cards?populate=images")
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function getCardsFromCategory(category: string) {

    try{
        const response = await axios.get(`http://localhost:1337/api/cards?populate=images&filters[category][$eq]=${category}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}


export async function getCardCategories() {
    try{
        const response = await axios.get("http://localhost:1337/api/content-type-builder/content-types/api::card.card")
        return response.data.data.schema.attributes.category.enum
    } catch (error) {
        console.log(error)
    }
}


export async function getResume() {

    try{
        const response = await axios.get("http://localhost:1337/api/resume?populate=document")
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function getGithub() {

    try{
        const response = await axios.get("http://localhost:1337/api/github")
        return response.data
    } catch (error) {
        console.log(error)
    }

}

