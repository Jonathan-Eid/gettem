import React, {FC, useEffect, useState} from 'react'
import "./Github.scss"
import { getGithub } from '../../api/strapi'
import RepoCard from '../../components/GithubCards/RepoCard'
import ProfileCard from '../../components/GithubCards/ProfileCard'

interface Props {
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

    useEffect(() => {
        (async () => {
            const github = await getGithub()
            console.log(github)
            setGithub(github.data.attributes.account)
        })()
    },[])

    return <div className="github-page">
        <div className="github-content">
            <div className="github-profile-col">
                {github && <ProfileCard user={github['user']} />}
            </div>
            <div className="github-repos-col">
                <h2 className="github-repos-heading">Repositories</h2>
                <div className="github-repos-grid">
                    {github && github['repositories'].map((repo: string) => (
                        <RepoCard key={repo} user={github['user']} repo={repo} />
                    ))}
                </div>
            </div>
        </div>
    </div>
}

export default Github
