import React from "react"
import { useTheme } from "styled-components/native"
import { ListItemProps } from "../../../../components/form"
import { Icon, IconType } from "../../../../components/ui"
import { Separator } from "../../../../components/utils"
import { AppTheme } from "../../../../core/theme"

import * as UI from "./ItemStyle"

interface ItemProps extends ListItemProps {}

const Item: React.FC<ItemProps> = ({
    children,
    ...listItemProps
}) => {
    const theme: AppTheme = useTheme()

    return (
        <UI.Container {...listItemProps}>            
            <Separator vertical gap="md" gapFactor={1.3} />
            <UI.Label>{children}</UI.Label>
        </UI.Container>
    )
}

export default Item