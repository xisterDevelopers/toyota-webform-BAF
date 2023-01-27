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

const MAX_FILE_SIZE: number = 5E+6;

interface UpsertBafProps {}

const UpsertBaf: FC<UpsertBafProps> = () => {
    const [bankDetails, setBankDetails] = useState('');
    const [countries, setCountries] = useState<CountryModel[]>([ ]);
    const [supplierIdentification, setSupplierIdentification] = useState<SupplierIdentificationUpsertModel>({ })

    let {id} = useParams();

    useLayoutEffect(() => {
        CountryService.getAll().then(response => {
            const sortedCountries = response.data.sort((a: any, b: any) => a.name.common > b.name.common ? 1 : -1).map((country: any) => {
                return {
                    name: country.name.common,
                    cca2: country.cca2,
                    idd: country.idd.suffixes?.map((suffix: string) => {
                        return country.idd.root + suffix;
                    } ),
                    currency: "€"
                } as CountryModel;
            }) as CountryModel[];
            setCountries(sortedCountries);

            setSupplierIdentification({
                country: sortedCountries?.at(0)?.name,
                idd: sortedCountries?.at(0)?.idd.at(0),
                cca2: sortedCountries?.at(0)?.cca2
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
                console.log(event.dataTransfer.files[i]);
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
                    console.log(event.target.files[i]);
                } else {
                    //TODO: gestione validazione dimensione massima file
                    console.error('Dimensione massima superata');
                }
            }
        }
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


    return(
        <div className="UpsertBAF">
            <div className="info-container mb-5 pb-5 pt-3">
                <p><strong>1 Person companies/small companies* - One signature and one call back required</strong></p>
                <p>*1 person companies/small companies - only one person within the company of managment level</p>
                <p><strong>Large companies - Double signature and double call back required</strong></p>
                <p className="mb-5"><strong>Government agency - One signature and one call back required + Supporting documentation (government agency’s website validated by is department)</strong></p>
                <p><strong>Note to Vendors:</strong> Toyota is mindful of the risks involved with the creation and maintenance of Vendor bank details.
                    To mitigate there risks and to protect your interests, as well as the interests of Toyota,
                    creation or update of bank account will be processed based on the completed, authorised and verified information on this form only.</p>
            </div>
            <SupplierIdentificationUpsert countries={countries} model={supplierIdentification} />
            <SupplierBankDetailsUpsert outputDetails={bankUpsertModel} />
            {/*<UploadFile handleDrop={handleDrop} upload={upload} overrideEventDefaults={overrideEventDefaults} />*/}
        </div>
    );
}


export default UpsertBaf;
