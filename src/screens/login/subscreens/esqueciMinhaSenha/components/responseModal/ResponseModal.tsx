import React from "react";
import { Button } from "../../../../../../components/form";
import { StatusIcon } from "../../../../../../components/ui";
import { AppModal, Separator } from "../../../../../../components/utils";
import InfoUtils from "../../../../../../utils/info";

import * as UI from "./ResponseModalStyle"

interface ResponseModalProps {
    email: string | null,
    handleSubmit: () => void
}

const ResponseModal: React.FC<ResponseModalProps> = ({ email, handleSubmit }) => {

    return (
        <AppModal
            visible={!!email}
            animationType="slide">
            <UI.Container>
                <UI.StatusContainer>
                    <StatusIcon type="success" />
                </UI.StatusContainer>

                <UI.Message>O link de acesso foi enviado para:</UI.Message>

                <Separator />

                <UI.MailContainer>
                    <UI.Mail>{InfoUtils.shuffleEmail(email || "")}</UI.Mail>
                </UI.MailContainer>

                <Separator />

                <Button
                    rounding
                    type="basic"
                    onClick={handleSubmit}>
                    Voltar
                </Button>
            </UI.Container>
        </AppModal>
    )
}

export default ResponseModal