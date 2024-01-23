import React, { FC, useEffect, useState } from 'react'
import SwipeCard from '../../components/Card'
import DeckControls from '../../components/DeckControls'
import TinderCard from 'react-tinder-card'
import './Swipe.scss'
import { getCards } from '../../api/strapi'

interface Props {
    // any props that come into the component
}


const Swipe: FC<Props> = ({children, ...rest}) => {


    const [cards, setCards] = useState([])

    useEffect( () => {
  
        getCards().then(data => {
            setCards(data.data)
        })
    
    }, [])

    return <div className="justify-content-center flex-column d-flex swipe-container" style={{justifyItems: 'center', alignItems: 'center'}} >

                <div className='card-container'>
                    {cards.map((card,i) => {
                        // console.log(card)
                        return <TinderCard className='swipe'>
                                    <SwipeCard card={card} index={i}>
                                    </SwipeCard>
                                </TinderCard>
                    })}
                </div>
                
                
                    <div className='deck-container'>
                        <DeckControls>  
                        </DeckControls>
                    </div>
                    
                    
                   
                
            </div>
}

export default Swipe