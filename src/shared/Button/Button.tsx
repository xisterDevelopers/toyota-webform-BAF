import React, {FC, MouseEventHandler} from 'react';
import './Button.css';

interface ButtonProps {
    color: string;
    text: string;
    textColor: string;
    btnWidth: string;
    disabled: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement | undefined>;
}

const Button: FC<ButtonProps> = ({color,text,textColor,btnWidth, disabled, onClick}) => {
    return(
        <button className={color + ' ' + textColor + ' shared-btn'} style={{width: btnWidth}} onClick={onClick} disabled={disabled}>{text}</button>
    );
};

export default Button;
