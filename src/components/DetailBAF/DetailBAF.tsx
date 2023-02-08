import React, {FC, useLayoutEffect, useState} from 'react';
import './DetailBAF.css';
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../shared/Button/Button";
import Banner from "../../shared/Banner/Banner";
import UploadFile from "../../shared/UploadFile/UploadFile";
import SupplierIdentificationDetail from "./SupplierIdentificationDetail/SupplierIdentificationDetail";
import SupplierBankDetailsDetail from "./SupplierBankDetailsDetail/SupplierBankDetailsDetail";
import formService from "../../api/form.service";
import {useGlobalContext} from "../../utils/AppContext";
import success_dot from "../../assets/svg/success_icon.svg";
import dot from "../../assets/svg/simple_dot.svg";
import {FileTypeModel} from "../../models/fileType.model";
import db from "../../utils/db.json";
import {SupplierBankDetailsObject} from "../../models/SupplierBankDetailsObject.model";
import {SupplierIdentificationObject} from "../../models/SupplierIdentificationObject.model";
import {UpdateFileRequestDTO} from "../../models/UpdateFileRequestDTO.model";
import {convertBase64} from "../../utils/base64converter";

const MAX_FILE_SIZE: number = 5E+6;

interface DetailBafProps {}

const DetailBaf: FC<DetailBafProps> = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {formState, setFormState} = useGlobalContext();

    const [uploadFiles, setUploadFiles] = useState<UpdateFileRequestDTO[]>([ ]);
    const [supplierIdentificationDetail, setSupplierIdentificationDetail] = useState<SupplierIdentificationObject>({ address1: {}, address2: {} });
    const [bankDetailsDetail, setBankDetailsDetail] = useState<SupplierBankDetailsObject>({ });
    const [uploadedFiles, setUploadedFiles] = useState<UpdateFileRequestDTO[]>([ ]);
    const [requiredFileTypes, setRequiredFileTypes] = useState<FileTypeModel[]>([ ]);
    const [acceptanceFiles, setAcceptanceFiles] = useState<FileTypeModel[]>([ ]);
    const [integrativeFiles, setIntegrativeFiles] = useState<FileTypeModel[]>([ ]);
    const [integrativeFilesHighRisk, setIntegrativeFilesHighRisk] = useState<FileTypeModel[]>([ ]);
    const [integrativeFilesLowRisk, setIntegrativeFilesLowRisk] = useState<FileTypeModel[]>([ ]);
    const [integrativeFilesHighLowRisk, setIntegrativeFilesHighLowRisk] = useState<FileTypeModel[]>([ ]);

    useLayoutEffect(() => {
        if (formState === 'supplier pending' ||
            formState === 'Supplier Pending - ERROR') {
            navigate(id ? `/upsert-BAF/${id}` : `/upsert-BAF`);
        }

        // const form = formService.getById(Number(id));
        //
        // if (form !== undefined) {
        //     setSupplierIdentificationDetail(form.identification);
        //     setBankDetailsDetail(form.bankDetails);
        //     setUploadedFiles(uploadFileService.getAll);
        //     setRequiredFileTypes(db.requiredFileTypes);
        //     setAcceptanceFiles(db.acceptanceFiles);
        //     setIntegrativeFiles(db.integrativeFiles);
        //     setIntegrativeFilesHighRisk(db.integrativeFilesHighRisk);
        //     setIntegrativeFilesLowRisk(db.integrativeFilesLowRisk);
        //     setIntegrativeFilesHighLowRisk(db.integrativeFilesHighLowRisk);
        // }

        window.scrollTo(0, 0);
    }, [])

    const preventDefaults = (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        preventDefaults(event);

        for (let i = 0; i < event.dataTransfer.files.length; i++) {
            if (event.dataTransfer.files[i].size < MAX_FILE_SIZE) {
                const base64 = await convertBase64(event.dataTransfer.files[i])
                uploadFiles.push({ fileName: event.dataTransfer.files[i].name, base64File: base64 });
            } else {
                console.error('Dimensione massima superata');
            }
        }

        setUploadFiles([...uploadFiles]);
    }

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        preventDefaults(event);

        if (event.target.files) {
            for (let i = 0; i < event.target.files.length; i++) {
                if (event.target.files[i].size < MAX_FILE_SIZE) {
                    const base64 = await convertBase64(event.target.files[i])
                    uploadFiles.push({ fileName: event.target.files[i].name, base64File: base64 });
                } else {
                    console.error('Dimensione massima superata');
                }
            }

            setUploadFiles([...uploadFiles]);
        }
    }

    return(
        <div className="DetailBAF">
            {
                formState === 'waiting for supplier pec' ?
                    <div>
                        <p className="mt-5 mb-4"><strong>Se hai bisogno di comunicare modifiche rispetto ai tuoi dati personali procedi modificando i campi nella form.</strong></p>
                        <Button color="bg-red" text="Edit form" textColor="white" btnWidth="151px" disabled={false} onClick={() => {
                            setFormState('supplier pending');
                            navigate(`/upsert-BAF/${id}`);
                        }} />
                        <p className="my-5">oppure:</p>
                        <Banner stroke="border-orange" fill="bg-light-orange" icon="warning" content={
                            <div className="d-flex flex-column">
                                <p><strong>Attenzione! Per completare la registrazione dovrai inviare una PEC allegando i documenti richiesti.</strong></p>
                                <p>Procedi eseguendo i seguenti passaggi:</p>
                                <ul>
                                    <li>Scarica il form compilato</li>
                                    <li>
                                        Raccogli tutti i documenti allegati al form
                                    </li>
                                    <li>Invia tramite PEC all’indirizzo <strong>toyotamotoritalia@legalmail.it</strong> i documenti richiesti e il form compilato</li>
                                    <li>Carica le ricevute di conferma dell’invio della PEC e sottometti il form.</li>
                                </ul>
                            </div>
                        } />
                        <p className="mt-5 mb-4"><strong>Scarica il documento compilato e allegalo alla PEC.</strong></p>
                        <div className="mb-5">
                            <Button color="bg-red" text="Scarica" textColor="white" btnWidth="110px" disabled={false} />
                        </div>
                        <p className="inline-flex"><strong>Carica qui la ricevuta della PEC e sottometti</strong></p>
                        <div className="mt-5 w-100 inline-flex">
                            <UploadFile handleDrop={event => handleDrop(event)} upload={event => handleUpload(event)} overrideEventDefaults={event => preventDefaults(event)} />
                        </div>
                        <div className="d-flex justify-end my-5">
                            <Button color="bg-red" text="Submit" textColor="white" btnWidth="133px" disabled={!(uploadFiles.length > 0)} onClick={() => setFormState('Check pending')} />
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
                                <p><strong>Grazie!</strong> Abbiamo acquisito i tuoi dati. La richiesta è in corso di valutazione.</p>
                            </div>
                        } />
                    </div> : ''
            }
            <SupplierIdentificationDetail model={supplierIdentificationDetail} />
            <hr className="break-line mb-5 mt-6" />
            <SupplierBankDetailsDetail model={bankDetailsDetail} />
            <hr className="break-line mb-5 mt-6" />
            <div className=" info-container mb-5">
                <h2 className="mb-5">C. Upload Files</h2>
                <h3 className="ml-4">Documentazione obbligatoria</h3>
                {
                    requiredFileTypes.map((requiredFileType, i) => {
                        return (
                            <div key={i} className="custom-ul d-flex flex-row">
                                <img className={(uploadedFiles.find(file => file.category === requiredFileType.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.category === requiredFileType.type) ? success_dot : dot} alt="custom_"/>
                                <div className="my-3">
                                    <strong>{requiredFileType.type}:</strong>
                                    <p className="m-0">{requiredFileType.info}</p>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    acceptanceFiles.map((acceptanceFile, i) => {
                        return (
                            <div key={i} className="custom-ul d-flex flex-row">
                                <img className={(acceptanceFile.accepted ? "success_dot" : "dot") + " custom-li"}
                                     src={acceptanceFile.accepted ? success_dot : dot} alt="custom_"/>
                                <div className="my-3">
                                    <strong>{acceptanceFile.type}:</strong>
                                    <p className="m-0">{acceptanceFile.info} <a href="#" className="black">{acceptanceFile.link}</a></p>
                                    <div className="d-flex flex-row mt-2">
                                        <label htmlFor={acceptanceFile.type} className="d-flex font-input-label">
                                            <input type="checkbox" id={acceptanceFile.type} hidden defaultChecked={acceptanceFile.accepted} onChange={event => {
                                                acceptanceFile.accepted = event.target.checked;
                                                setAcceptanceFiles([...acceptanceFiles]);
                                            }}/>
                                            <label htmlFor={acceptanceFile.type} className="font-input-label custom-checkbox mr-3"></label>
                                            Dichiaro di aver preso visione del documento
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <h3 className="ml-4">Documentazione integrativa</h3>
                {
                    integrativeFiles.map((integrativeFile, i) => {
                        return (
                            <div key={i} className="custom-ul d-flex flex-row">
                                <img className={(uploadedFiles.find(file => file.category === integrativeFile.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.category === integrativeFile.type) ? success_dot : dot} alt="custom_"/>
                                <div className="my-3">
                                    <strong>{integrativeFile.type}:</strong>
                                    <p className="m-0">{integrativeFile.info}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <h3 className="ml-4">Documentazione integrativa obbligatoria per fornitori <strong>rischio alto</strong></h3>
                <div className="d-flex flex-row">
                    <div className="ml-4 my-3">
                        <strong>Autocertificazione rischio:</strong>
                        <p className="m-0">
                            “Autocertificazione impresa rischio alto” compilata in tutti i suoi campi e firmata dal legale
                            rappresentante del soggetto richiedente a cui si dovranno allegare i seguenti documenti:
                        </p>
                    </div>
                </div>
                {
                    integrativeFilesHighRisk.map((integrativeFile, i) => {
                        return (
                            <div key={i} className="custom-ul d-flex flex-row">
                                <img className={(uploadedFiles.find(file => file.category === integrativeFile.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.category === integrativeFile.type) ? success_dot : dot} alt="custom_"/>
                                <div className="my-3">
                                    <strong>{integrativeFile.type}:</strong>
                                    <p className="m-0">{integrativeFile.info}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <h3 className="ml-4">Documentazione integrativa obbligatoria per fornitori <strong>rischio basso</strong></h3>
                <div className="d-flex flex-row">
                    <div className="ml-4 my-3">
                        <strong>Autocertificazione rischio:</strong>
                        <p className="m-0">
                            “Autocertificazione impresa rischio basso” compilata in tutti i suoi campi e firmata dal legale
                            rappresentante del soggetto richiedente a cui si dovranno allegare i seguenti documenti:
                        </p>
                    </div>
                </div>
                {
                    integrativeFilesLowRisk.map((integrativeFile, i) => {
                        return (
                            <div key={i} className="custom-ul d-flex flex-row">
                                <img className={(uploadedFiles.find(file => file.category === integrativeFile.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.category === integrativeFile.type) ? success_dot : dot} alt="custom_"/>
                                <div className="my-3">
                                    <strong>{integrativeFile.type}:</strong>
                                    <p className="m-0">{integrativeFile.info}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <h3 className="ml-4">Documentazione facoltativa per fornitori <strong>rischio alto e basso</strong></h3>
                {
                    integrativeFilesHighLowRisk.map((requiredFileType, i) => {
                        return (
                            <div key={i} className="custom-ul d-flex flex-row">
                                <img className={(uploadedFiles.find(file => file.category === requiredFileType.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.category === requiredFileType.type) ? success_dot : dot} alt="custom_"/>
                                <div className="my-3">
                                    <strong>{requiredFileType.type}:</strong>
                                    <p className="m-0">{requiredFileType.info}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default DetailBaf;
