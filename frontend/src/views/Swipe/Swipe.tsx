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

    return <div className="justify-content-center flex-column d-flex" style={{justifyContent: 'center', justifyItems: 'center', alignItems: 'center', position: 'relative'}} >
                {cards.map((card,i) => {
                    // console.log(card)
                    return <TinderCard className='swipe'>
                                <SwipeCard card={card} index={i}>
                                </SwipeCard>
                            </TinderCard>
                })}
                
                    <div className='deck-container fixed-bottom'>
                        <DeckControls>  
                        </DeckControls>
                    </div>
                    
                    
                   
                
            </div>
}

export default Swipe