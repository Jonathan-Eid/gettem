import React, { FC, useEffect } from 'react'
import "./RepoCard.scss"
import { getRepo } from '../../api/github'
import { escape } from '../../utils/utils'

interface Props {
    user: any,
    repo: any,
    children?: any,
    style?: React.CSSProperties
}

const RepoCard: FC<Props> = ({children, ...props}) => {

  const [language, setLanguage] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [forks, setForks] = React.useState<number>();
  const [stars, setStars] = React.useState<number>();
  const [isFork, setIsFork] = React.useState(false);

  useEffect(() => {
    (async () => {
      let repo = await getRepo(props.user, props.repo)

      setForks(repo.forks_count)
      setStars(repo.watchers_count)
      setIsFork(repo.fork)

      let desc = repo.description
      if (!desc && repo.source) desc = repo.source.description
      if (!desc && repo.message) desc = repo.message
      desc = escape(desc) || 'No description'
      setDescription(desc)

      setLanguage(repo.language)
    })()
  }, [props.repo])

  return (
    <a className="repo-card" href={`https://github.com/${props.user}/${props.repo}`} target="_blank" rel="noopener noreferrer">
      <div className="repo-card-header">
        <span className="repo-card-name">{props.repo}</span>
        {language && <span className="repo-card-lang">{language}</span>}
      </div>
      <p className="repo-card-desc">{description}</p>
      <div className="repo-card-footer">
        {isFork && <span className="repo-card-badge">Fork</span>}
        <span className="repo-card-stat">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 0-1.5 0v.878H6.75v-.878a2.25 2.25 0 1 0-1.5 0ZM8 1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-2.75 3a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm5.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-2.75 6a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/><path d="M8 8a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 8Z"/></svg>
          {forks}
        </span>
        <span className="repo-card-stat">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
          {stars}
        </span>
      </div>
    </a>
  )
}

export default RepoCard
