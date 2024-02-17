import React, {FC, useEffect, useRef, useState} from 'react'
import './Gallery.scss'
import { getCardCategories, getCardsFromCategory } from '../../api/strapi'
import { Col, Container, Row } from 'react-bootstrap'
import { categoryToTitle } from '../../utils/utils'
import SwipeCard from '../../components/SwipeCard'


interface Props {
    // any props that come into the component
    children?: any
}


const Gallery: FC<Props> = ({children, ...rest}) => {


    const [categories, setCategories] : any = useState([])
    const [cardMapState, setCardMapState] : any  = useState()




    useEffect( () => {

        // document.body.style.overflowY = "visible";

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


    return <div className="gallery-container" style={{width: "100vw", height: "calc(100vh - 77px)"}} >
            
                <br></br>
                <Container style={{zIndex:1}} fluid>
                    {categories && categories.map((category: string) => {
                            return <><h2 className='underline'>{categoryToTitle(category)}</h2>
                                    <Row className='gallery-row'>
                                        {cardMapState && cardMapState[category] && cardMapState[category].map((card:any) => {
                                            return (<Col style={{marginTop: "20px"}}>
                                                        <SwipeCard card={card} ></SwipeCard>
                                                    </Col>)
                                        })}
                                    </Row>
                                    <br></br>
                            </>
                    })}
                    
                </Container>

            </div>
}

export default Gallery