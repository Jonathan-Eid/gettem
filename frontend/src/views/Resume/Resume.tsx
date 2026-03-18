import React, {FC, useEffect, useRef, useState} from 'react'
import { STRAPI_URL, getResume } from '../../api/strapi'
import { useAnalytics } from '../../context/AnalyticsContext'

interface Props {
    children?: any
}


const Gallery: FC<Props> = ({children, ...rest}) => {

    const [resume, setResume] = useState<any>()
    const { trackEvent, markTime, elapsed } = useAnalytics()
    const pageOpenTime = useRef(markTime())

    useEffect(() => {
        trackEvent({ eventType: 'page_view', cardId: 'resume' })
        return () => {
            trackEvent({ eventType: 'page_view', cardId: 'resume', dwellTimeMs: elapsed(pageOpenTime.current) })
        }
    }, [])

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