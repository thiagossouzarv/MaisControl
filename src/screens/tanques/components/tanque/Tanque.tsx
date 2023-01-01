import React, { useState } from "react"
import { Icon, ListItem } from "react-native-elements";
import Item from "../item/Item";

import * as UI from "./TanqueStyle"

interface TanqueProps {

}

const Tanque: React.FC<TanqueProps> = ({ }) => {
    const [expanded, setExpanded] = useState(true)

    return (
        <ListItem.Accordion
            content={
                <>
                    {/* <Icon name="place" size={30} /> */}
                    <ListItem.Content>
                        <UI.Title>Tanque Recanto do Bosque</UI.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            {/* <Item />
            <Item /> */}
        </ListItem.Accordion>
    );
}

export default Tanque