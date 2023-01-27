import React, {FC, useState} from 'react';
import './UploadCard.css';
import {FiTrash2} from "react-icons/fi";
import successIcon from "../../assets/svg/success_icon.svg";
import {UploadedFileModel} from "../../models/uploadedFile.model";

interface UploadCardProps {
    uploadedFiles: UploadedFileModel[];
    typologySelectedEvent: (uploadedFiles: UploadedFileModel[]) => void;
}

const UploadCard: FC<UploadCardProps> = ({uploadedFiles, typologySelectedEvent}) => {

    const [selectedTypologies, setSelectedTypologies] = useState(uploadedFiles.map(() => false));

    return (
        <>
            {
                uploadedFiles.map((uploadedFile, i) => (
                    <div key={i} className="upload-container p-3 mt-5 mb-5">
                        <div className="d-flex justify-between">
                            <div className="d-flex gap-4 align-center">
                                <div className="document-icon"></div>
                                <p className="dark-grey">{uploadedFile.name}</p>
                            </div>
                            <div className="d-flex align-center gap-3 dark-grey">
                                <p>View details</p>
                                <p>|</p>
                                <FiTrash2 />
                            </div>
                        </div>
                        <div className="d-flex mt-3">
                            <div className="d-flex flex-row">
                                <select id="upload" className="custom-input custom-select input-xlg light-grey" placeholder="Seleziona tipologia file" defaultValue={""}
                                        onChange={event => {
                                            uploadedFile.type = event.target.value;
                                            selectedTypologies[i] = event.target.value !== "";
                                            setSelectedTypologies([...selectedTypologies]);
                                            typologySelectedEvent(uploadedFiles);
                                        }}>
                                    <option value="">Seleziona tipologia di file</option>
                                    <option value="1" >Richiesta di inserimento nell’albo su carta intestata del fornitore</option>
                                </select>
                                <img width="24" className="ml-4" src={successIcon} alt="uploaded" hidden={!selectedTypologies[i]} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
)};

export default UploadCard;
