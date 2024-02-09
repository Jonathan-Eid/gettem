import React, { FC} from 'react'

interface Props {
    // any props that come into the component
    children?: any
}


const Gallery: FC<Props> = ({children, ...rest}) => {


    return <div className="justify-content-center flex-column d-flex" style={{justifyItems: 'center', alignItems: 'center'}} >

                <h2 style={{zIndex: 1001}}>Wake up and shake up</h2>

            </div>
}

export default Gallery