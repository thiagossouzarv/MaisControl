import React from "react"
import { Highlight } from "../../core";
import { Separator } from "../../utils"

import * as UI from "./InfoHeaderStyle"

interface InfoHeaderProps {
   title: string;
   titleHighlight?: string;
   subtitle: string;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({
    title,
    titleHighlight,
    subtitle
}) => {
    return (
        <UI.Container>
            <Separator gap="xl" />
            <UI.Title>{title}{!!titleHighlight && <Highlight> {titleHighlight}</Highlight>}</UI.Title>
            <UI.Subtitle>{subtitle}</UI.Subtitle>
            <Separator gap="xl" gapFactor={1.1} />
        </UI.Container>
    )
}

export default InfoHeader