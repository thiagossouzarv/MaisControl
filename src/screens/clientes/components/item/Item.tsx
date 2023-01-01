import React, { useCallback } from "react"
import { useTheme } from "styled-components/native"

import { AppTheme } from "../../../../core/theme"
import { ListItem } from "../../../../components/form"
import { Cliente } from "../../../../services/core/auth"

interface ItemProps {
   onPress: (cliente: Cliente) => void,
   cliente: Cliente
}

const Item: React.FC<ItemProps> = ({  
    onPress,
    cliente
}) => {
    const theme: AppTheme = useTheme()

    const handlePress = useCallback(() => {
        onPress(cliente)
    }, [onPress, cliente])

    return (
        <ListItem
            onPress={handlePress}
            icon="account-outline"
            iconSource="material-community"
            iconColor="fg:error"
            title={cliente.NomeFantasia}
            subtitle={cliente.Nome || cliente.RazaoSocial} />
    )
}

export default React.memo(Item)