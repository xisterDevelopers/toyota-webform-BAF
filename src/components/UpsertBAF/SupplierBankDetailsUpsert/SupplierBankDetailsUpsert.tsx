import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import './SupplierBankDetailsUpsert.css';
import {SupplierBankDetailsUpsertModel} from "../../../models/supplierBankDetailsUpsertModel";
import {CurrencyModel} from "../../../models/currency.model";
import {CountryModel} from "../../../models/country.model";
import bicValidator from 'bic-validator';
import {useGlobalContext} from "../../../utils/AppContext";
const IBAN = require('iban');

interface SupplierBankDetailsUpsertProps {
    outputDetails: SupplierBankDetailsUpsertModel;
    countries: CountryModel[]
}

const SupplierBankDetailsUpsert: FC<SupplierBankDetailsUpsertProps> = ({outputDetails, countries}) => {
    // const [bankName, setBankName] = useState(outputDetails.bankName);
    const [currency, setCurrency] = useState(outputDetails.bankAccountCurrency);
    const [date, setDate] = useState<string>(outputDetails.effectiveDate ?? '');
    // const [bankAccountHolderName, setBankAccountHolderName] = useState(outputDetails.bankAccountHolderName);
    const [isAccountDiffHolderName, setIsAccountDiffHolderName] = useState(outputDetails.nameIsDifferentFromBankAccountName);
    // const [reasonHolderName, setReasonHolderName] = useState(outputDetails.reasonName);
    const [isFactoryCompany, setIsFactoryCompany] = useState(outputDetails.factoryCompany);
    // const [reasonFactoryCompany, setReasonFactoryCompany] = useState(outputDetails.reasonFactory);
    // const [bankAccountNumber, setBankAccountNumber] = useState(outputDetails.bankAccountNumber);
    // const [iban, setIban] = useState(outputDetails.ibanNumber);
    // const [swift, setSwift] = useState(outputDetails.swiftCode);
    // const [sortCode, setSortCode] = useState(outputDetails.sortCode);
    const [ibanIsValid, setIbanIsValid] = useState(true);
    const [swiftIsValid, setSwiftIsValid] = useState(true);

    const [validationError, setValidationError] = useState({iban : false, swift: false})

    const {setIsFormValidBank} = useGlobalContext()


    useLayoutEffect(() => {
        if(outputDetails.factoryCompany !== undefined) {
            setIsFactoryCompany(outputDetails.factoryCompany)
        }
        if(outputDetails.nameIsDifferentFromBankAccountName !== undefined) {
            setIsAccountDiffHolderName(outputDetails.nameIsDifferentFromBankAccountName)
        }
        if(outputDetails.effectiveDate !== undefined) {
            setDate(outputDetails.effectiveDate)
        }
    }, [outputDetails.factoryCompany, outputDetails.nameIsDifferentFromBankAccountName, outputDetails.effectiveDate])

    const bankFormValidator = () => {
        const booleanArray = [validationError.iban,validationError.swift];
        setIsFormValidBank(booleanArray.every(bool => bool));
    }

    const ibanValidator = (isActuallyValid : boolean) => {
        let validation = IBAN.isValid(outputDetails.ibanNumber);
        if (isActuallyValid) {
            validationError.iban = validation;
            setValidationError({...validationError})
        } else {
            setIbanIsValid(validation);
        }

    }

    const swiftValidator = (isActuallyValid : boolean) => {
        if(outputDetails.swiftCode !== undefined) {
            let validation = bicValidator.isValid(outputDetails.swiftCode)
            if (isActuallyValid) {
                validationError.swift = validation;
                setValidationError({...validationError})
            } else {
                setSwiftIsValid(validation)
            }

        }
    }

    return(
        <div>
            <h2 className="mb-5">B. Supplier bank details</h2>
            <form className="d-flex flex-column gap-3" >
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank name<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               defaultValue={outputDetails.bankName} onChange={(event) => outputDetails.bankName = event.target.value}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank account currency</label>
                        <select className="custom-select custom-input input-lg"
                                value={outputDetails.bankAccountCurrency} onChange={(event) => setCurrency(outputDetails.bankAccountCurrency = event.target.value)} >
                            {
                                Array.from(new Set(countries.filter(country => country.currency !== null)
                                    .sort((a, b) => a.currency.name > b.currency.name ? 1 : -1)
                                    .map(country => country.currency.name)
                                )).map((currency, index) => {
                                    return (
                                        <option key={index}>{currency}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Effective date</label>
                        <input type="date" className="custom-input custom-date input-lg"
                               defaultValue={date} onChange={(event) => {
                                    setDate(event.target.value)
                                    outputDetails.effectiveDate = event.target.value
                        }} />
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank account holder name</label>
                        <input type="text" className="custom-input input-lg"
                               defaultValue={outputDetails.bankAccountHolderName} onChange={(event) => outputDetails.bankAccountHolderName = event.target.value} />
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div id="accountHolderName" className="d-flex flex-column">
                        <label htmlFor="accountHolderName" className="font-input-label">Supplier name is different from bank account holder name?</label>
                        <div className="d-flex gap-6">
                            <div className="d-flex gap-2">
                                <input type="radio" id="yesAccount" name="accountHolderName" hidden={true} checked={isAccountDiffHolderName === true}
                                       onChange={() =>  {
                                           setIsAccountDiffHolderName(true)
                                           outputDetails.nameIsDifferentFromBankAccountName = true
                                       }}/>
                                <label htmlFor="yesAccount" className="custom-radio"></label>
                                <label htmlFor="yesAccount">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noAccount" name="accountHolderName" hidden={true} checked={isAccountDiffHolderName === false}
                                       onChange={() => {
                                           setIsAccountDiffHolderName(false)
                                           outputDetails.nameIsDifferentFromBankAccountName = false
                                       }}/>
                                <label htmlFor="noAccount" className="custom-radio"></label>
                                <label htmlFor="noAccount">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Reason<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg" disabled={!outputDetails.nameIsDifferentFromBankAccountName}
                               defaultValue={outputDetails.reasonName} onChange={(event) => outputDetails.reasonName = event.target.value}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div id="factoryCompany" className="d-flex flex-column">
                        <label htmlFor="factoryCompany" className="font-input-label">Factory company?</label>
                        <div className="d-flex gap-6">
                            <div className="d-flex gap-2">
                                <input type="radio" id="yesFactory" name="factoryCompany" hidden={true} checked={isFactoryCompany === true}
                                       onChange={() => {
                                           setIsFactoryCompany(true)
                                           outputDetails.factoryCompany = true
                                       }}/>
                                <label htmlFor="yesFactory" className="custom-radio"></label>
                                <label htmlFor="yesFactory">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noFactory" name="factoryCompany" hidden={true} checked={isFactoryCompany === false}
                                       onChange={() => {
                                           setIsFactoryCompany(false)
                                           outputDetails.factoryCompany = false
                                       }}/>
                                <label htmlFor="noFactory" className="custom-radio"></label>
                                <label htmlFor="noFactory">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Reason<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg" disabled={!outputDetails.factoryCompany}
                               defaultValue={outputDetails.reasonFactory} onChange={(event) => outputDetails.reasonFactory = event.target.value}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">Bank account number<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               defaultValue={outputDetails.bankAccountNumber} onChange={(event) => outputDetails.bankAccountNumber = event.target.value}/>
                    </div>
                </div>
                <div id="bankContainer" className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">
                            IBAN number<span className="red">*</span>
                            {ibanIsValid ? "" : <small> : <small className="red">Invalid</small></small>}
                        </label>
                        <input type="text" className={"custom-input input-lg " + (ibanIsValid ? "" : "red")} onBlur={() => ibanValidator(false)}
                               defaultValue={outputDetails.ibanNumber} onChange={(event) => {
                            outputDetails.ibanNumber = event.target.value;
                            ibanValidator(true);
                            bankFormValidator();
                        }}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="font-input-label">
                            SWIFT code<span className="red">*</span>
                            {swiftIsValid ? "" : <small> : <small className="red">Invalid</small></small>}
                        </label>
                        <input type="text" className={"custom-input input-lg " + (swiftIsValid ? "" : "red")} onBlur={() => swiftValidator(false)}
                               defaultValue={outputDetails.swiftCode} onChange={(event) => {
                            outputDetails.swiftCode = event.target.value;
                            swiftValidator(true);
                            bankFormValidator();
                        }}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label id="sortCodeLabel" className="d-flex font-input-label txt-nowrap">SORT code (UK) / FIK (Denmark) / GIRO (Sweden)<span className="red">*</span></label>
                        <input type="text" className="custom-input input-lg"
                               defaultValue={outputDetails.sortCode} onChange={(event) => outputDetails.sortCode = event.target.value}/>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default SupplierBankDetailsUpsert;
