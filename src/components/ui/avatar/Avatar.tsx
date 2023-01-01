import React from "react"
import { useTheme } from "styled-components/native"
import { Avatar as Image, AvatarProps as ImageProps } from "react-native-elements"
import { AppTheme, BasicMetrics } from "../../../core/theme"

import * as UI from "./AvatarStyle"

interface AvatarProps extends ImageProps  {
    size: BasicMetrics,
    sizeMultiplier?: number,
}

const Avatar: React.FC<AvatarProps> = ({
    size,
    sizeMultiplier = 1,
    ...imageProps
}) => {
    const theme: AppTheme = useTheme()

    return (
        <UI.Container>
            <Image
                size={theme.metrics.image[size] * sizeMultiplier}
                {...imageProps} />
        </UI.Container>
    )
}

export default Avatar