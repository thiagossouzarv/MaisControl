import React, { useImperativeHandle, useRef, useState } from "react"
import { useTheme } from "styled-components/native"

import * as UI from "./MessagerStyle"
import { AppModal, Separator } from "../../utils"
import Presentation from "./components/presentation/Presentation"
import Button from "../../form/button/Button"
import { AppTheme, ForegroundColors, getForegroundColor } from "../../../core/theme"
import { IconType } from "../../ui/icon/Icon"

type MessagerType = "error" | "info" | "success" | "ask" | "none"

const INFO = {
    error: {
        title: "Opps!!!",
        color: "fg:error" as ForegroundColors,
        icon: "alert-circle",
        iconSource: "feather" as IconType,
    },
    info: {
        title: "Caro Usuário!",
        color: "fg:info" as ForegroundColors,
        icon: "info",
        iconSource: "feather" as IconType,
    },
    success: {
        title: "Sucesso!",
        color: "fg:main" as ForegroundColors,
        icon: "check-circle",
        iconSource: "feather" as IconType,
    },
    ask: {
        title: "Atenção!",
        color: "fg:warn" as ForegroundColors,
        icon: "help-circle",
        iconSource: "feather" as IconType,
    },
    none: {
        title: "-",
        color: "fg:error" as ForegroundColors,
        icon: "info",
        iconSource: "feather" as IconType,
    }
}

type MessagerVariant = "default" | "full_page"

export interface MessagerHandler {
    setError: (message: string | React.ReactNode, title?: string, action?: MessagerAction, variant?: MessagerVariant) => void;
    setInfo: (message: string | React.ReactNode, title?: string, action?: MessagerAction, variant?: MessagerVariant) => void;
    setSuccess: (message: string | React.ReactNode, title?: string, action?: MessagerAction, variant?: MessagerVariant) => void;
    ask: (action: MessagerAction, variant?: MessagerVariant) => void;
}

interface MessagerProps {
    handleSubmit?: MessagerHandleSubmit,
    handleCancel?: MessagerHandleCancel,
}

const Messager = React.forwardRef<MessagerHandler, MessagerProps>(({
    handleSubmit,
    handleCancel,
}, ref) => {
    const theme: AppTheme = useTheme()

    const _action = useRef<MessagerAction>()

    const [type, setType] = useState<MessagerType>("info")
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState<string | React.ReactNode>("")
    const [customTitle, setCustomTitle] = useState<string | null>()
    const [customCancelText, setCustomCancelText] = useState<string | null>()
    const [customSubmitText, setCustomSubmitText] = useState<string | null>()
    const [variant, setVariant] = useState<MessagerVariant>("default")

    const setError = (message: string | React.ReactNode, title?: string, action?: MessagerAction, variant: MessagerVariant = "default") => {
        setType("error")
        setCustomTitle(title)
        setVariant(variant)
        _action.current = action
        open(message)
    }

    const setInfo = (message: string | React.ReactNode, title?: string, action?: MessagerAction, variant: MessagerVariant = "default") => {
        setType("info")
        setCustomTitle(title)
        setVariant(variant)
        _action.current = action
        open(message)
    }

    const setSuccess = (message: string | React.ReactNode, title?: string, action?: MessagerAction, variant: MessagerVariant = "default") => {
        setType("success")
        setCustomTitle(title)
        setVariant(variant)
        _action.current = action
        open(message)
    }

    const ask = (action: MessagerAction, variant: MessagerVariant = "default") => {
        setType("ask")
        setCustomTitle(action.title)
        setCustomSubmitText(action.submitButton)
        setCustomCancelText(action.cancelButton)
        setVariant(variant)
        _action.current = action
        open(action.message)
    }

    const open = (message: string | React.ReactNode) => {
        setMessage(message)
        setVisible(true)
    }

    const cancel = () => {
        if (handleCancel) handleCancel(type, _action.current)
        close()
    }

    const submit = () => {
        if (handleSubmit) handleSubmit(type, _action.current)
        close()
    }

    const close = () => {
        setMessage("")
        setVisible(false)
        setType("none")
        setCustomTitle(undefined)
        setCustomCancelText(undefined)
        setCustomSubmitText(undefined)
        setVariant("default")
        _action.current = undefined
    }

    useImperativeHandle(ref, (): MessagerHandler => {
        return {
            setError,
            setInfo,
            setSuccess,
            ask,
        }
    })

    const _info = INFO[type]
    const hexaColor = getForegroundColor(_info.color, theme)

    return (
        <AppModal
            visible={visible}
            transparent
            animationType={variant === "full_page" ? "slide" : "fade"}>
            <UI.Container 
                color={hexaColor}
                variant={variant}>
                <UI.Content color={variant === "full_page" ? hexaColor : "white"}>
                    <UI.Header>
                        <Presentation 
                            color={variant === "full_page" ? "rgba(255,255,255,0.6)" : _info.color}
                            icon={_info.icon}
                            iconSource={_info.iconSource} />
                        <UI.Title color={variant === "full_page" ? "white" : hexaColor}>{customTitle || _info.title}</UI.Title>
                    </UI.Header>

                    <UI.Body>
                        <UI.Label variant={variant}>{message}</UI.Label>
                    </UI.Body>

                    <UI.Footer>
                        <Button
                            grow
                            variant={variant === "full_page" && type !== "ask" ? "dashed" : "default"}
                            type={variant === "full_page" ? "basic" : "submit"}
                            onClick={submit}
                            labelColor={variant === "full_page" && type !== "ask" ? "white" : undefined}
                            borderColor={variant === "full_page" && type !== "ask" ? "white" : undefined}>
                            {customSubmitText ? customSubmitText : "OK"}
                        </Button>

                        {type === "ask" &&
                            <>
                                <Separator gap="md" />
                                <Button
                                    grow
                                    variant="dashed"
                                    type="basic"
                                    onClick={cancel}
                                    labelColor={variant === "full_page" ? "white" : undefined}
                                    borderColor={variant === "full_page" ? "white" : undefined}>
                                    {customCancelText ? customCancelText : "Cancelar"}
                                </Button>
                            </>
                        }
                        <Separator gap="md" />
                    </UI.Footer>
                </UI.Content>
            </UI.Container>
        </AppModal>
    )

})

export const MessagerLabel: React.FC<MessagerLabelProps> = ({
    children
}) => {
    return <UI.Label>{children}</UI.Label>
}

export function getAction(
    code: string,
    message: string | React.ReactNode,
    title?: string,
    cancelButton?: string,
    submitButton?: string,
): MessagerAction {
    return {
        code,
        message,
        title,
        cancelButton,
        submitButton,
    }
}


interface MessagerLabelProps {
    children: string | React.ReactNode
}

export interface MessagerAction {
    code: string,
    title?: string,
    message: string | React.ReactNode,
    cancelButton?: string,
    submitButton?: string,
}

export type MessagerHandleSubmit = (messageType: MessagerType, action?: MessagerAction) => void
export type MessagerHandleCancel = (messageType: MessagerType, action?: MessagerAction) => void

export default Messager