import React, {FC, ReactNode, useLayoutEffect} from 'react';
import './CustomModal.css';
import Button from "../Button/Button";

interface CustomModalProps {
    children: ReactNode;
    show: boolean;
    btnColor: string;
    btnText: string,
    btnTextColor: string;
    btnWidth: string;
    btnDisabled: boolean;
    onClose: () => void;
    onUpload: () => void
}

const CustomModal: FC<CustomModalProps> = ({ children, show, btnColor, btnText,
                                             btnTextColor, btnWidth, btnDisabled, onClose, onUpload }) => {

    if (!show) {
        return null;
    } else {
        document.body.style.overflowY = 'hidden';
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-footer mr-3">
                    <Button color={btnColor} text={btnText} textColor={btnTextColor} btnWidth={btnWidth} onClick={() => {
                        onUpload();
                        document.body.style.overflowY = 'scroll';
                    }} disabled={btnDisabled} />
                </div>
            </div>
        </div>
    )
};

export default CustomModal;
