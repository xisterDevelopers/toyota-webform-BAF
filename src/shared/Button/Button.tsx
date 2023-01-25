import React, {FC, MouseEventHandler} from 'react';
import './Button.css';

interface ButtonProps {
    color: string;
    text: string;
    textColor: string;
    btnWidth: string;
    onClick?: MouseEventHandler<HTMLButtonElement | undefined>;
}

const Button: FC<ButtonProps> = ({color,text,textColor,btnWidth, onClick}) => {
    return(
        <button className={color + ' ' + textColor + ' shared-btn'} style={{width: btnWidth}} onClick={onClick}>{text}</button>
    );
};

export default Button;
