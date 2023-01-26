import React, { FC } from 'react';
import './SupplierBankDetailsUpsert.css';

interface SupplierBankDetailsUpsertProps {}

const SupplierBankDetailsUpsert: FC<SupplierBankDetailsUpsertProps> = () => {
    return(
        <div>
            <div className="d-flex">
                <div className="d-flex flex-column">
                    <label className="font-input-label">ciao</label>
                    <input type="text" className="custom-input" />
                </div>
            </div>
        </div>
    )
};

export default SupplierBankDetailsUpsert;
