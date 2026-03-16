import React, {FC, useEffect, useState} from 'react'
import { STRAPI_URL, getResume } from '../../api/strapi'

interface Props {
    // any props that come into the component
    children?: any
}


const Gallery: FC<Props> = ({children, ...rest}) => {

    const [resume, setResume] = useState<any>()

    useEffect(() => {

        (async () => {
            const resume = await getResume()
            setResume(resume.data.attributes.document.data.attributes.url)
        })()
        
    },[])


    return <div style={{width: "100vw", height: "calc(100vh - 64px)", position: "relative", zIndex: 1}}>
                <iframe className='resume' style={{width:"100%", height: "100%", border: 'none', display: 'block'}} src={`${STRAPI_URL}${resume}`} />
            </div>
}

export default Gallery