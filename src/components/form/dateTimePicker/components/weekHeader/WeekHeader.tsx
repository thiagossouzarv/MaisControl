import React from "react"
import { Pressable } from "react-native"
import { Separator } from "../../../../utils"
import Item from "./components/item/Item"

import * as UI from "./WeekHeaderStyle"

const WEEK_DAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]

interface WeekHeaderProps {

}

const WeekHeader: React.FC<WeekHeaderProps> = ({ }) => {
    return (
        <Pressable>
            <UI.Container>
                {WEEK_DAYS.map(day => (
                    <Item
                        day={day}
                        key={day} />
                ))}
            </UI.Container>
            <Separator gap="sm" />
        </Pressable>
    )
}

export default React.memo(WeekHeader)