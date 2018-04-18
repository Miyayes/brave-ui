/// <reference types="react" />
import * as React from 'react';
export interface SwitchButtonProps {
    checked: boolean;
    disabled?: boolean;
    onChange?: (e: any) => void;
    id: string;
    readOnly?: boolean;
    autoFocus?: boolean;
    leftText?: string;
    rightText?: string;
    small?: boolean;
}
export interface SwitchButtonState {
    checked?: boolean;
}
declare class SwitchButton extends React.PureComponent<SwitchButtonProps, SwitchButtonState> {
    constructor(props: SwitchButtonProps);
    componentWillReceiveProps(nextProps: SwitchButtonProps): void;
    handleChange(e: any): void;
    render(): JSX.Element;
}
export default SwitchButton;
