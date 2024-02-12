import React, {FC, useEffect} from 'react'
import useGithubCard from '../../custom/github'

interface Props {
    // any props that come into the component
    children?: any
}


const Github: FC<Props> = ({children, ...rest}) => {


    useGithubCard()

    return <div className="justify-content-center flex-column d-flex" style={{justifyItems: 'center', alignItems: 'center', width: "100vw", height: "100vh"}} >

                <div className="github-card" data-zindex="1000" data-github="jonathan-eid" data-width="500" data-height="" data-theme="medium"></div>


            </div>
}

export default Github