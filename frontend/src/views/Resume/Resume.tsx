import React, {FC, useEffect} from 'react'
import useGithubCard from '../../custom/github'

interface Props {
    // any props that come into the component
    children?: any
}


const Gallery: FC<Props> = ({children, ...rest}) => {


    useGithubCard()

    return <div className="justify-content-center flex-column d-flex" style={{justifyItems: 'center', alignItems: 'center'}} >

                <iframe className='resume' style={{width:"100vw", height: "calc(100vh - 77px)", zIndex: 1000}} src="resume.pdf" />

            </div>
}

export default Gallery