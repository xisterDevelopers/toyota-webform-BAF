import React, { FC } from 'react';
import './UploadCard.css';
import {FiTrash2} from "react-icons/fi";

interface UploadCardProps {}

const UploadCard: FC<UploadCardProps> = () => (
    <div className="upload-container p-3 mt-5 mb-5">
        <div className="d-flex justify-between">
            <div className="d-flex gap-4 align-center">
                <div className="document-icon"></div>
                <p className="dark-grey">Ipsum.pdf</p>
            </div>
            <div className="d-flex align-center gap-3 dark-grey">
                <p>View details</p>
                <p>|</p>
                <FiTrash2 />
            </div>
        </div>
        <div className="d-flex mt-3">
            <div className="d-flex flex-column">
                <select id="upload" className="custom-input custom-select input-xlg light-grey" placeholder="Seleziona tipologia file">
                    <option value="" disabled selected>Seleziona tipologia di file</option>
                </select>
            </div>
        </div>
    </div>
);

export default UploadCard;
