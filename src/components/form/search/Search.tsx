import React from "react"
import Input, { InputProps } from "../input/Input"

import * as UI from "./SearchStyle"

interface SearchProps extends InputProps {
   
}

const Search: React.FC<SearchProps> = ({
    ...inputProps
}) => {
    return (
        <UI.Container>
            <Input {...inputProps} />
        </UI.Container>
    )
}

export default Search