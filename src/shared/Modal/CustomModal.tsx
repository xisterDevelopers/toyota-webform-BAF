import React, {FC, ReactNode} from 'react';
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

const CustomModal: FC<CustomModalProps> = ({ children, show, btnColor, btnText, btnTextColor, btnWidth, btnDisabled, onClose, onUpload }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="scrollable-modal">
                    <div className="modal-content">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <Button color={btnColor} text={btnText} textColor={btnTextColor} btnWidth={btnWidth} onClick={onUpload} disabled={btnDisabled} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CustomModal;
