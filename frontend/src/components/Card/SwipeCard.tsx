import React, { FC } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import {InfoSquare, InfoCircle, Images} from 'react-bootstrap-icons'


import Button from 'react-bootstrap/Button'
import './SwipeCard.scss'
import { Carousel } from 'react-bootstrap'
import { kMaxLength } from 'buffer'

interface Props {
    // any props that come into the component
    index: number
    card: any 
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
              <Card.Body>
                <Card.Subtitle className="mb-2 small">{card.subtitle}
                </Card.Subtitle>
                <Card.Title className="mt-0"><a className="text-white" href="#">{card.name}</a>
                <InfoCircle onTouchEnd={handleShow} onClick={handleShow} size="22px" className="bi-info-circle"></InfoCircle>

                </Card.Title>
                <Card.Text>{card.description}</Card.Text>
              </Card.Body>
              <i onClick={handleShow} onTouchEnd={handleShow} className="bi-info-square"> </i>  
 
            </Card>

              {/* <Carousel>
                  {card_images.map((image:any,i:number) => {
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={"http://localhost:1337"+image.attributes.formats.large.url}
                      />
                    </Carousel.Item>
                  })}
                </Carousel> */}
            

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{card.name}</Modal.Title>
            </Modal.Header>

              <Modal.Body>
                
                {card.description}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            
            </>
          
} 

export default SwipeCard  

 
{/* <div class="col-sm-4"><div class="card text-white card-has-bg click-col" style="background-image:url('https://source.unsplash.com/600x900/?tech,street');">
<img class="card-img d-none" src="https://source.unsplash.com/600x900/?tech,street" alt="Goverment Lorem Ipsum Sit Amet Consectetur dipisi?">
<div class="card-img-overlay d-flex flex-column">
<div class="card-body">
   <small class="card-meta mb-2">Thought Leadership</small>
   <h4 class="card-title mt-0 "><a class="text-white" herf="#">Goverment Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
  <small><i class="far fa-clock"></i> October 15, 2020</small>
 </div>
 <div class="card-footer">
  <div class="media">
<img class="mr-3 rounded-circle" src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/male-512.png" alt="Generic placeholder image" style="max-width:50px">
<div class="media-body">
<h6 class="my-0 text-white d-block">Oz COruhlu</h6>
<small>Director of UI/UX</small>
</div>
</div> */}