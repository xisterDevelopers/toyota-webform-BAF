import React, { FC } from 'react';
import './Button.css';

interface ButtonProps {
    color: string;
    text: string;
    textColor: string;
    btnWidth: string;
}

const Button: FC<ButtonProps> = ({color,text,textColor,btnWidth}) => {
    return(
        <button className={color + ' ' + textColor + ' shared-btn'} style={{width: btnWidth}}>{text}</button>
    );
};

export default Button;
