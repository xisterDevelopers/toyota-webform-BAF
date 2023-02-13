import React, {FC, useState} from 'react';
import './UploadCard.css';
import {FiTrash2} from "react-icons/fi";
import db from "../../utils/db.json";
import Button from "../Button/Button";
import {UpdateFileRequestDTO} from "../../models/UpdateFileRequestDTO.model";

interface UploadCardProps {
    uploadedFile: UpdateFileRequestDTO;
    selectedTypology: string;
    status: string;
    spacing: string;
    typologySelectedEvent: (uploadedFiles: UpdateFileRequestDTO) => void;
    updateTypology: () => void;
    deleteFile: () => void;
}

const  UploadCard: FC<UploadCardProps> = ({uploadedFile, selectedTypology, status, spacing, typologySelectedEvent, updateTypology, deleteFile}) => {

    const [type, setType] = useState<string>(uploadedFile.bafDocumentType !== undefined ? uploadedFile.bafDocumentType : "");
    const types = [
        ...db.requiredFileTypes,
        ...db.integrativeFiles,
        ...db.integrativeFilesHighRisk,
        ...db.integrativeFilesLowRisk,
        ...db.integrativeFilesHighLowRisk
    ];
    const [showButtons, setShowButtons] = useState<boolean>(false);

    let selectRef: HTMLSelectElement | null = null;

    return (
        <div className={(type === "" ? "upload-container": "selected-type-upload-container") + spacing}>
            <div className="d-flex justify-between">
                <div className="d-flex gap-4 align-center overflow">
                    <div className="document-icon"></div>
                    <p className="dark-grey overflow">{uploadedFile.fileName}</p>
                </div>
                <div className="d-flex align-center gap-3 dark-grey">
                    <FiTrash2 onClick={() => deleteFile()} cursor="pointer" />
                </div>
            </div>
            <div className="d-flex mt-3">
                <div id="selectButtonsContainer" className="d-flex flex-row w-100">
                    <select id="upload" className="custom-input custom-select input-xlg w-100 light-grey"
                            placeholder="Seleziona tipologia file"
                            defaultValue={selectedTypology} ref={ref => selectRef = ref}
                            onChange={event => {
                                setType(event.target.value);
                                typologySelectedEvent({
                                    fileName: uploadedFile.fileName,
                                    bafDocumentType: event.target.value
                                });
                                setShowButtons(status !== "modal")
                            }}>
                        <option value="">Selezionare la tipologia del file...</option>
                        {
                            types.map((selectableType, i) => {
                                return (
                                    <option key={i} value={selectableType.type}>{selectableType.type}</option>
                                )
                            })
                        }
                    </select>
                    {
                        showButtons ? (
                            <div id="buttonsContainer" className="d-flex gap-3 ml-5">
                                <Button color={"bg-light-grey"} text={"Annulla"} textColor={"dark-grey"} btnWidth={"151px"}
                                        disabled={false} onClick={() => {
                                            if (selectRef) {
                                                if (selectedTypology) {
                                                    for (let i = 0; i < selectRef.options.length; i++) {
                                                        if (selectRef.options[i].value === selectedTypology) {
                                                            selectRef.selectedIndex = i;
                                                        }
                                                    }
                                                } else {
                                                    selectRef.selectedIndex = 0;
                                                    setType("");
                                                }
                                                setShowButtons(false);
                                            }
                                        }} />
                                <Button color={"bg-red"} text={"Applica"} textColor={"white"} btnWidth={"151px"}
                                        disabled={false} onClick={() => {
                                            setShowButtons(false);
                                            updateTypology();
                                        }} />
                            </div>
                        ) : ""
                    }
                </div>
            </div>
        </div>
)};

export default UploadCard;
