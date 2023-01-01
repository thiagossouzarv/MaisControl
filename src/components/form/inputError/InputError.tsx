import React from "react";

import * as UI from "./InputErrorStyle";

interface InputErrorProps {
    error?: string | null | undefined;
};

const InputError: React.FC<InputErrorProps> = ({
    error,
}) => {
    const hasError = !!error?.length;

    return (
        <UI.ErrorContainer error={hasError}>
            <UI.ErrorText>* {error}!</UI.ErrorText>
        </UI.ErrorContainer>
    );
};

export default InputError;