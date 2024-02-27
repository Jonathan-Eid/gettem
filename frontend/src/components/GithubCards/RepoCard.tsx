import React, { FC, useEffect } from 'react'

import "./RepoCard.scss"
import { getRepo } from '../../api/github';
import {escape} from '../../utils/utils'

interface Props {
    // any props that come into the component
    user: any,
    repo: any,
    children?:any,
    style?:React.CSSProperties
}
 
const RepoCard: FC<Props> = ({children,  ...props}) => {

  const [language, setLanguage] = React.useState();
  const [name, setName] = React.useState();
  const [login, setLogin] = React.useState();
  const [description, setDescription] = React.useState();
  const [homepage, setHomepage] = React.useState<string>();
  const [forks, setForks] = React.useState();
  const [watchers, setWatchers] = React.useState();
  const [stars, setStars] = React.useState();
  const [action, setAction] = React.useState<string>();

  
  useEffect((()=>{

    (async () =>{

        let repo = await getRepo(props.user,props.repo)

        console.log(repo)

        setName(repo.name)

        setLogin(props.user)

        setForks(repo.forks_count)

        setWatchers(repo.watchers_count)

        if (repo.fork){
            setAction(`Forked by `)
        }else{
            setAction(`Created by `)
        }

        let description = repo.description

        if (!description && repo.source ){
            description = repo.source.description
        }
        if(!description && repo.message){
            description = repo.message
        }
        description = escape(description) || 'No description'
        setDescription(description)

        let homepage = repo.homepage

        if (!homepage && repo.source) {
            homepage = repo.source.homepage;
        }

        if (homepage) {
            setHomepage(' <a href="' + homepage + '">' + homepage.replace(/https?:\/\//, '').replace(/\/$/, '') + '</a>')
        } else {
            setHomepage('')
        }

        setLanguage(repo.language)
        



    })()

  }),[props.repo])


    return <div style={props.style} className="repo-card github-card"><div className="header">
        <strong className="name">
            <a href={`https://github.com/${props.user}/${props.repo}`} target='_blank'>{props.repo}</a>
            <sup className="language">{language}</sup>
        </strong>
        <span>{action}<a href={`https://github.com/${props.user}`} target='_blank' rel="noopener noreferrer">{props.user}</a>
        </span>
        </div><div className="content">
                <p>{description}{homepage}</p>
            </div><div className="footer">
                <span className="status">
                    <strong>{forks}</strong>Forks </span>
                <span className="status">
                    <strong>{watchers}</strong>Stars </span>
            </div>
    </div>
            
          
} 

export default RepoCard  
