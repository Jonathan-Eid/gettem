import React, { FC, useEffect } from 'react'
import "./ProfileCard.scss"
import { getUser } from '../../api/github'
import { numberic } from '../../utils/utils'

interface Props {
    user: any,
    children?: any,
    style?: React.CSSProperties
}

const ProfileCard: FC<Props> = ({children, ...props}) => {

  const [name, setName] = React.useState<string>();
  const [avatar, setAvatar] = React.useState<string>();
  const [followers, setFollowers] = React.useState<string>();
  const [publicGists, setPublicGists] = React.useState<string>();
  const [publicRepos, setPublicRepos] = React.useState<string>();

  useEffect(() => {
    (async () => {
      let user = await getUser(props.user)
      setName(props.user)
      setPublicRepos(numberic(user.public_repos) || '0')
      setPublicGists(numberic(user.public_gists) || '0')
      setFollowers(numberic(user.followers) || '0')
      setAvatar(user.avatar_url)
    })()
  }, [])

  return (
    <div className="profile-card">
      <div className="profile-card-banner" />
      <div className="profile-card-body">
        <a className="profile-card-avatar" href={`https://github.com/${name}`} target='_blank' rel="noopener noreferrer">
          <img src={`${avatar}&s=120`} alt={name} />
        </a>
        <h3 className="profile-card-name">
          <a href={`https://github.com/${name}`} target="_blank" rel="noopener noreferrer">{name}</a>
        </h3>
        <div className="profile-card-stats">
          <a className="profile-card-stat" href={`https://github.com/${name}?tab=repositories`} target="_blank" rel="noopener noreferrer">
            <strong>{publicRepos}</strong>
            <span>Repos</span>
          </a>
          <a className="profile-card-stat" href={`https://gist.github.com/${name}`} target="_blank" rel="noopener noreferrer">
            <strong>{publicGists}</strong>
            <span>Gists</span>
          </a>
          <a className="profile-card-stat" href={`https://github.com/${name}?tab=followers`} target='_blank' rel="noopener noreferrer">
            <strong>{followers}</strong>
            <span>Followers</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
