import React, {useLayoutEffect, useState} from 'react';
import './UpsertBAF.css';
// import {useParams} from "react-router-dom";
import UploadFile from "../../shared/UploadFile/UploadFile";
import SupplierBankDetailsUpsert from "./SupplierBankDetailsUpsert/SupplierBankDetailsUpsert";
import SupplierIdentificationUpsert from "./SupplierIdentificationUpsert/SupplierIdentificationUpsert";
import {SupplierBankDetailsUpsertModel} from "../../models/supplierBankDetailsUpsertModel";
import {CountryModel} from "../../models/country.model";
import CountryService from "../../api/country.service";
import {SupplierIdentificationUpsertModel} from "../../models/supplierIdentificationUpsert.model";
import Button from "../../shared/Button/Button";
import UploadCard from "../../shared/UploadCard/UploadCard";
import {UploadedFileModel} from "../../models/uploadedFile.model";
import dot from "../../assets/svg/simple_dot.svg";
import success_dot from "../../assets/svg/success_icon.svg";
import {FileTypeModel} from "../../models/fileType.model";
import db from "../../utils/db.json";
import CustomModal from "../../shared/Modal/CustomModal";

const MAX_FILE_SIZE: number = 5E+6;

const UpsertBaf: React.FunctionComponent = () => {
    const [countries, setCountries] = useState<CountryModel[]>([ ]);
    const [supplierIdentification, setSupplierIdentification] = useState<SupplierIdentificationUpsertModel>({ });
    const [toUpdateFile, setToUpdateFile] = useState<UploadedFileModel>({ name: "", type: "" })
    const [toUploadFiles, setToUploadFiles] = useState<UploadedFileModel[]>([ ]);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([ ]);
    const [requiredFileTypes, setRequiredFileTypes] = useState<FileTypeModel[]>([ ]);
    const [acceptanceFiles, setAcceptanceFiles] = useState<FileTypeModel[]>([ ]);
    const [integrativeFiles, setIntegrativeFiles] = useState<FileTypeModel[]>([ ]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [checkDisable, setCheckDisable] = useState<boolean>(true);

    // let {id} = useParams();

    useLayoutEffect(() => {
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

        setSupplierIdentification({
            country: sortedCountries?.at(0)?.name,
            idd: sortedCountries?.at(0)?.idd.at(0),
            cca2: sortedCountries?.at(0)?.cca2,
            establishment: true
        })

        setRequiredFileTypes(db.requiredFileTypes);
        setAcceptanceFiles(db.acceptanceFiles);
        setIntegrativeFiles(db.integrativeFiles);
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
                    //TODO: gestione validazione dimensione massima file
                    console.error('Dimensione massima superata');
                }
            }

            setToUploadFiles([...toUploadFiles]);
        }

        setShowModal(true);
        checkValidation();
    }

    const upload = () => {
        // upload a file manager
        setUploadedFiles([...uploadedFiles, ...toUploadFiles]);
        setToUploadFiles([]);
        setShowModal(false);
    }

    let bankUpsertModel: SupplierBankDetailsUpsertModel = {
        bankName: '',
        bankAccountCurrency: '',
        effectiveDate: new Date(),
        bankAccountHolderName: '',
        nameIsDifferentFromBankAccountName: false,
        reasonName: '',
        factoryCompany: false,
        reasonFactory: '',
        bankAccountNumber: '',
        ibanNumber: '',
        swiftCode: '',
        sortCode: ''
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

    const onConsole = () => {
        console.log(bankUpsertModel)
        console.log(supplierIdentification)
        console.log(uploadedFiles)
    }

    return(
        <div className="UpsertBAF">
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
                                            updateTypology={() => { }}/>
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
                <h3 className="ml-4">Documentazione integrativa obbligatoria per fornitori <strong>rischio alto</strong></h3>
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
            </div>
            <div style={{marginTop: "20rem"}}>
                <UploadFile handleDrop={handleDrop} upload={handleUpload} overrideEventDefaults={overrideEventDefaults} />
            </div>
            <div className="mt-6 info-upload-container">
                <h2 className="font-w-light">Uploaded Files</h2>
                <p>Dopo aver caricato i file seleziona la categoria di appertenenza per ciascuno di essi. Solo una volta che avrai correttamente associato la categoria i file saranno inseriti nel database.</p>
            </div>

            {/*Card Upload*/}
            {
                uploadedFiles.map((uploadedFile, index) => {
                    return (
                        <UploadCard key={index} uploadedFile={uploadedFile}
                                    typologySelectedEvent={setToUpdateFile}
                                    selectedTypology={uploadedFile.type}
                                    status="form" spacing=" p-3 mt-5 mb-5"
                                    updateTypology={updateFileTypology}/>
                    )
                })
            }

            <div className="d-flex gap-3 justify-end">
                <Button color="bg-ultra-light-grey" text="Save draft" textColor="dark-grey" btnWidth="151px" disabled={false} />
                <Button color="bg-red" text="Confirm" textColor="white" btnWidth="151px"  onClick={onConsole} disabled={false} />
            </div>
        </div>
    );
}


export default UpsertBaf;
