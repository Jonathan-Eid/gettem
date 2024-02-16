import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import SwipeCard from '../../components/Card'
import TinderCard from 'react-tinder-card'
import './Swipe.scss'
import { getCards } from '../../api/strapi'
import Button from 'react-bootstrap/Button'
import {ArrowCounterclockwise, ChevronDoubleRight, ChevronDoubleLeft} from 'react-bootstrap-icons'

interface Props {
    // any props that come into the component
    children?: any
}


const Swipe: FC<Props> = ({children, ...rest}) => {


    const cards = useRef([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lastDirection, setLastDirection] = useState("")
    const currentIndexRef = useRef(currentIndex)


    useEffect( () => {
  
        getCards().then(data => {
            cards.current = data.data
            setCurrentIndex(data.data.length-1)
            currentIndexRef.current = data.data.length-1

        })
    
    }, [])

    const childRefs = useMemo(
        () =>
          Array(cards.current.length)
            .fill(0)
            .map((i) => React.createRef<any>()),
        [cards.current]
      )

      const updateCurrentIndex = (val:number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
      }

      const canGoBack = currentIndex < cards.current.length-1

      const canSwipe = currentIndex >= 0

      // set last direction and decrease current index
      const swiped = (direction:string, index:number) => {
            setLastDirection(direction)
            updateCurrentIndex(index - 1)
      }

      const outOfFrame = (name:string, idx:number) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
      }
    

      const swipe = async (dir:string) => {
        if (canSwipe && currentIndex < cards.current.length) {
          await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
      }

      const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
      }

      const redoAll = async () => {
        for (let index = 0; index < 3; index++){
          await goBack()
        }
      }
    

    return <div className="justify-content-center flex-column d-flex swipe-container" style={{justifyItems: 'center', alignItems: 'center'}} >

                <div className='card-container'>
                    {cards.current.map((card:any,i) => {
                        return <TinderCard 
                                ref={childRefs[i]}
                                key={card.attributes.name}
                                onSwipe={(dir) => swiped(dir, i)}
                                onCardLeftScreen={() => outOfFrame(card.attributes.name, i)}
                                preventSwipe={["up","down"]}
                                className='swipe'>
                                    <SwipeCard card={card}>
                                    </SwipeCard>
                                </TinderCard>
                    })}
                    
                  {(currentIndex == -1) &&
                    <div className='end-message-container'>
                      <div className='end-message'>
                        <Button size="lg" variant='outline-dark' href='/'>Redo</Button> <hr></hr><Button size="lg" variant='outline-dark' href="/gallery">View Gallery</Button>
                      </div>
                      
                    </div>
                  }
                  

                </div>

                
                
                  
                <div className='deck-container'>
                    <div className="btn-container p-2 rounded deck d-flex justify-content-center"> 
                        {/* <!-- xl circle buttons--> */}
                        <Button variant="lightpink" className="btn-circle-xl m-1" onClick={() => swipe('left')}><ChevronDoubleLeft></ChevronDoubleLeft></Button>
                        <span className="btn-spacer" ></span>
                        <Button variant='lavenderblush' className="btn-circle-xl m-1" onClick={() => goBack()}><ArrowCounterclockwise></ArrowCounterclockwise></Button>
                        <span className="btn-spacer" ></span>
                        <Button variant="lightpink" className="btn-circle-xl m-1" onClick={() => swipe('right')}><ChevronDoubleRight></ChevronDoubleRight></Button>
                    </div>
                </div>
                
                    
                   
                
            </div>
}

export default Swipe