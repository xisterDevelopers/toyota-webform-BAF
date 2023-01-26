import React, {FC, useState} from 'react';
import './UpsertBAF.css';
import {useParams} from "react-router-dom";
import UploadFile from "../../shared/UploadFile/UploadFile";
import SupplierBankDetailsUpsert from "./SupplierBankDetailsUpsert/SupplierBankDetailsUpsert";
import SupplierIdentificationUpsert from "./SupplierIdentificationUpsert/SupplierIdentificationUpsert";
import {SupplierBankDetailsUpsertModel} from "../../models/supplierBankDetailsUpsertModel";

const MAX_FILE_SIZE: number = 5E+6;

interface UpsertBafProps {}

const UpsertBaf: FC<UpsertBafProps> = () => {
    const [bankDetails, setBankDetails] = useState('')
    let {id} = useParams();

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
            <SupplierBankDetailsUpsert outputDetails={bankUpsertModel} />
            {/*<SupplierIdentificationUpsert />*/}
            {/*<UploadFile handleDrop={handleDrop} upload={upload} overrideEventDefaults={overrideEventDefaults} />*/}
        </div>
    );
}


export default UpsertBaf;
