import React, { FC } from 'react'
import Card from '../../components/Card'
import DeckControls from '../../components/DeckControls'


interface Props {
    // any props that come into the component
}
const Swipe: FC<Props> = ({children, ...rest}) => {

    return <div className="justify-content-center flex-column d-flex" style={{justifyContent: 'center', justifyItems: 'center', alignItems: 'center', position: 'relative'}} >
                <Card>
                </Card>

                <DeckControls> 
                    
                </DeckControls>
            </div>
}

export default Swipe