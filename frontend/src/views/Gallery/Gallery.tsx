import React, {FC, useEffect, useRef, useState} from 'react'
import './Gallery.scss'
import { getCardCategories, getCardsFromCategory } from '../../api/strapi'
import { categoryToTitle } from '../../utils/utils'
import SwipeCard from '../../components/SwipeCard'


interface Props {
    children?: any
}


const Gallery: FC<Props> = ({children, ...rest}) => {

    const [categories, setCategories] : any = useState([])
    const [cardMapState, setCardMapState] : any  = useState()

    useEffect( () => {
        (async () => {
            let cardMap: any = {}
            const categories = await getCardCategories()
            setCategories(categories)

            for (let category of categories){
                cardMap[category] = []
                const cards = await getCardsFromCategory(category)
                cardMap[category] = cards.data
            }

            setCardMapState(cardMap)
        })()
    }, [])


    return <div className="gallery-container">

                <div className="gallery-content">
                    {categories && categories.map((category: string) => {
                            const cards = cardMapState && cardMapState[category]
                            if (!cards || cards.length === 0) return null
                            return <section className="gallery-section" key={category}>
                                    <h2 className='gallery-heading'>{categoryToTitle(category)}</h2>
                                    <div className='gallery-grid'>
                                        {cards.map((card:any) => (
                                            <div className="gallery-item" key={card.id}>
                                                <SwipeCard card={card} variant="gallery" />
                                            </div>
                                        ))}
                                    </div>
                            </section>
                    })}
                </div>

            </div>
}

export default Gallery
