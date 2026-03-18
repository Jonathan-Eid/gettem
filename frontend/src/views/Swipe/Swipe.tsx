import React, { FC, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import SwipeCard from '../../components/SwipeCard'
import TinderCard from 'react-tinder-card'
import './Swipe.scss'
import { getCards } from '../../api/strapi'
import { ArrowCounterclockwise } from 'react-bootstrap-icons'
import { useSwipeControls } from '../../context/SwipeControlsContext'
import { useAnalytics } from '../../context/AnalyticsContext'

interface Props {
    children?: any
}


const Swipe: FC<Props> = ({children, ...rest}) => {

    const cards = useRef([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lastDirection, setLastDirection] = useState("")
    const currentIndexRef = useRef(currentIndex)
    const [showSwipeHint, setShowSwipeHint] = useState(localStorage.getItem("animated") !== "true")
    const { setControls } = useSwipeControls()
    const { trackEvent, markTime, elapsed } = useAnalytics()
    const impressionTime = useRef<number>(0)

    const childRefsRef = useRef<React.RefObject<any>[]>([])

    useEffect( () => {
        getCards().then(data => {
            cards.current = data.data
            childRefsRef.current = Array(data.data.length).fill(0).map(() => React.createRef<any>())
            setCurrentIndex(data.data.length-1)
            currentIndexRef.current = data.data.length-1
            localStorage.setItem("animated","true")
            // Track first card impression
            if (data.data.length > 0) {
                impressionTime.current = markTime()
                trackEvent({
                    eventType: 'card_impression',
                    cardId: String(data.data[data.data.length - 1].id),
                })
            }
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

      const swiped = (direction:string, index:number) => {
            const dwellMs = elapsed(impressionTime.current)
            const card = cards.current[index] as any
            trackEvent({
                eventType: 'swipe',
                cardId: String(card?.id ?? ''),
                swipeDirection: direction as 'left' | 'right',
                dwellTimeMs: dwellMs,
            })
            setLastDirection(direction)
            updateCurrentIndex(index - 1)
            setShowSwipeHint(false)
            // Track next card impression
            if (index - 1 >= 0) {
                impressionTime.current = markTime()
                const nextCard = cards.current[index - 1] as any
                trackEvent({
                    eventType: 'card_impression',
                    cardId: String(nextCard?.id ?? ''),
                })
            }
      }

      const outOfFrame = (name:string, idx:number) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      }

      const swipe = useCallback(async (dir:string) => {
        if (currentIndexRef.current >= 0 && currentIndexRef.current < cards.current.length) {
          await childRefs[currentIndexRef.current]?.current?.swipe(dir)
        }
      }, [childRefs])

      const goBack = useCallback(async () => {
        if (currentIndexRef.current >= cards.current.length - 1) return
        const newIndex = currentIndexRef.current + 1
        const restoredCard = cards.current[newIndex] as any
        trackEvent({
            eventType: 'undo',
            cardId: String(restoredCard?.id ?? ''),
        })
        updateCurrentIndex(newIndex)
        await childRefs[newIndex]?.current?.restoreCard()
        // Track re-impression of restored card
        impressionTime.current = markTime()
        trackEvent({
            eventType: 'card_impression',
            cardId: String(restoredCard?.id ?? ''),
        })
      }, [childRefs, trackEvent, markTime])

      // Register swipe controls with navbar
      useEffect(() => {
        setControls({
          onSwipeLeft: () => swipe('left'),
          onSwipeRight: () => swipe('right'),
          onUndo: () => goBack(),
        })
        return () => setControls(null)
      }, [swipe, goBack, setControls])

    return <div className="justify-content-center flex-column d-flex swipe-container" style={{justifyItems: 'center', alignItems: 'center'}} >

                <div className={`card-container ${showSwipeHint && currentIndex >= 0 ? 'card-container-hint' : ''}`}>
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

                  {showSwipeHint && currentIndex >= 0 && (
                    <div className="swipe-hint">
                      <div className="swipe-hint-dot" />
                    </div>
                  )}

                  {(currentIndex == -1) &&
                    <div className='end-message-container'>
                      <div className='end-message'>
                        <span className='end-message-emoji'>&#x1F38C;</span>
                        <h3 className='end-message-title'>You've seen it all!</h3>
                        <p className='end-message-subtitle'>Want another look?</p>
                        <div className='end-message-actions'>
                          <button className='end-btn end-btn-primary' onClick={() => window.location.reload()}>
                            <ArrowCounterclockwise size={16} /> Start Over
                          </button>
                          <button className='end-btn end-btn-secondary' onClick={() => window.location.href = '/gallery'}>
                            View Gallery
                          </button>
                        </div>
                      </div>
                    </div>
                  }

                </div>

            </div>
}

export default Swipe
