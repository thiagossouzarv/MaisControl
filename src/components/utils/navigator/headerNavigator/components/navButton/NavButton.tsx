import React from "react"
import { Icon } from "../../../../../ui"

import * as UI from "./NavButtonStyle"

interface NavButtonProps {
   direction: "left" | "right",
   onPress: () => void
}

const NavButton: React.FC<NavButtonProps> = ({
    direction,
    onPress
}) => {
    return (
        <UI.Container>
            <Icon
                icon={"chevron-" + direction}
                iconSource="entypo"
                onClick={onPress} />
        </UI.Container>
    )
}

export default NavButton