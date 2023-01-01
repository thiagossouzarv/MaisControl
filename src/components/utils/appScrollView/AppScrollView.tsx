import React from "react"
import { RefreshControlProps, ScrollView } from "react-native"

interface AppScrollViewProps {
    children: React.ReactNode,
    refreshControl?: React.ReactElement<RefreshControlProps, string | React.JSXElementConstructor<any>> | undefined
}

const AppScrollView: React.FC<AppScrollViewProps> = ({
    children,
    ...props
}) => {
    return (
        <ScrollView 
            {...props}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    )
}

export default AppScrollView