import React, { Component, FC } from 'react'
import Buttom from 'react-bootstrap/Button'
import {ArrowCounterclockwise, ChatLeftText, ChevronDoubleRight} from 'react-bootstrap-icons'
import './DeckControls.scss'


import Button from 'react-bootstrap/Button'

interface Props {
    // any props that come into the component
}




 
const DeckControls: FC<Props> = ({children, ...rest}) => {

    return <div className="bg-white p-2 rounded deck d-flex justify-content-center"> 
      {/* <!-- xl circle buttons--> */}
      <Button className="btn-success btn-circle btn-circle-xl m-1"><ArrowCounterclockwise></ArrowCounterclockwise></Button>
      <span className="btn-spacer" ></span>
      <Button className="btn-primary btn-circle btn-circle-xl m-1"><ChatLeftText></ChatLeftText></Button>
      <span className="btn-spacer" ></span>
      <Button className="btn-info btn-circle btn-circle-xl m-1"><ChevronDoubleRight></ChevronDoubleRight></Button>
    </div>


}

export default DeckControls