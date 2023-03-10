import React, {FC, useLayoutEffect, useState} from 'react';
import './UpsertBAF.css';
import {useParams} from "react-router-dom";
import UploadFile from "../../shared/UploadFile/UploadFile";
import SupplierBankDetailsUpsert from "./SupplierBankDetailsUpsert/SupplierBankDetailsUpsert";
import SupplierIdentificationUpsert from "./SupplierIdentificationUpsert/SupplierIdentificationUpsert";
import {SupplierBankDetailsUpsertModel} from "../../models/supplierBankDetailsUpsertModel";
import {CountryModel} from "../../models/country.model";
import CountryService from "../../api/country.service";
import {SupplierIdentificationUpsertModel} from "../../models/supplierIdentificationUpsert.model";
import Button from "../../shared/Button/Button";
import {FiTrash2} from "react-icons/fi";
import UploadCard from "../../shared/UploadCard/UploadCard";
import {CurrencyModel} from "../../models/currency.model";
import {UploadedFileModel} from "../../models/uploadedFile.model";
import successIcon from "../../assets/svg/success_icon.svg";

const MAX_FILE_SIZE: number = 5E+6;

interface UpsertBafProps {}

const UpsertBaf: FC<UpsertBafProps> = () => {
    const [bankDetails, setBankDetails] = useState('');
    const [countries, setCountries] = useState<CountryModel[]>([ ]);
    const [supplierIdentification, setSupplierIdentification] = useState<SupplierIdentificationUpsertModel>({ });
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([ ])

    let {id} = useParams();

    useLayoutEffect(() => {
        CountryService.getAll().then(response => {
            const sortedCountries = response.data.sort((a: any, b: any) => a.name.common > b.name.common ? 1 : -1).map((country: any) => {
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
        });
    }, []);

    const overrideEventDefaults = (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        overrideEventDefaults(event)

        for (let i = 0; i < event.dataTransfer.files.length; i++) {
            if (event.dataTransfer.files[i].size < MAX_FILE_SIZE) {
                setUploadedFiles([...uploadedFiles, { name: event.dataTransfer.files[i].name, type: "" }]);
            } else {
                //TODO: gestione validazione dimensione massima file
                console.error('Dimensione massima superata');
            }
        }
    }

    const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        overrideEventDefaults(event)

        if (event.target.files) {
            for (let i = 0; i < event.target.files.length; i++) {
                if (event.target.files[i].size < MAX_FILE_SIZE) {
                    setUploadedFiles([...uploadedFiles,{ name: event.target.files[i].name, type: "" }]);
                } else {
                    //TODO: gestione validazione dimensione massima file
                    console.error('Dimensione massima superata');
                }
            }
        }
    }

    const updateSelectTypologyStatus = (files: UploadedFileModel[]) => {
        setUploadedFiles(files);
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

    const onConsole = () => {
        console.log(bankUpsertModel)
        console.log(supplierIdentification)
    }

    return(
        <div className="UpsertBAF">
            <div className="info-container mb-5 pb-5 pt-3">
                <p><strong>1 Person companies/small companies* - One signature and one call back required</strong></p>
                <p>*1 person companies/small companies - only one person within the company of management level</p>
                <p><strong>Large companies - Double signature and double call back required</strong></p>
                <p className="mb-5"><strong>Government agency - One signature and one call back required + Supporting documentation (government agency???s website validated by is department)</strong></p>
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
                <h3>?? obbligatorio ricevere da <strong>tutti</strong> i candidati fornitori:</h3>
                <ul className="custom-ul">
                    <li className="mb-3"><strong>Richiesta di inserimento nell???albo su carta intestata del fornitore</strong> contenente i dati da inserire in anagrafica. L???allegato dovr?? contemplare anche le seguenti info: numero di telefono ed e-mail del soggetto firmatario del contratto che sia dotato del potere di firma</li>
                    <li className="mb-3"><strong>Copia della visura della Camera di Commercio</strong> in corso di validit?? con data entro i 180 giorni dall???emissione (per i fornitori stranieri un documento equivalente) e del documento di identit?? del titolare/rappresentante legale dell???azienda</li>
                    <li className="mb-3"><strong>Copie delle eventuali certificazioni ISO possedute</strong> (a titolo esemplificativo: ISO 9001, ISO 14001, ISO 45001, SA8000), brevetti, codice di condotta del fornitore;</li>

                    <p><strong>CASI PARTICOLARI:</strong></p>

                    <li className="mb-3">Per fornitori con potenziale impatto significativo sul business e/o sulla compliance, <strong>curriculum descrittivo</strong> delle esperienze maturate nell???ambito del servizio per cui il fornitore ?? candidato;</li>
                    <li className="mb-3">Qualora l???attivit?? del fornitore comporti il trattamento dei dati personali di TMI, l???<strong>esito della valutazione effettuata in merito al rispetto dei requisiti richiesti dalle policy TMI</strong> in tema di sicurezza nella gestione dei dati personali</li>
                </ul>
                <h3 className="mt-6 mb-5">Documentazione integrativa</h3>
                <ul className="custom-ul">
                    <p>Il candidato, che viene configurato nella tipologia rischio alto, dovr?? fornire:</p>
                    <li className="mb-3">Apposita <strong>???autocertificazione impresa rischio alto???</strong> compilata in tutti i suoi campi e firmata dal legale rappresentante del soggetto richiedente (per lo standard di checklist si rimanda all???allegato n?? 1 alla presente procedura) a cui si dovranno allegare i seguenti documenti:</li>
                    <li className="mb-3"><strong>Curriculum</strong> con evidenza dei lavori svolti negli ultimi tre anni;</li>
                    <li className="mb-3">Copia degli <strong>attestati di formazione dei dipendenti impiegati in TMI</strong>;</li>
                    <li className="mb-3">Copia degli <strong>attestati di avvenuta consegna del documento DPI</strong> ??? dispositivi di protezione individuale;</li>
                    <li className="mb-3">Copia del <strong>documento unico di regolarit?? contributiva (DURC</strong>) in corso di validit?? e successivi aggiornamenti;</li>
                    <li className="mb-3">Copia del <strong>documento unico per la valutazione rischi da interferenze (DUVRI)</strong> firmato.</li>

                    <p>N.B.: in caso di definizione di un accordo contrattuale, ?? responsabilit?? del reparto Legal & Compliance valutare la necessit?? di un supporto del Servizio di Prevenzione e Protezione per la stesura di DUVRI ad hoc, che dovr?? essere un allegato contrattuale.</p>
                    <p>Documentazione facoltativa:</p>

                    <li className="mb-3">Copia della <strong>Politica Salute e Sicurezza</strong> e del <strong>certificato OHSAS 18001/ISO 45001</strong> in corso di validit?? (da allegare solo in caso di organizzazione certificata OHSAS 18001/ISO 45001);</li>
                    <li className="mb-3">Copia del <strong>modello di organizzazione e gestione della sicurezza</strong> conforme ai requisiti del D. Lgs. 81/2008;</li>
                    <li className="mb-3">Evidenza che nell???ultimo biennio si ?? ottenuta una <strong>riduzione del premio infortunistico dall???INAIL</strong>.</li>
                </ul>
            </div>
            <UploadFile handleDrop={handleDrop} upload={upload} overrideEventDefaults={overrideEventDefaults} />
            <div className="mt-6 info-upload-container">
                <h2 className="font-w-light">Uploaded Files</h2>
                <p>Dopo aver caricato i file seleziona la categoria di appertenenza per ciascuno di essi. Solo una volta che avrai correttamente associato la categoria i file saranno inseriti nel database.</p>
            </div>

            {/*Card Upload*/}
            <UploadCard uploadedFiles={ uploadedFiles.map(uploadFile => { return { name: uploadFile.name, type: "" } }) }
                        typologySelectedEvent={updateSelectTypologyStatus} />

            <div className="d-flex gap-3 justify-end">
                <Button color="bg-ultra-light-grey" text="Save draft" textColor="dark-grey" btnWidth="151px" />
                <Button color="bg-red" text="Confirm" textColor="white" btnWidth="151px"  onClick={onConsole}/>
            </div>
        </div>
    );
}


export default UpsertBaf;
