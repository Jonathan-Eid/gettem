import React, { FC, useEffect } from 'react'

import "./ProfileCard.scss"
import { getUser } from '../../api/github';
import {escape, numberic} from '../../utils/utils'

interface Props {
    // any props that come into the component
    user: any,
    children?:any,
    style?:React.CSSProperties
}
 
const ProfileCard: FC<Props> = ({children,  ...props}) => {

  const [language, setLanguage] = React.useState();
  const [name, setName] = React.useState();
  const [login, setLogin] = React.useState();
  const [avatar, setAvatar] = React.useState();
  const [homepage, setHomepage] = React.useState<string>();
  const [hireable, setHireable] = React.useState();
  const [followers, setFollowers] = React.useState();
  const [publicGists, setPublicGists] = React.useState();
  const [publicRepos, setPublicRepos] = React.useState<string>();

  
  useEffect((()=>{

    (async () =>{

        let user = await getUser(props.user)

        console.log(user)

        setName(props.user)

        setLogin(props.user)

        setPublicRepos(numberic(user.public_repos))
        setPublicGists(numberic(user.public_gists))
        setFollowers(numberic(user.followers))
        setAvatar(user.avatar_url)




    })()

  }),[])


    return <div style={props.style} className="user-card github-card"> <div className="header {type}"></div>
	<a className="avatar" href={`https://github.com/${login}`} target='_blank' rel="noopener noreferrer">
		<img src={`${avatar}&s=80`} alt={name}/>
		</a>
		<div className="content">
			<h1>
				<a href={`https://github.com/${login}`} target="_blank" rel="noopener noreferrer">{name}</a>
			</h1>
			<ul className="status">
				<li>
					<a href={`https://github.com/${login}?tab=repositories`} target="_blank" rel="noopener noreferrer">
						<strong>{publicRepos}</strong>Repos
					</a>
				</li>
				<li>
					<a href={`https://gist.github.com/${login}`}  target="_blank" rel="noopener noreferrer">
						<strong>{publicGists}</strong>Gists
					</a>
				</li>
				<li>
					<a href={`https://github.com/${login}?tab=followers`} target='_blank' rel="noopener noreferrer">
						<strong>{followers}</strong>Followers
					</a>
				</li>
			</ul>
		</div>
	</div>
          
} 

export default ProfileCard  
