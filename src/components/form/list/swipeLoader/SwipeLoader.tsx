import React from "react"
import { RefreshControl, RefreshControlProps } from "react-native"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../../core/theme"

interface SwipeLoaderListProps extends RefreshControlProps {

}

const SwipeLoaderList: React.FC<SwipeLoaderListProps> = ({
    ...props
}) => {
    const theme: AppTheme = useTheme()

    return (
        <RefreshControl
            {...props}
            colors={[theme.colors.main]} />
    )
}

export default SwipeLoaderList