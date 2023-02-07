import React, {useLayoutEffect, useState} from 'react';
import './UpsertBAF.css';
import UploadFile from "../../shared/UploadFile/UploadFile";
import SupplierBankDetailsUpsert from "./SupplierBankDetailsUpsert/SupplierBankDetailsUpsert";
import SupplierIdentificationUpsert from "./SupplierIdentificationUpsert/SupplierIdentificationUpsert";
import {CountryModel} from "../../models/country.model";
import CountryService from "../../api/country.service";
import Button from "../../shared/Button/Button";
import UploadCard from "../../shared/UploadCard/UploadCard";
import {UploadedFileModel} from "../../models/uploadedFile.model";
import dot from "../../assets/svg/simple_dot.svg";
import success_dot from "../../assets/svg/success_icon.svg";
import {FileTypeModel} from "../../models/fileType.model";
import db from "../../utils/db.json";
import CustomModal from "../../shared/Modal/CustomModal";
import {useNavigate, useParams} from "react-router-dom";
import {useGlobalContext} from "../../utils/AppContext";
import Banner from "../../shared/Banner/Banner";
import Icon from "../../shared/Icon/Icon";
import {IoMdClose} from 'react-icons/io';
// import FormService from "../../api/form.service";
// import UploadFileService from "../../api/uploadFile.service";
import {SupplierBankDetailsObject} from "../../models/SupplierBankDetailsObject.model";
import {SupplierIdentificationObject} from "../../models/SupplierIdentificationObject.model";
// import {BAFObjectDTO} from "../../models/BAFObjectDTO.model";

const MAX_FILE_SIZE: number = 5E+6;

const UpsertBaf: React.FunctionComponent = () => {
    const [countries, setCountries] = useState<CountryModel[]>([ ]);
    const [supplierIdentification, setSupplierIdentification] = useState<SupplierIdentificationObject>({ address1: {}, address2: {} });
    const [bankUpsertModel, setBankUpsertModel] = useState<SupplierBankDetailsObject>({ });
    const [toUpdateFile, setToUpdateFile] = useState<UploadedFileModel>({ name: "", type: "" })
    const [toUploadFiles, setToUploadFiles] = useState<UploadedFileModel[]>([ ]);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([ ]);
    const [requiredFileTypes, setRequiredFileTypes] = useState<FileTypeModel[]>([ ]);
    const [acceptanceFiles, setAcceptanceFiles] = useState<FileTypeModel[]>([ ]);
    const [integrativeFiles, setIntegrativeFiles] = useState<FileTypeModel[]>([ ]);
    const [integrativeFilesHighRisk, setIntegrativeFilesHighRisk] = useState<FileTypeModel[]>([ ]);
    const [integrativeFilesLowRisk, setIntegrativeFilesLowRisk] = useState<FileTypeModel[]>([ ]);
    const [integrativeFilesHighLowRisk, setIntegrativeFilesHighLowRisk] = useState<FileTypeModel[]>([ ]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [checkDisable, setCheckDisable] = useState<boolean>(true);
    const [isPopUpShow, setIsPopUpShow] = useState<boolean>(true);

    const {formState, setFormState, isFormValidBank, isFormValidIdentification} = useGlobalContext();

    let navigate = useNavigate()
    let {id} = useParams();

    useLayoutEffect(() => {
        if (formState === 'Check pending' || formState === 'registered') {
            navigate(id ? `/detail-BAF/${id}` : `/error`);
        }

        const countries = CountryService.getAll();
        const sortedCountries = countries.sort((a: any, b: any) => a.name.common > b.name.common ? 1 : -1).map((country: any) => {
            const currencyKey = Object.keys(country.currencies || { })?.at(0) ?? null;

            return {
                name: country.name.common,
                cca2: country.cca2,
                idd: country.idd.suffixes?.map((suffix: string) => {
                    return country.idd.root + suffix;
                } ),
                currency: currencyKey ? country.currencies[currencyKey] : null
            } as CountryModel;
        }) as CountryModel[];

        setCountries(sortedCountries);

        // if (id !== undefined) {
        //     const form = FormService.getById(Number(id));
        //     const uploadedFile = UploadFileService.getAll();
        //     if(form) {
        //         setSupplierIdentification(form.supplierIdentification);
        //         setBankUpsertModel(form.supplierBankDetails);
        //     }
        //     if(uploadedFile.length > 0 && form?.id === Number(id)) {
        //         setUploadedFiles(uploadedFile)
        //     }
        // } else {
        //     setSupplierIdentification({
        //         address1 : {country: sortedCountries?.at(0)?.name},
        //         idd: sortedCountries?.at(0)?.idd.at(0),
        //         cca2: sortedCountries?.at(0)?.cca2,
        //         establishment: true
        //     })
        // }


        setRequiredFileTypes(db.requiredFileTypes);
        setAcceptanceFiles(db.acceptanceFiles);
        setIntegrativeFiles(db.integrativeFiles);
        setIntegrativeFilesHighRisk(db.integrativeFilesHighRisk);
        setIntegrativeFilesLowRisk(db.integrativeFilesLowRisk);
        setIntegrativeFilesHighLowRisk(db.integrativeFilesHighLowRisk);
    }, []);

    const overrideEventDefaults = (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        overrideEventDefaults(event);

        for (let i = 0; i < event.dataTransfer.files.length; i++) {
            if (event.dataTransfer.files[i].size < MAX_FILE_SIZE) {
                toUploadFiles.push({ name: event.dataTransfer.files[i].name, type: "" });
            } else {
                //TODO: gestione validazione dimensione massima file
                console.error('Dimensione massima superata');
            }
        }

        setToUploadFiles([...toUploadFiles]);

        setShowModal(true);
        checkValidation();
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        overrideEventDefaults(event);

        if (event.target.files) {
            for (let i = 0; i < event.target.files.length; i++) {
                if (event.target.files[i].size < MAX_FILE_SIZE) {
                   toUploadFiles.push({ name: event.target.files[i].name, type: "" });
                } else {
                    console.error('Dimensione massima superata');
                }
            }

            setToUploadFiles([...toUploadFiles]);
        }

        setShowModal(true);
        checkValidation();
    }

    const upload = () => {
        setUploadedFiles([...uploadedFiles, ...toUploadFiles]);
        setToUploadFiles([]);
        setShowModal(false);
    }

    const updateFileTypology = () => {
        uploadedFiles.map(file => {
            if (file.name === toUpdateFile.name) {
                file.type = toUpdateFile.type;
            }
        });

        setUploadedFiles([...uploadedFiles]);
    }

    const updateToUploadFileTypology = (updatedFile: UploadedFileModel) => {
        toUploadFiles.map(file => {
            if (file.name === updatedFile.name) {
                file.type = updatedFile.type;
            }
        });

        setToUploadFiles([...toUploadFiles]);
        checkValidation();
    }

    const checkValidation = () => {
        setCheckDisable(false);

        toUploadFiles.map(file => {
            if (file.type === "") {
                setCheckDisable(true);
            }
        });
    }

    const deleteToUploadFile = (index: number) => {
        toUploadFiles.splice(index, 1);

        setToUploadFiles([...toUploadFiles]);

        setShowModal(toUploadFiles.length > 0);
        document.body.style.overflowY = toUploadFiles.length > 0 ? "hidden" : "scroll"
    }

    const deleteUploadedFile = (index: number) => {
        uploadedFiles.splice(index, 1);

        setUploadedFiles([...uploadedFiles]);
    }

    const popUpHandler = () => {
        setIsPopUpShow(!isPopUpShow);
    }

    return(
        <div className="UpsertBAF">
            {
                formState === 'Supplier Pending - ERROR' ?
                    <div className='d-flex flex-column gap-2 pop-up'>
                        {
                            isPopUpShow ?
                                <div className='px-4 bg-white border-light-grey border-shadow-light radius-m'>
                                    <div className='d-flex justify-between align-center dark-grey'>
                                        <h4 className='red'>Attention!</h4>
                                        <IoMdClose style={{fontSize: '24px', cursor: "pointer"}} onClick={popUpHandler} />
                                    </div>
                                    <p className='font-p-little mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                </div> : ''
                        }
                        <div className='d-flex justify-end'>
                            <div className='pointer' onClick={popUpHandler}>
                                <Icon icon='errorPopUp' />
                            </div>
                        </div>
                    </div>
                    : ''
            }
            <CustomModal show={showModal} btnColor={"bg-red"} btnText={"Upload"} btnTextColor={"white"}
                         btnWidth={"151px"} btnDisabled={checkDisable} onClose={() => {
                                                                            setShowModal(false);
                                                                            setToUploadFiles([]);
                                                                        }} onUpload={upload}>
                <div className="d-flex flex-column gap-5">
                    {
                        toUploadFiles.map((uploadedFile, index) => {
                            return (
                                <UploadCard key={index} uploadedFile={uploadedFile}
                                            typologySelectedEvent={updateToUploadFileTypology}
                                            selectedTypology={uploadedFile.type}
                                            status="modal" spacing=" p-3 mx-3"
                                            updateTypology={() => { }}
                                            deleteFile={() => deleteToUploadFile(index)}/>
                            )
                        })
                    }
                </div>
            </CustomModal>
            <div className="info-container mb-5 pb-5 pt-3">
                <p><strong>1 Person companies/small companies* - One signature and one call back required</strong></p>
                <p>*1 person companies/small companies - only one person within the company of management level</p>
                <p><strong>Large companies - Double signature and double call back required</strong></p>
                <p className="mb-5"><strong>Government agency - One signature and one call back required + Supporting documentation (government agency’s website validated by is department)</strong></p>
                <p><strong>Note to Vendors:</strong> Toyota is mindful of the risks involved with the creation and maintenance of Vendor bank details.
                    To mitigate there risks and to protect your interests, as well as the interests of Toyota,
                    creation or update of bank account will be processed based on the completed, authorised and verified information on this form only.</p>
            </div>
            {
                formState === 'Supplier Pending - ERROR' ?
                    <Banner
                        stroke='border-red'
                        fill='bg-light-red'
                        content={
                            <p>
                                <strong>Attenzione! </strong>
                                Si sono verificati degli errori.
                            </p>
                        }
                        icon='error' />
                    : ''
            }
            <SupplierIdentificationUpsert countries={countries} model={supplierIdentification} />
            <hr className="break-line mb-5 mt-6" />
            <SupplierBankDetailsUpsert outputDetails={bankUpsertModel} countries={countries} />
            <hr className="break-line mb-5 mt-6" />
            <div className="info-container mb-5">
                <h2 className="mb-5">C. Caricamento Allegati</h2>
                <h3 className="ml-4">Documentazione obbligatoria</h3>
                {
                    requiredFileTypes.map((requiredFileType, i) => {
                        return (
                            <div key={i} className="custom-ul d-flex flex-row">
                                <img className={(uploadedFiles.find(file => file.type === requiredFileType.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.type === requiredFileType.type) ? success_dot : dot} alt="custom_"/>
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
                                <img className={(uploadedFiles.find(file => file.type === integrativeFile.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.type === integrativeFile.type) ? success_dot : dot} alt="custom_"/>
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
                                <img className={(uploadedFiles.find(file => file.type === integrativeFile.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.type === integrativeFile.type) ? success_dot : dot} alt="custom_"/>
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
                                <img className={(uploadedFiles.find(file => file.type === integrativeFile.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.type === integrativeFile.type) ? success_dot : dot} alt="custom_"/>
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
                                <img className={(uploadedFiles.find(file => file.type === requiredFileType.type) ? "success_dot" : "dot") + " custom-li"}
                                     src={uploadedFiles.find(file => file.type === requiredFileType.type) ? success_dot : dot} alt="custom_"/>
                                <div className="my-3">
                                    <strong>{requiredFileType.type}:</strong>
                                    <p className="m-0">{requiredFileType.info}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-5 w-100 inline-flex">
                <UploadFile handleDrop={handleDrop} upload={handleUpload} overrideEventDefaults={overrideEventDefaults} />
            </div>
            <div className="mt-6 info-upload-container">
                <h2 className="font-w-light">Uploaded Files</h2>
                <p>Dopo aver caricato i file seleziona la categoria di appertenenza per ciascuno di essi. Solo una volta che avrai correttamente associato la categoria i file saranno inseriti nel database.</p>
            </div>
            {
                uploadedFiles.map((uploadedFile, index) => {
                    return (
                        <UploadCard key={index} uploadedFile={uploadedFile}
                                    typologySelectedEvent={setToUpdateFile}
                                    selectedTypology={uploadedFile.type}
                                    status="form" spacing=" p-3 mt-5 mb-5"
                                    updateTypology={updateFileTypology}
                                    deleteFile={() => deleteUploadedFile(index)}/>
                    )
                })
            }

            <div className="d-flex gap-3 justify-end pb-5">
                <Button color="bg-ultra-light-grey" text="Save draft" textColor="dark-grey" btnWidth="151px" disabled={false}
                onClick={() => {}}/>
                <Button color="bg-red"
                        text="Confirm" textColor="white" btnWidth="151px"  onClick={() => {
                    setFormState('waiting for supplier pec')
                    navigate(id ? `/detail-BAF/${id}` : `/detail-BAF/1`);
                }
                } disabled={!isFormValidIdentification || !isFormValidBank} />
            </div>
        </div>
    );
}


export default UpsertBaf;
