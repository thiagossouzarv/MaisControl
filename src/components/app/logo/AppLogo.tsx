import React from "react";
import { useTheme } from "styled-components/native"
import { AppTheme, BasicMetrics } from "../../../core/theme";
import { Avatar } from "../../ui";
import { Separator } from "../../utils";

import * as UI from "./AppLogoStyle";

const IMAGE = require("../../../assets/images/icon_simple.png")

interface AppLogoProps {
    hideIcon?: boolean,
    iconSize?: BasicMetrics,
    labelSize?: number,
    noMarging?: boolean,
}

const AppLogo: React.FC<AppLogoProps> = ({
    hideIcon = false,
    iconSize = "lg",
    labelSize = 30,
    noMarging = false,
}) => {
    const theme: AppTheme = useTheme()

    return (
        <UI.Container fit={hideIcon} noMarging={noMarging} >
            {!hideIcon &&
                <>
                    <Avatar
                        size={iconSize}
                        source={IMAGE} />
                        <Separator vertical gap="sm" />
                </>
            }
            <UI.Content>
                <UI.Title size={labelSize}>MAIS</UI.Title>
                <UI.TitleHighlight size={labelSize * .5}>Control</UI.TitleHighlight>
            </UI.Content>
        </UI.Container>
    );
}

export default AppLogo;