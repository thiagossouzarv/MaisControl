import React from "react"
import { Modal, ModalProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const AppModal: React.FC<ModalProps> = ({
    children,
    ...props
}) => {
    return (
        <Modal
            {...props}>
            <SafeAreaView style={{ flex: 1 }}>
                {children}
            </SafeAreaView>
        </Modal>
    )
}

export default AppModal