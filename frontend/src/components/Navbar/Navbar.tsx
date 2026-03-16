import React, { FC, useRef, useLayoutEffect, useState, useCallback, useEffect } from 'react'
import './Navbar.scss'
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowCounterclockwise, ChevronDoubleLeft, ChevronDoubleRight } from 'react-bootstrap-icons'

interface Props {
    children? : any
    swipeControls?: {
        onSwipeLeft: () => void
        onSwipeRight: () => void
        onUndo: () => void
    }
}

interface PillStyle {
    left: number
    width: number
}

const NavBar: FC<Props> = ({children, swipeControls, ...rest}) => {

    const location = useLocation()
    const navRef = useRef<HTMLElement>(null)
    const navListRef = useRef<HTMLDivElement>(null)
    const [pillStyle, setPillStyle] = useState<PillStyle>({ left: 0, width: 0 })
    const [ripple, setRipple] = useState<{x: number, y: number, key: number} | null>(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const isFirstVisit = localStorage.getItem("animated") !== "true"
    const [brandExpanded, setBrandExpanded] = useState(isFirstVisit)

    useEffect(() => {
        if (!isFirstVisit) return
        const timer = setTimeout(() => setBrandExpanded(false), 4500)
        return () => clearTimeout(timer)
    }, [])

    const updatePill = useCallback(() => {
        if (!navListRef.current) return
        const activeLink = navListRef.current.querySelector('.nav-tab.active') as HTMLElement | null
        if (!activeLink) return

        const containerRect = navListRef.current.getBoundingClientRect()
        const activeRect = activeLink.getBoundingClientRect()

        setPillStyle({
            left: activeRect.left - containerRect.left,
            width: activeRect.width,
        })
    }, [])

    useLayoutEffect(() => {
        requestAnimationFrame(() => updatePill())
    }, [location.pathname, updatePill])

    useLayoutEffect(() => {
        if (!navListRef.current) return
        const resizeObserver = new ResizeObserver(() => updatePill())
        resizeObserver.observe(navListRef.current)
        return () => resizeObserver.disconnect()
    }, [updatePill])

    const handleNavClick = (e: React.MouseEvent) => {
        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()
        setRipple({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            key: Date.now()
        })
        setMobileOpen(false)
    }

    const tabs = [
        { to: 'swipe', label: 'Swipe' },
        { to: 'gallery', label: 'Gallery' },
        { to: 'resume', label: 'Resume' },
        { to: 'github', label: 'Github' },
    ]

    return (
        <nav ref={navRef} className="custom-navbar">
            <a className={`navbar-brand ${brandExpanded ? 'brand-intro' : ''}`} href="/">
                <span className="brand-text">
                    <span className="brand-jon">jon</span>
                    <span className="brand-athan"><span className="brand-athan-inner">athan</span></span>
                    <span className="brand-eid">eid</span>
                </span>
            </a>

            {swipeControls && (
                <div className="navbar-deck">
                    <button className="navbar-deck-btn" onClick={swipeControls.onSwipeLeft} aria-label="Swipe left">
                        <ChevronDoubleLeft />
                    </button>
                    <button className="navbar-deck-btn navbar-deck-btn-undo" onClick={swipeControls.onUndo} aria-label="Undo">
                        <ArrowCounterclockwise />
                    </button>
                    <button className="navbar-deck-btn" onClick={swipeControls.onSwipeRight} aria-label="Swipe right">
                        <ChevronDoubleRight />
                    </button>
                </div>
            )}

            <button
                className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
            >
                <span /><span /><span />
            </button>

            <div ref={navListRef} className={`nav-tabs-container ${mobileOpen ? 'mobile-open' : ''}`}>
                <div
                    className="nav-pill"
                    style={{
                        left: pillStyle.left + 'px',
                        width: pillStyle.width + 'px',
                    }}
                />
                {tabs.map(tab => (
                    <NavLink
                        key={tab.to}
                        to={tab.to}
                        className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <span className="nav-tab-label">{tab.label}</span>
                        {ripple && (
                            <span
                                key={ripple.key}
                                className="ripple"
                                style={{ left: ripple.x, top: ripple.y }}
                            />
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}

export default NavBar
