import React from "react"

import * as UI from "./PageLoadingStyle"

interface PageLoadingProps {
    visible: boolean,
    white?: boolean
}

const PageLoading: React.FC<PageLoadingProps> = ({
    visible,
    white = false
}) => {
    if (!visible) return null

    return (
        <UI.Container white={white}>
            <UI.Loader white={white} />
        </UI.Container>
    )
}

export default PageLoading