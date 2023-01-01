import { useCallback, useEffect, useRef } from "react"

const useTrackingMounting = () => {
    const isComponentMount = useRef(true)

    useEffect(() => {
        isComponentMount.current = true

        return () => {
            isComponentMount.current = false
        }
    }, [])

    const execSafe = useCallback((action: Function) => {
        if (typeof action === "function" && isComponentMount.current)
            return action()
    }, [isComponentMount.current])

    return { isComponentMount: isComponentMount, execSafe }
}

export default useTrackingMounting