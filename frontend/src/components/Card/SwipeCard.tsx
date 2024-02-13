import React, { FC } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import {InfoSquare, InfoCircle, Images} from 'react-bootstrap-icons'
import Markdown from 'react-markdown'


import Button from 'react-bootstrap/Button'
import './SwipeCard.scss'
import { Carousel } from 'react-bootstrap'
import { kMaxLength } from 'buffer'

interface Props {
    // any props that come into the component
    index?: number
    card: any,
    children?: any
}
 
const SwipeCard: FC<Props> = ({children,  ...props}) => {

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  const index = props.index
  const card = props.card.attributes
  const card_images = card.images.data
  // console.log(card)

    return <>
            <Card className="card-has-bg" text='white' >
              <Card.Img src={"http://localhost:1337"+card_images[0].attributes.formats.large.url} />
              <Card.ImgOverlay></Card.ImgOverlay>  
              <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: "end"}}>
                <Card.Subtitle className="mb-2">
                  {card.subtitle}
                </Card.Subtitle>
                <Card.Title className="mt-0">{card.name}
                <InfoCircle onTouchEnd={handleShow} onClick={handleShow} size="22px" className="bi-info-circle"></InfoCircle>

                </Card.Title>
                  <Card.Text>
                      {card.intro}
                  </Card.Text>
              </Card.Body>
              <i onClick={handleShow} onTouchEnd={handleShow} className="bi-info-square"> </i>  
 
            </Card>

            
            
            

            <Modal dialogClassName="modal-width" show={show} onHide={handleClose}>
              <Modal.Header placeholder={"header"} style={{justifyContent: 'center'}} closeButton>
                <Modal.Title>{card.name}</Modal.Title>
            </Modal.Header>

              <Modal.Body>

              
              <Carousel className='carousel'> 
              
                  {card_images.map((image:any,i:number) => {

                    return <Carousel.Item className="carousel-item"> 
                    
                      <img
                          className="carousel-img"
                          src={"http://localhost:1337"+image.attributes.formats.large.url}
                      /> 

                    
                    </Carousel.Item>
                  })} 
                  
                </Carousel> 
                <Markdown>
                  {card.description}
                </Markdown>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            
            </>
          
} 

export default SwipeCard  
