import React, {FC, useLayoutEffect, useState} from 'react';
import './DetailBAF.css';
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../shared/Button/Button";
import Banner from "../../shared/Banner/Banner";
import UploadFile from "../../shared/UploadFile/UploadFile";
import {UploadedFileModel} from "../../models/uploadedFile.model";
import SupplierIdentificationDetail from "./SupplierIdentificationDetail/SupplierIdentificationDetail";
import SupplierBankDetailsDetail from "./SupplierBankDetailsDetail/SupplierBankDetailsDetail";
import {SupplierIdentificationDetailModel} from "../../models/supplierIdentificationDetail.model";
import formService from "../../api/form.service";
import {SupplierBankDetailsDetailModel} from "../../models/supplierBankDetailsDetail.model";
import {useGlobalContext} from "../../utils/AppContext";

const MAX_FILE_SIZE: number = 5E+6;

interface DetailBafProps {}

const DetailBaf: FC<DetailBafProps> = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {formState, setFormState} = useGlobalContext();

    const [uploadFiles, setUploadFiles] = useState<UploadedFileModel[]>([ ]);
    const [supplierIdentificationDetail, setSupplierIdentificationDetail] = useState<SupplierIdentificationDetailModel>({ });
    const [bankDetailsDetail, setBankDetailsDetail] = useState<SupplierBankDetailsDetailModel>({ });

    useLayoutEffect(() => {
        const form = formService.getById(Number(id));

        if (form !== undefined) {
            setSupplierIdentificationDetail(form.identification);
            setBankDetailsDetail(form.bankDetails);
        }
    }, [])

    const preventDefaults = (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        preventDefaults(event);

        for (let i = 0; i < event.dataTransfer.files.length; i++) {
            if (event.dataTransfer.files[i].size < MAX_FILE_SIZE) {
                uploadFiles.push({ name: event.dataTransfer.files[i].name, type: "" });
            } else {
                //TODO: gestione validazione dimensione massima file
                console.error('Dimensione massima superata');
            }
        }

        setUploadFiles([...uploadFiles]);
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        preventDefaults(event);

        if (event.target.files) {
            for (let i = 0; i < event.target.files.length; i++) {
                if (event.target.files[i].size < MAX_FILE_SIZE) {
                    uploadFiles.push({ name: event.target.files[i].name, type: "" });
                } else {
                    //TODO: gestione validazione dimensione massima file
                    console.error('Dimensione massima superata');
                }
            }

            setUploadFiles([...uploadFiles]);
        }
    }

    return(
        <div className="DetailBAF ml-5">
            {
                formState === 'wating for supplier pec' ?
                    <div>
                        <p className="mt-5 mb-4"><strong>Se hai bisogno di comunicare modifiche rispetto ai tuoi dati personali procedi modificando i campi nella form.</strong></p>
                        <Button color="bg-red" text="Edit form" textColor="white" btnWidth="151px" disabled={false} onClick={() => {
                            setFormState('supplier pending');
                            navigate(`/upsert-BAF/${id}`);
                        }} />
                        <p className="my-5">oppure:</p>
                        <Banner stroke="border-orange" fill="bg-light-orange" icon="warning" content={
                            <div>
                                <p><strong>Attenzione! Per completare la registrazione dovrai inviare una PEC allegando i documenti richiesti.</strong></p>
                                <p>Segui i seguenti passaggi:</p>
                                <ul>
                                    <li>Scarica il form compilato</li>
                                    <li>
                                        Raccogli i seguenti documenti:
                                        <ul className="filled-wrapped-ul pl-4-5">
                                            <li>Doc 1</li>
                                            <li>Doc 2</li>
                                            <li>Doc 3 ...</li>
                                        </ul>
                                    </li>
                                    <li>Invia tramite PEC all’indirizzo <strong>toyotamotoritalia@legalmail.it</strong> allegando i documenti richiesti e il form compilato</li>
                                    <li>Carica la ricevuta dell’invio della PEC e conferma</li>
                                </ul>
                            </div>
                        } />
                        <p className="mt-5 mb-4"><strong>Scarica il documento compilato e allegalo alla PEC.</strong></p>
                        <div className="mb-5">
                            <Button color="bg-red" text="Scarica" textColor="white" btnWidth="110px" disabled={false} />
                        </div>
                        <p className="inline-flex"><strong>Carica qui la ricevuta della PEC e conferma</strong></p>
                        <div className="mt-5 w-100 inline-flex">
                            <UploadFile handleDrop={event => handleDrop(event)} upload={event => handleUpload(event)} overrideEventDefaults={event => preventDefaults(event)} />
                        </div>
                        <div className="d-flex justify-end my-5">
                            <Button color="bg-red" text="Submit" textColor="white" btnWidth="133px" disabled={!(uploadFiles.length > 0)} />
                        </div>
                        <hr className="break-line mb-5 mt-6" />
                    </div> : ''
            }
            {
                formState === 'Check pending' ?
                    <div>
                        <Banner stroke="border-grey" fill="bg-light-grey" icon="clock" content={
                            <div>
                                <p><strong>I tuoi dati sono in attesa di verifica.</strong> Al momento le informazioni non possono essere modificate.</p>
                            </div>
                        } />
                    </div> : ''
            }
            {
                formState === 'registered' ?
                    <div>
                        <Banner stroke="border-green" fill="bg-light-green" icon="done" content={
                            <div>
                                <p><strong>Complimenti!</strong> Da oggi sei un nostro partner.</p>
                            </div>
                        } />
                    </div> : ''
            }
            <SupplierIdentificationDetail model={supplierIdentificationDetail} />
            <hr className="break-line mb-5 mt-6" />
            <SupplierBankDetailsDetail model={bankDetailsDetail} />
            <hr className="break-line mb-5 mt-6" />
        </div>
    );
};

export default DetailBaf;
