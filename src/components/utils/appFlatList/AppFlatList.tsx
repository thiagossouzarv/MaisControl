import React, { useCallback, useImperativeHandle, useRef } from "react"
import { FlatListProps, FlatList } from "react-native"
import UIUtils from "../../../utils/ui"

export interface AppFlatListHandler {
    scrollToTop: () => void
}

interface AppFlatListProps extends FlatListProps<any> {

}

const AppFlatList = React.forwardRef<AppFlatListHandler, AppFlatListProps>((props, ref) => {
    const _lista = useRef<FlatList<any>>()

    const scrollToTop = useCallback(() => {
        UIUtils.scrollFlatlistToTop(_lista.current)
    }, [])

    useImperativeHandle(ref, (): AppFlatListHandler => {
        return {
            scrollToTop
        }
    })
    
    return (
        <FlatList
            ref={_lista}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            {...props} />
    )
})

export default AppFlatList