import React, { FC, useEffect, useState } from 'react'
import Card from '../../components/Card'
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
            console.log(data)
            setCards(data.data)
        })
    
    }, [])
    


    const objs = [0,1,2,3,4,5,6]


    return <div className="justify-content-center flex-column d-flex" style={{justifyContent: 'center', justifyItems: 'center', alignItems: 'center', position: 'relative'}} >
            
                {objs.map((obj,i) => {
                    return <TinderCard className='swipe'>
                                <Card index={i}>
                                </Card>
                            </TinderCard>
                })}
                
                    <div className='deck-container fixed-bottom'>
                        <DeckControls>  
                        </DeckControls>
                    </div>
                    
                   
                
            </div>
}

export default Swipe