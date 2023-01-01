import React, { useImperativeHandle, useMemo, useState } from "react"
import styled from "styled-components/native"
import { useTheme } from "styled-components/native"
import { AppTheme, BasicMetrics, ForegroundColors, ThemeObject } from "../../../../core/theme";
import Icon, { IconType } from "../../../ui/icon/Icon";

import * as UI from "./ListItemStyle"
import { ImageSourcePropType } from "react-native";
import { Avatar } from "../../../ui";
import { Caption1, Caption2, Subtitle2 } from "../../../core";
import MidiaUtils, { ImagePlaceholder } from "../../../../utils/midia";
import { BoxLoading } from "../../../utils";

export interface ListItemHandler {
    setToggle(currentValue: boolean): boolean
}

export interface ListItemProps {
    children?: React.ReactNode
    title?: string
    subtitle?: string
    detail?: string
    bottomDivider?: boolean
    topDivider?: boolean
    icon?: string
    iconSource?: IconType
    iconColor?: ForegroundColors
    avatarURI?: ImageSourcePropType | string
    avatarExternalURI?: boolean
    avatarPlaceholder?: ImagePlaceholder
    avatarSize?: BasicMetrics
    avatarRounded?: boolean
    onPress?: (item?: any, checked?: boolean) => void
    onLongPress?: () => void
    disabled?: boolean
    beginChecked?: boolean
    containerStyle?: object
    variant?: "toggle" | "default"
    selected?: boolean
    dataItem?: any
    loading?: booean
    loadingLabel?: string
}

const ListItem = React.forwardRef<ListItemHandler, ListItemProps>(({
    children,
    title,
    subtitle,
    detail,
    bottomDivider = true,
    topDivider = false,
    icon,
    iconColor,
    iconSource,
    avatarURI,
    avatarExternalURI,
    avatarPlaceholder,
    avatarSize = "sm",
    avatarRounded = true,
    onPress,
    onLongPress,
    disabled = false,
    beginChecked = false,
    containerStyle = {},
    variant = "default",
    selected = false,
    dataItem,
    loading = false,
    loadingLabel = "carregando..."
}, ref) => {
    const theme: AppTheme = useTheme()

    const [toggle, setToggle] = useState(beginChecked)

    const handlePress = () => {
        if (!onPress || disabled) return

        onPress(dataItem, !toggle)
        if (variant == "toggle") setToggle(val => !val)
    }

    const handleLongPress = () => {
        if (!onLongPress || disabled) return

        onLongPress()
    }

    useImperativeHandle(ref, () => {
        return {
            setToggle
        } as ListItemHandler
    })

    const avatar = useMemo(() => {
        if (!avatarURI && !avatarPlaceholder) return null
        return MidiaUtils.getURLImage(avatarURI as any, avatarPlaceholder || "picture", avatarExternalURI || false)
    }, [avatarURI, avatarPlaceholder])


    return (
        <UI.Container
            style={({ pressed }: any) => ({ backgroundColor: theme.list.item.bg[(pressed && !disabled && !!onPress) ? "pressed" : selected ? "selected" : "default"] })}
            onPress={handlePress}
            onLongPress={handleLongPress}>
            {({ pressed }: any) => (
                <>
                    {!!avatar && !icon &&
                        <UI.AvatarContainer>
                            <Avatar
                                source={avatar}
                                size={avatarSize}
                                rounded={avatarRounded}
                                containerStyle={{
                                    opacity: onPress && pressed ? 0.6 : 1,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                }} />
                        </UI.AvatarContainer>
                    }
                    {!!icon &&
                        <UI.IconContainer>
                            <Icon
                                icon={icon}
                                iconSource={iconSource}
                                color={iconColor || "fg:light"}
                                iconSize={theme.metrics.icon.sm} />
                        </UI.IconContainer>
                    }
                    <UI.Main>
                        {topDivider && <UI.Divider />}
                        <UI.Content style={[{
                            paddingLeft: !icon && !avatar ? theme.list.item.padding.horizontal : 0
                        }, containerStyle]}>
                            <UI.InnerContent>
                                {!!title ?
                                    <>
                                        {!!title && <ListItemTitle>{title}</ListItemTitle>}
                                        {!!subtitle && <ListItemSubtitle>{subtitle}</ListItemSubtitle>}
                                        {!!detail && <ListItemInfo>{detail}</ListItemInfo>}
                                    </> :
                                    children
                                }
                            </UI.InnerContent>
                            {variant === "toggle" &&
                                <UI.Toggle
                                    disabled={true}
                                    onValueChange={setToggle}
                                    value={toggle} />
                            }

                            {selected && <UI.SelectedMarker />}
                        </UI.Content>

                        {bottomDivider && <UI.Divider gapMode={icon || avatar ? "right" : "both"} />}
                    </UI.Main>
                    
                    {loading &&
                        <BoxLoading
                            label={loadingLabel}
                            visible={loading}
                            transparent={false}
                            size="md" />
                    }
                </>)}
        </UI.Container>
    )
})

export const ListItemTitle = styled.Text`
    font-family: ${({ theme }: ThemeObject) => theme.list.item.title.family};
    font-size: ${({ theme }: ThemeObject) => theme.list.item.title.size}px;
    color: ${({ theme }: ThemeObject) => theme.list.item.title.fg};
    font-weight: ${({ theme }: ThemeObject) => theme.list.item.title.weight};
`

export const ListItemTitle2 = styled(Subtitle2)`
    font-weight: bold;
`

export const ListItemTitle3 = styled(Caption1)`
    font-weight: bold;
    color: ${({ theme }: ThemeObject) => theme.colors.fg.dark};
`

export const ListItemSubtitle = styled.Text`
    font-family: ${({ theme }: ThemeObject) => theme.list.item.subtitle.family};
    font-size: ${({ theme }: ThemeObject) => theme.list.item.subtitle.size}px;
    color: ${({ theme }: ThemeObject) => theme.list.item.subtitle.fg};
    font-weight: ${({ theme }: ThemeObject) => theme.list.item.subtitle.weight};
`

export const ListItemSubtitle2 = styled(Caption2)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.dark};
`

export const ListItemSubtitle3 = styled(ListItemSubtitle2)`
    font-size: ${({ theme }: ThemeObject) => theme.fonts.c2.size * .9}px;
`

export const ListItemInfo = styled(Caption1)``

export const ListItemInfo2 = styled(Caption2)``

export const ListItemInfo3 = styled(Caption2)`
    font-size: ${({ theme }: ThemeObject) => theme.fonts.c2.size * .8}px;
`

export default React.memo(ListItem)