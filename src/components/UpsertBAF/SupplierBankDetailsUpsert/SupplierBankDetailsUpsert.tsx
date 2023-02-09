import React, {FC, useLayoutEffect, useState} from 'react';
import './SupplierBankDetailsUpsert.css';
import {CountryModel} from "../../../models/country.model";
import bicValidator from 'bic-validator';
import {useGlobalContext} from "../../../utils/AppContext";
import {SupplierBankDetailsObject} from "../../../models/SupplierBankDetailsObject.model";
const IBAN = require('iban');

interface SupplierBankDetailsUpsertProps {
    outputDetails: SupplierBankDetailsObject;
    countries: CountryModel[]
    cca: string | undefined;
}

interface BankValidationRequired {
    bankName: null | boolean;
    bankAccountCurrency: null | boolean;
    effectiveDate: null | boolean;
    bankAccountHolderName: null | boolean;
    isSupplierNameDifferent: null | boolean;
    reasonName: null | boolean;
    isFactoryCompany: null | boolean;
    factoryReason: null | boolean;
    bankAccountNumber: null | boolean;
    // IBAN SWIFT SORT FIK GIRO (cca già importato)
}

const SupplierBankDetailsUpsert: FC<SupplierBankDetailsUpsertProps> = ({outputDetails, countries,cca}) => {
    const [currency, setCurrency] = useState(outputDetails.bankAccountCurrency);
    const [date, setDate] = useState<string>(outputDetails.effectiveDate ?? '');
    const [isAccountDiffHolderName, setIsAccountDiffHolderName] = useState(outputDetails.isSupplierDifferentFromHolderName);
    const [isFactoryCompany, setIsFactoryCompany] = useState(outputDetails.isFactoryCompany);
    const [ibanIsValid, setIbanIsValid] = useState(true);
    const [swiftIsValid, setSwiftIsValid] = useState(true);
    const [validationError, setValidationError] = useState({iban : false, swift: false})
    const [validationRequired, setValidationRequired] = useState<BankValidationRequired>({
        bankAccountCurrency: null,
        bankAccountHolderName: null,
        bankAccountNumber: null,
        effectiveDate: null,
        factoryReason: null,
        isFactoryCompany: null,
        isSupplierNameDifferent: null,
        reasonName: null,
        bankName: null
    })

    const {setIsFormValidBank} = useGlobalContext()


    useLayoutEffect(() => {
        if(outputDetails.isFactoryCompany !== undefined) {
            setIsFactoryCompany(outputDetails.isFactoryCompany)
        }
        if(outputDetails.isSupplierDifferentFromHolderName !== undefined) {
            setIsAccountDiffHolderName(outputDetails.isSupplierDifferentFromHolderName)
        }
        if(outputDetails.effectiveDate !== undefined) {
            setDate(outputDetails.effectiveDate)
        }
        if(outputDetails.ibanNumber !== undefined) {
            ibanValidator(true)
        }
        if(outputDetails.swiftNumber !== undefined) {
            swiftValidator(true)
        }
        bankFormValidator()
    }, [outputDetails.isFactoryCompany, outputDetails.isSupplierDifferentFromHolderName, outputDetails.effectiveDate, outputDetails.ibanNumber, outputDetails.swiftNumber])

    const requireValidator = (field : string) => {
        switch(field) {
            case 'bankName':
                validationRequired.bankName =
                    outputDetails.bankName !== undefined && outputDetails.bankName?.length > 0 ? validationRequired.bankName = true : false;
                break;
            case 'bankAccountCurrency':
                validationRequired.bankAccountCurrency =
                    outputDetails.bankAccountCurrency !== undefined && outputDetails.bankAccountCurrency?.length > 0 ? validationRequired.bankAccountCurrency = true : false;
                break;
            case 'effectiveDate':
                validationRequired.effectiveDate =
                    outputDetails.effectiveDate !== undefined && outputDetails.effectiveDate?.length > 0 ? validationRequired.effectiveDate = true : false;
                break;
            case 'bankAccountNumber':
                validationRequired.bankAccountNumber =
                    outputDetails.bankAccountNumber !== undefined && outputDetails.bankAccountNumber.length > 0 ? validationRequired.bankAccountNumber = true : false;
                break;
            case 'isSupplierNameDifferent':
                validationRequired.isSupplierNameDifferent =
                    outputDetails.isSupplierDifferentFromHolderName !== null ? validationRequired.isSupplierNameDifferent = true : false;
                break;
            case 'isFactoryCompany':
                validationRequired.isFactoryCompany =
                    outputDetails.isFactoryCompany !== null ? validationRequired.isFactoryCompany = true : false;
                break;
            case 'bankAccountHolderName':
                validationRequired.bankAccountHolderName =
                    outputDetails.bankAccountHolderName !== undefined && outputDetails.bankAccountHolderName.length > 0 ? validationRequired.bankAccountHolderName = true : false;
                break;
            case 'reasonName':
                validationRequired.reasonName =
                    outputDetails.supplierDifferentReason !== undefined && outputDetails.supplierDifferentReason.length > 0 ? validationRequired.reasonName = true : false;
                break;
            case 'factoryReason':
                validationRequired.factoryReason =
                    outputDetails.factoryCompanyReason !== undefined && outputDetails.factoryCompanyReason.length > 0 ? validationRequired.factoryReason = true : false;
                break;

            // case 'phoneNumber':
            //     validationRequired.phoneNumber =
            //         outputDetails.phoneNumber !== undefined && outputDetails.phoneNumber.length > 0 ? validationRequired.phoneNumber = true : false;
            //     break;
            // case 'vatNumber':
            //     validationRequired.vatNumber =
            //         outputDetails.vatNumber !== undefined && outputDetails.vatNumber.length > 0 ? validationRequired.vatNumber = true : false;
            //     break;
            // case 'taxResidenceCountry':
            //     validationRequired.taxResidenceCountry =
            //         outputDetails.taxResidenceCountry !== undefined && outputDetails.taxResidenceCountry.length > 0 ? validationRequired.taxResidenceCountry = true : false;
            //     break;
        }
        setValidationRequired({...validationRequired})
        bankFormValidator()
    }
    const bankFormValidator = () => {
        const booleanArray = [validationError.iban,validationError.swift, validationRequired.bankName, validationRequired.bankAccountCurrency,
            validationRequired.effectiveDate,validationRequired.bankAccountHolderName,validationRequired.isSupplierNameDifferent,
            validationRequired.reasonName,validationRequired.isFactoryCompany,validationRequired.factoryReason,
            validationRequired.bankAccountNumber];
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
        if(outputDetails.swiftNumber !== undefined) {
            let validation = bicValidator.isValid(outputDetails.swiftNumber)
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
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Bank name<span className="red">*</span>
                            {!validationRequired.bankName && validationRequired.bankName !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" onBlur={() => requireValidator('bankName')}
                               defaultValue={outputDetails.bankName} onChange={(event) => outputDetails.bankName = event.target.value}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Bank account currency<span className="red">*</span>
                            {!validationRequired.bankAccountCurrency && validationRequired.bankAccountCurrency !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <select className="custom-select custom-input input-lg" onBlur={() => requireValidator('bankAccountCurrency')}
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
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Effective date<span className="red">*</span>
                            {!validationRequired.effectiveDate && validationRequired.effectiveDate !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="date" className="custom-input custom-date input-lg" onBlur={() => requireValidator('effectiveDate')}
                               defaultValue={date} onChange={(event) => {
                                    setDate(event.target.value)
                                    outputDetails.effectiveDate = event.target.value
                        }} />
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Bank account holder name<span className="red">*</span>
                            {!validationRequired.bankAccountHolderName && validationRequired.bankAccountHolderName !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" onBlur={() => requireValidator('bankAccountHolderName')}
                               defaultValue={outputDetails.bankAccountHolderName} onChange={(event) => outputDetails.bankAccountHolderName = event.target.value} />
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div id="accountHolderName" className="d-flex flex-column">
                        <label htmlFor="accountHolderName" className="font-input-label">
                            Supplier name is different from bank account holder name?<span className="red">*</span>
                            {!validationRequired.isSupplierNameDifferent && validationRequired.isSupplierNameDifferent !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <div className="d-flex gap-6">
                            <div className="d-flex gap-2">
                                <input type="radio" id="yesAccount" name="accountHolderName" hidden={true} checked={isAccountDiffHolderName === true}
                                       onChange={() =>  {
                                           validationRequired.isSupplierNameDifferent = true;
                                           validationRequired.reasonName = false;
                                           setIsAccountDiffHolderName(true)
                                           outputDetails.isSupplierDifferentFromHolderName = true
                                       }}/>
                                <label htmlFor="yesAccount" className="custom-radio"></label>
                                <label htmlFor="yesAccount">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noAccount" name="accountHolderName" hidden={true} checked={isAccountDiffHolderName === false}
                                       onChange={() => {
                                           validationRequired.isSupplierNameDifferent = true;
                                           validationRequired.reasonName = true;
                                           setIsAccountDiffHolderName(false)
                                           outputDetails.isSupplierDifferentFromHolderName = false
                                       }}/>
                                <label htmlFor="noAccount" className="custom-radio"></label>
                                <label htmlFor="noAccount">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Reason<span className="red">*</span>
                            {!validationRequired.reasonName && validationRequired.reasonName !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" disabled={!outputDetails.isSupplierDifferentFromHolderName} onBlur={() => requireValidator('reasonName')}
                               defaultValue={outputDetails.supplierDifferentReason} onChange={(event) => outputDetails.supplierDifferentReason = event.target.value}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div id="factoryCompany" className="d-flex flex-column">
                        <label htmlFor="factoryCompany" className="font-input-label">
                            Factory company?<span className="red">*</span>
                            {!validationRequired.isFactoryCompany && validationRequired.isFactoryCompany !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <div className="d-flex gap-6">
                            <div className="d-flex gap-2">
                                <input type="radio" id="yesFactory" name="factoryCompany" hidden={true} checked={isFactoryCompany === true}
                                       onChange={() => {
                                           validationRequired.isFactoryCompany = true;
                                           validationRequired.factoryReason = false;
                                           setIsFactoryCompany(true)
                                           outputDetails.isFactoryCompany = true
                                       }}/>
                                <label htmlFor="yesFactory" className="custom-radio"></label>
                                <label htmlFor="yesFactory">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noFactory" name="factoryCompany" hidden={true} checked={isFactoryCompany === false}
                                       onChange={() => {
                                           validationRequired.isFactoryCompany = true;
                                           validationRequired.factoryReason = true;
                                           setIsFactoryCompany(false)
                                           outputDetails.isFactoryCompany = false
                                       }}/>
                                <label htmlFor="noFactory" className="custom-radio"></label>
                                <label htmlFor="noFactory">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Reason<span className="red">*</span>
                            {!validationRequired.factoryReason && validationRequired.factoryReason !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" disabled={!outputDetails.isFactoryCompany} onBlur={() => requireValidator('factoryReason')}
                               defaultValue={outputDetails.factoryCompanyReason} onChange={(event) => outputDetails.factoryCompanyReason = event.target.value}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Bank account number<span className="red">*</span>
                            {!validationRequired.bankAccountNumber && validationRequired.bankAccountNumber !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" onBlur={() => requireValidator('bankAccountNumber')}
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
                               defaultValue={outputDetails.swiftNumber} onChange={(event) => {
                            outputDetails.swiftNumber = event.target.value;
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
