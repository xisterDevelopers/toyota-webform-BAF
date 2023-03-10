import React, {FC, useState} from 'react';
import './SupplierBankDetailsUpsert.css';
import {SupplierBankDetailsUpsertModel} from "../../../models/supplierBankDetailsUpsertModel";
import {CurrencyModel} from "../../../models/currency.model";
import {CountryModel} from "../../../models/country.model";

interface SupplierBankDetailsUpsertProps {
    outputDetails: SupplierBankDetailsUpsertModel;
    countries: CountryModel[]
}

const SupplierBankDetailsUpsert: FC<SupplierBankDetailsUpsertProps> = ({outputDetails, countries}) => {
    const [bankName, setBankName] = useState(outputDetails.bankName);
    const [currency, setCurrency] = useState(outputDetails.bankAccountCurrency);
    const [date, setDate] = useState('');
    const [bankAccountHolderName, setBankAccountHolderName] = useState(outputDetails.bankAccountHolderName);
    const [isAccountDiffHolderName, setIsAccountDiffHolderName] = useState(outputDetails.nameIsDifferentFromBankAccountName);
    const [reasonHolderName, setReasonHolderName] = useState(outputDetails.reasonName);
    const [isFactoryCompany, setIsFactoryCompany] = useState(outputDetails.factoryCompany);
    const [reasonFactoryCompany, setReasonFactoryCompany] = useState(outputDetails.reasonFactory);
    const [bankAccountNumber, setBankAccountNumber] = useState(outputDetails.bankAccountNumber);
    const [iban, setIban] = useState(outputDetails.ibanNumber);
    const [swift, setSwift] = useState(outputDetails.swiftCode);
    const [sortCode, setSortCode] = useState(outputDetails.sortCode);

    outputDetails.effectiveDate = new Date(date);

    return(
        <div>
            <h2 className="mb-5">B. Supplier bank details</h2>

            <form className="d-flex flex-column gap-3" >
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank name<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               value={bankName} onChange={(event) => setBankName(outputDetails.bankName = event.target.value)} />
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank account currency</label>
                        <select className="custom-select custom-input input-lg"
                                value={currency} onChange={(event) => setCurrency(outputDetails.bankAccountCurrency = event.target.value)} >
                            {
                                countries.filter(country => country.currency !== null)
                                    .sort((a, b) => a.currency.name > b.currency.name ? 1 : -1)
                                    .map((country, index) => (
                                        <option key={index}>{country.currency.name} ({country.currency.symbol})</option>
                                    ))
                            }
                        </select>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Effective date</label>
                        <input type="date" className="custom-input custom-date input-lg"
                               value={date} onChange={(event) => setDate(event.target.value)} />
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank account holder name</label>
                        <input type="text" className="custom-input input-lg"
                               value={bankAccountHolderName} onChange={(event) => setBankAccountHolderName(outputDetails.bankAccountHolderName = event.target.value)} />
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div id="accountHolderName" className="d-flex flex-column">
                        <label htmlFor="accountHolderName" className="font-input-label">Supplier name is different from bank account holder name?</label>
                        <div className="d-flex gap-6">
                            <div className="d-flex gap-2">
                                <input type="radio" id="yesAccount" name="accountHolderName" hidden={true}
                                       onChange={() => setIsAccountDiffHolderName( outputDetails.nameIsDifferentFromBankAccountName = true)}/>
                                <label htmlFor="yesAccount" className="custom-radio"></label>
                                <label htmlFor="yesAccount">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noAccount" name="accountHolderName" hidden={true}
                                       onChange={() => setIsAccountDiffHolderName(outputDetails.nameIsDifferentFromBankAccountName = false)}/>
                                <label htmlFor="noAccount" className="custom-radio"></label>
                                <label htmlFor="noAccount">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Reason<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg" disabled={!isAccountDiffHolderName}
                               value={reasonHolderName} onChange={(event) => setReasonHolderName(outputDetails.reasonName = event.target.value)}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div id="factoryCompany" className="d-flex flex-column">
                        <label htmlFor="factoryCompany" className="font-input-label">Factory company?</label>
                        <div className="d-flex gap-6">
                            <div className="d-flex gap-2">
                                <input type="radio" id="yesFactory" name="factoryCompany" hidden={true}
                                       onChange={() => setIsFactoryCompany(outputDetails.factoryCompany = true)}/>
                                <label htmlFor="yesFactory" className="custom-radio"></label>
                                <label htmlFor="yesFactory">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noFactory" name="factoryCompany" hidden={true}
                                       onChange={() => setIsFactoryCompany(outputDetails.factoryCompany = false)}/>
                                <label htmlFor="noFactory" className="custom-radio"></label>
                                <label htmlFor="noFactory">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Reason<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg" disabled={!isFactoryCompany}
                               value={reasonFactoryCompany} onChange={(event) => setReasonFactoryCompany(outputDetails.reasonFactory = event.target.value)}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank account number<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               value={bankAccountNumber} onChange={(event) => setBankAccountNumber(outputDetails.bankAccountNumber = event.target.value)}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">IBAN number<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               value={iban} onChange={(event) => setIban(outputDetails.ibanNumber = event.target.value)}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="font-input-label">SWIFT code<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               value={swift} onChange={(event) => setSwift(outputDetails.swiftCode = event.target.value)}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="d-flex font-input-label txt-nowrap">SORT code (UK) / FIK (Denmark) / GIRO (Sweden)<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               value={sortCode} onChange={(event) => setSortCode(outputDetails.sortCode = event.target.value)}/>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default SupplierBankDetailsUpsert;
