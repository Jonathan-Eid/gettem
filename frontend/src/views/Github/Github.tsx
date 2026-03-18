import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import "./Github.scss"
import { getGithub } from '../../api/strapi'
import RepoCard from '../../components/GithubCards/RepoCard'
import ProfileCard from '../../components/GithubCards/ProfileCard'
import { useAnalytics } from '../../context/AnalyticsContext'

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

    const { trackEvent, markTime, elapsed } = useAnalytics()
    const pageOpenTime = useRef(markTime())

    const handleLinkClick = useCallback((label: string) => {
        trackEvent({ eventType: 'link_click', cardId: label })
    }, [trackEvent])

    useEffect(() => {
        trackEvent({ eventType: 'page_view', cardId: 'github' })
        return () => {
            trackEvent({ eventType: 'page_view', cardId: 'github', dwellTimeMs: elapsed(pageOpenTime.current) })
        }
    }, [])

    useEffect(() => {
        (async () => {
            const github = await getGithub()
            setGithub(github.data.attributes.account)
        })()
    },[])

    return <div className="github-page">
        <div className="github-content">
            <div className="github-profile-col">
                {github && <ProfileCard user={github['user']} onLinkClick={handleLinkClick} />}
            </div>
            <div className="github-repos-col">
                <h2 className="github-repos-heading">Repositories</h2>
                <div className="github-repos-grid">
                    {github && github['repositories'].map((repo: string) => (
                        <RepoCard key={repo} user={github['user']} repo={repo} onLinkClick={handleLinkClick} />
                    ))}
                </div>
            </div>
        </div>
    </div>
}

export default Github
