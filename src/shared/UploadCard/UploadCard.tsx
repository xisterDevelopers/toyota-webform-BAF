import React, {FC, ReactNode, useState} from 'react';
import './UploadCard.css';
import {FiTrash2} from "react-icons/fi";
import successIcon from "../../assets/svg/success_icon.svg";
import {UploadedFileModel} from "../../models/uploadedFile.model";
import db from "../../utils/db.json";
import Button from "../Button/Button";

interface UploadCardProps {
    uploadedFile: UploadedFileModel;
    selectedTypology: string;
    status: string;
    typologySelectedEvent: (uploadedFiles: UploadedFileModel) => void;
    updateTypology: () => void;
}

const  UploadCard: FC<UploadCardProps> = ({uploadedFile, selectedTypology, status ,  typologySelectedEvent, updateTypology}) => {

    const [type, setType] = useState<string>(uploadedFile.type);
    const types = [...db.requiredFileTypes, ...db.integrativeFiles];
    const [showButtons, setShowButtons] = useState<boolean>(false);

    let selectRef: HTMLSelectElement | null = null;

    return (
        <div className={(type === "" ? "upload-container": "selected-type-upload-container") + " p-3 mt-5 mb-5"}>
            <div className="d-flex justify-between">
                <div className="d-flex gap-4 align-center">
                    <div className="document-icon"></div>
                    <p className="dark-grey">{uploadedFile.name}</p>
                </div>
                <div className="d-flex align-center gap-3 dark-grey">
                    <FiTrash2 />
                </div>
            </div>
            <div className="d-flex mt-3">
                <div className="d-flex flex-row">
                    <select id="upload" className="custom-input custom-select input-xlg light-grey"
                            placeholder="Seleziona tipologia file" defaultValue={uploadedFile.type} ref={ref => selectRef = ref}
                            onChange={event => {
                                setType(event.target.value);
                                typologySelectedEvent({
                                    name: uploadedFile.name,
                                    type: event.target.value
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
                            <div className="d-flex flex-row gap-3 ml-5">
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
