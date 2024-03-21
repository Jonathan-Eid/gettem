import { getCardCategories, getCards, getCardsFromCategory, getGithub, getResume } from "./strapi.js";


console.log("Keeping the cache!")

setInterval( async () => {

    
    getCards().then((cards) => {
        console.log(cards)
    }).catch(err => console.log(err))

    getResume().then((resume) => {
        console.log(resume)
    }).catch(err => console.log(err))

    getGithub().then((github) => {
        console.log(github)
    }).catch(err => console.log(err))

    const categories = await getCardCategories()
    console.log(categories)
    for (const category of categories) {
        getCardsFromCategory(category).then((cards) => {
            console.log(cards)
        }).catch(err => console.log(err))
    }

    
}, 1000*60*45);