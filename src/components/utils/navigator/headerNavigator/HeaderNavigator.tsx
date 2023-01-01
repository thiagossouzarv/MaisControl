import React from "react"
import NavButton from "./components/navButton/NavButton"

import * as UI from "./HeaderNavigatorStyle"

interface HeaderNavigatorProps {
   children: React.ReactNode
   handleNext: () => void
   handlePrevius: () => void
}

const HeaderNavigator: React.FC<HeaderNavigatorProps> = ({
    children,
    handleNext,
    handlePrevius
}) => {
    return (
        <UI.Container>
            <NavButton 
                onPress={handlePrevius}
                direction="left" />
                <UI.Content>
                    {children}
                </UI.Content>
            <NavButton
                onPress={handleNext}
                direction="right" />
        </UI.Container>
    )
}

export default HeaderNavigator