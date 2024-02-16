import React, {FC, useEffect, useState} from 'react'
import useGithubCard from '../../custom/github'
import { Col, Container, Row } from 'react-bootstrap'
import "./Github.scss"
import { getGithub } from '../../api/strapi'

interface Props {
    // any props that come into the component
    children?: any
}


const Github: FC<Props> = ({children, ...rest}) => {

    const [github, setGithub] = useState<any>({
        "user": "jonathan-eid",
        "repositories": [
          "brick-prep",
          "fitbit-metronome",
          "flutter-notes",
          "CryptoExchangeOrderBookAPI",
          "webcheckers",
          "chromium-vulnerabilities"
        ]
      })

    useGithubCard(github)

    function getGroups(repos:string[]):string[]{

        let groups: any[] = []

        let length:number = repos.length

        let x = 0
        let y = 3

        while (true){

            if (y >= length) {
                groups.push(repos.slice(x,length))
                break
            }
            groups.push(repos.slice(x,y))
            x += 3
            y += 3

        }

        return groups
    }


    useEffect(() => {

        (async () => {
            const github = await getGithub()
            console.log(github)
            setGithub(github.data.attributes.account)
        })()
        
    },[])



    return <div className="justify-content-center flex-column d-flex" style={{justifyItems: 'center', alignItems: 'center', width: "100vw", height: "calc(100vh - 77px)", overflow: 'auto', position: "absolute"}} >


                <Container fluid className='github-container'>
                    <Row className="justify-content-md-center">

                        <Col md="auto"> {/* Larger item on the left */}

                        <div className="larger-item"> 
                            {/* Content for the larger item */}
                            {github && <div className="github-card" data-github={github['user']} data-width="500" data-height="" data-theme="medium"></div>}
                            

                        </div>
                        </Col>

                        {github && getGroups(github['repositories']).map((group:any)=> {
                            return <Col md="auto">
                                        {group.map((repo:any)=> {
                                            return <div className="smaller-item">
                                                        <div className="github-card" data-user={github['user']} data-repo={repo} data-width="400" data-height="" data-theme="default"></div>
                                                    </div>
                                        })}
                                    </Col>
                        }) }


                        
                    </Row>
                </Container>


            </div>
}

export default Github