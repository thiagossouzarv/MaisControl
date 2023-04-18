import React from "react"
import { Highlight } from "../../core";
import { Separator } from "../../utils"

import * as UI from "./InfoLabelStyle"

interface InfoLabelProps {
   title: string;
   subtitle: string| undefined;
}

const InfoLabel: React.FC<InfoLabelProps> = ({
    title,
    subtitle
}) => {
    return (
        <UI.Container>
            <UI.Title>{title} <UI.Subtitle>{subtitle}</UI.Subtitle></UI.Title> 
        </UI.Container>
    )
}

export default InfoLabel