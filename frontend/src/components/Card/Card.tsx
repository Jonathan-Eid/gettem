import React, { FC } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import {InfoSquare, InfoCircle} from 'react-bootstrap-icons'


import Button from 'react-bootstrap/Button'
import './Card.scss'

interface Props {
    // any props that come into the component
    index: number 
}
 
const SwipeCard: FC<Props> = ({children,  ...props}) => {

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  const index = props.index

    return <><Card className="card-has-bg" text='white' >
              <Card.Img src={process.env.PUBLIC_URL + '/imgs/raiden.jpg'} />
              <Card.ImgOverlay></Card.ImgOverlay>  
              <Card.Body>
                <Card.Subtitle className="mb-2 small">About Me 
                </Card.Subtitle>
                <Card.Title className="mt-0"><a className="text-white" href="#">Jonathan Eid</a>
                <InfoCircle onTouchEnd={handleShow} onClick={handleShow} size="22px" className="bi-info-circle"></InfoCircle>

                </Card.Title>
                <Card.Text>YADA YADA YADA YADA YADA YADA YADA YADA YADA YADA YADA
                YADA YADA  YADA YADA YADA YADA YADA YADA YADA YADA YADA
                YADA YADA YADA YADA YADA YADA YADA YADA YADA YADA YADA
                YADA YADA YADA YADA YADA YADA YADA YADA YADA YADA YADA </Card.Text>
              </Card.Body>
              <i onClick={handleShow} onTouchEnd={handleShow} className="bi-info-square"> </i>  
 
            </Card>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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