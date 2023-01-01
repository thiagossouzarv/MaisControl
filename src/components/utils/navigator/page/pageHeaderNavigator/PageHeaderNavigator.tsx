import React from "react"
import Separator from "../../../separator/Separator"

import * as UI from "./PageHeaderNavigatorStyle"

interface PageHeaderNavigatorProps {
   onBackPress: () => void
   title: string
}

const PageHeaderNavigator: React.FC<PageHeaderNavigatorProps> = ({
    onBackPress,
    title
}) => {
    return (
        <UI.Container>
            <UI.BackIcon
                onClick={onBackPress}
                icon="chevron-left"
                iconSource="material-community"
                iconSize="md"
                iconSizeFactor={1.15}
                color="fg:dark" />
            <Separator gap="md" vertical />

            <UI.Title>{title}</UI.Title>
        </UI.Container>
    )
}

export default PageHeaderNavigator