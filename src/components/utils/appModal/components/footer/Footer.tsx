import React from "react"
import { Grow } from "../../../../core"
import ButtonBasic from "../../../../form/buttonBasic/ButtonBasic"
import Separator from "../../../separator/Separator"

import * as UI from "./FooterStyle"

interface FooterProps {
    handleCancel: () => void
    handleSubmit: () => void
    extraButton?: string
    extraButtonSubmit?: () => void
}

const Footer: React.FC<FooterProps> = ({
    handleCancel,
    handleSubmit,
    extraButton,
    extraButtonSubmit
}) => {
    return (
        <UI.Container>
            {!!extraButton && !!extraButtonSubmit &&
                <>
                    <ButtonBasic
                        label={extraButton}
                        onPress={extraButtonSubmit}
                        color="fg:main"
                        horizontalFlat />
                    <Grow />
                </>
            }
            <ButtonBasic
                label="Cancelar"
                onPress={handleCancel}
                color="fg:light"
                horizontalFlat />

            <Separator vertical gap="lg" />

            <ButtonBasic
                label="OK"
                onPress={handleSubmit}
                horizontalFlat />
        </UI.Container>
    )
}

export default React.memo(Footer)