import React from "react"
import Icon, { IconType } from "../../ui/icon/Icon"
import StepIndicator from 'react-native-step-indicator'
import * as UI from "./StepIndicatorStyle"


interface StepIndicatorProps {
    currentPosition?: number
    labels?: string[],
    stepCount?: number,
}

const StepIndicatorCustom: React.FC<StepIndicatorProps> = ({
    currentPosition,
    labels,
    stepCount
}) => {
    return (
        <UI.Container>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={stepCount}
            />
        </UI.Container>
    )
}

export default StepIndicatorCustom


const customStyles  = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#B73B3D',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#B73B3D',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#B73B3D',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#B73B3D',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#B73B3D',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#4A4A4A',
    labelSize: 13,
    currentStepLabelColor: '#B73B3D'
  }