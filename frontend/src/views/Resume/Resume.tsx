import React, {FC, useEffect, useState} from 'react'
import useGithubCard from '../../custom/github'
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


    return <div className="justify-content-center flex-column d-flex" style={{justifyItems: 'center', alignItems: 'center'}} >

                <iframe className='resume' style={{width:"100vw", height: "calc(100vh - 77px)", zIndex: 1000}} src={`${STRAPI_URL}${resume}`} />

            </div>
}

export default Gallery