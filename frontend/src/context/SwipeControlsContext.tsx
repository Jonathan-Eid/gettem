import React, { createContext, useContext, useState } from 'react'

interface SwipeControls {
    onSwipeLeft: () => void
    onSwipeRight: () => void
    onUndo: () => void
}

interface SwipeControlsContextType {
    controls: SwipeControls | null
    setControls: (controls: SwipeControls | null) => void
}

const SwipeControlsContext = createContext<SwipeControlsContextType>({
    controls: null,
    setControls: () => {}
})

export const SwipeControlsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [controls, setControls] = useState<SwipeControls | null>(null)
    return (
        <SwipeControlsContext.Provider value={{ controls, setControls }}>
            {children}
        </SwipeControlsContext.Provider>
    )
}

export const useSwipeControls = () => useContext(SwipeControlsContext)
