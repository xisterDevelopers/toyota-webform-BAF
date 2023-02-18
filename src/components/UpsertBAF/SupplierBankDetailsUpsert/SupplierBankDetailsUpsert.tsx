import React, {FC, useLayoutEffect, useState} from 'react';
import './SupplierBankDetailsUpsert.css';
import bicValidator from 'bic-validator';
import {useGlobalContext} from "../../../utils/AppContext";
import {SupplierBankDetailsObject} from "../../../models/SupplierBankDetailsObject.model";
import {CurrencyObject} from "../../../models/CurrencyObject.model";

const IBAN = require('iban');

interface SupplierBankDetailsUpsertProps {
    outputDetails: SupplierBankDetailsObject;
    currencies: CurrencyObject[]
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
    iban: null | boolean;
    swift: null | boolean;
    // IBAN SWIFT SORT FIK GIRO (cca già importato)
}

const SupplierBankDetailsUpsert: FC<SupplierBankDetailsUpsertProps> = ({outputDetails, currencies, cca}) => {
    const [currency, setCurrency] = useState(outputDetails.bankAccountCurrency);
    const [date, setDate] = useState<string>(outputDetails.effectiveDate ?? '');
    const [isAccountDiffHolderName, setIsAccountDiffHolderName] = useState(outputDetails.isSupplierDifferentFromHolderName);
    const [isFactoryCompany, setIsFactoryCompany] = useState(outputDetails.isFactoryCompany);
    //const [ibanIsValid, setIbanIsValid] = useState(outputDetails.ibanNumber !== undefined);
    //const [swiftIsValid, setSwiftIsValid] = useState(outputDetails.swiftNumber !== undefined);
/*    const [validationError, setValidationError] = useState()*/
    const [validationRequired, setValidationRequired] = useState<BankValidationRequired>({
        bankAccountCurrency: outputDetails.bankAccountCurrency !== null && outputDetails.bankAccountCurrency !== undefined && outputDetails.bankAccountCurrency.length > 0 ? true : null,
        bankAccountHolderName: outputDetails.bankAccountHolderName !== null && outputDetails.bankAccountHolderName !== undefined && outputDetails.bankAccountHolderName.length > 0 ? true : null,
        bankAccountNumber: outputDetails.bankAccountNumber !== null && outputDetails.bankAccountNumber !== undefined && outputDetails.bankAccountNumber.length > 0 ? true : null,
        effectiveDate: outputDetails.effectiveDate !== null && outputDetails.effectiveDate !== undefined && outputDetails.effectiveDate.length > 0 ? true : null,
        factoryReason: outputDetails.factoryCompanyReason !== null && outputDetails.factoryCompanyReason !== undefined && outputDetails.factoryCompanyReason.length > 0 ? true : null,
        isFactoryCompany: outputDetails.isFactoryCompany !== null && outputDetails.isFactoryCompany !== undefined ? true : null,
        isSupplierNameDifferent: outputDetails.isSupplierDifferentFromHolderName !== null && outputDetails.isSupplierDifferentFromHolderName !== undefined  ? true : null,
        reasonName: outputDetails.supplierDifferentReason !== null && outputDetails.supplierDifferentReason !== undefined && outputDetails.supplierDifferentReason.length > 0 ? true : null,
        bankName: outputDetails.bankName !== null && outputDetails.bankName !== undefined && outputDetails.bankName.length > 0 ? true : null,
        iban: outputDetails.ibanNumber !== null && outputDetails.ibanNumber !== undefined && outputDetails.ibanNumber.length > 0 ? true : null,
        swift: outputDetails.swiftNumber !== null && outputDetails.swiftNumber !== undefined && outputDetails.swiftNumber.length > 0 ? true : null,
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
        //if(outputDetails.ibanNumber !== undefined) {
        //    ibanValidator(true)
        //}
        //if(outputDetails.swiftNumber !== undefined) {
        //    swiftValidator(true)
        //}
        bankFormValidator();
        
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
            case 'iban':
                validationRequired.iban =
                    outputDetails.ibanNumber !== undefined && outputDetails.ibanNumber.length > 0 ? validationRequired.iban = true : false;
                break;
            case 'swift':
                validationRequired.swift =
                    outputDetails.swiftNumber !== undefined && outputDetails.swiftNumber.length > 0 ? validationRequired.swift = true : false;
                break;
        }
        setValidationRequired({...validationRequired})
        bankFormValidator()
    }
    const bankFormValidator = () => {
        const booleanArray = [validationRequired.iban, validationRequired.swift, validationRequired.bankName, validationRequired.bankAccountCurrency,
            validationRequired.effectiveDate,validationRequired.bankAccountHolderName,validationRequired.isSupplierNameDifferent,
            validationRequired.reasonName,validationRequired.isFactoryCompany,validationRequired.factoryReason,
            validationRequired.bankAccountNumber];
        setIsFormValidBank(booleanArray.every(bool => bool));
    }

    //const ibanValidator = (isActuallyValid : boolean) => {
    //    let validation = IBAN.isValid(outputDetails.ibanNumber);
    //    if (isActuallyValid) {
    //        validationError.iban = validation;
    //        setValidationError({...validationError})
    //    } else {
    //        setIbanIsValid(validation);
    //    }

    //}

    //const swiftValidator = (isActuallyValid : boolean) => {
    //    if(outputDetails.swiftNumber !== undefined) {
    //        let validation = bicValidator.isValid(outputDetails.swiftNumber)
    //        if (isActuallyValid) {
    //            validationError.swift = validation;
    //            setValidationError({...validationError})
    //        } else {
    //            setSwiftIsValid(validation)
    //        }

    //    }
    //}

    return(
        <div>
            <h2 className="mb-5 section-A-font-title">B. Supplier bank details</h2>
            <div className="info-container pb-5">
                <p><strong>Note to Vendors:</strong> Toyota is mindful of the risks involved with the creation and maintenance of Vendor bank details.
                    To mitigate there risks and to protect your interests, as well as the interests of Toyota,
                    creation or update of bank account will be processed based on the completed, authorised and verified information on this form only.</p>
            </div>
            <form className="d-flex flex-column gap-3" >
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Bank name<span className="red">*</span>
                            {!validationRequired.bankName && validationRequired.bankName !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" onBlur={() => requireValidator('bankName')}
                               defaultValue={outputDetails.bankName} onChange={(event) => {
                                    outputDetails.bankName = event.target.value;
                                    requireValidator('bankName');
                        }}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Bank account currency<span className="red">*</span>
                            {!validationRequired.bankAccountCurrency && validationRequired.bankAccountCurrency !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <select className="custom-select custom-input input-lg" onBlur={() => requireValidator('bankAccountCurrency')}
                                defaultValue={outputDetails.bankAccountCurrency} onChange={(event) => {
                                    setCurrency(outputDetails.bankAccountCurrency = event.target.value);
                                    requireValidator('bankAccountCurrency');
                        }} >
                            <option value=""></option>
                            {
                                currencies.map((currency, index) => {
                                    return (
                                        <option key={index}>{currency.currencyName}</option>
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
                                    outputDetails.effectiveDate = event.target.value;
                                    requireValidator('effectiveDate');
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
                               defaultValue={outputDetails.bankAccountHolderName} onChange={(event) => {
                                    outputDetails.bankAccountHolderName = event.target.value;
                                    requireValidator('bankAccountHolderName');
                        }} />
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
                                <input type="radio" id="yesAccount" name="accountHolderName" hidden={true} checked={isAccountDiffHolderName === "Yes"}
                                       onChange={() =>  {
                                           validationRequired.isSupplierNameDifferent = true;
                                           validationRequired.reasonName = false;
                                           setIsAccountDiffHolderName("Yes")
                                           outputDetails.isSupplierDifferentFromHolderName = "Yes"
                                       }}/>
                                <label htmlFor="yesAccount" className="custom-radio"></label>
                                <label htmlFor="yesAccount">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noAccount" name="accountHolderName" hidden={true} checked={isAccountDiffHolderName === "No"}
                                       onChange={() => {
                                           validationRequired.isSupplierNameDifferent = true;
                                           validationRequired.reasonName = true;
                                           setIsAccountDiffHolderName("No")
                                           outputDetails.isSupplierDifferentFromHolderName = "No"
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
                        <input type="text" className="custom-input input-lg" disabled={outputDetails.isSupplierDifferentFromHolderName == "No"} onBlur={() => requireValidator('reasonName')}
                               defaultValue={outputDetails.supplierDifferentReason} onChange={(event) => {
                                    outputDetails.supplierDifferentReason = event.target.value;
                                    requireValidator('reasonName')
                        }}/>
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
                                <input type="radio" id="yesFactory" name="factoryCompany" hidden={true} checked={isFactoryCompany === "Yes"}
                                       onChange={() => {
                                           validationRequired.isFactoryCompany = true;
                                           validationRequired.factoryReason = false;
                                           setIsFactoryCompany("Yes")
                                           outputDetails.isFactoryCompany = "Yes"
                                       }}/>
                                <label htmlFor="yesFactory" className="custom-radio"></label>
                                <label htmlFor="yesFactory">Yes</label>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="radio" id="noFactory" name="factoryCompany" hidden={true} checked={isFactoryCompany === "No"}
                                       onChange={() => {
                                           validationRequired.isFactoryCompany = true;
                                           validationRequired.factoryReason = true;
                                           setIsFactoryCompany("No")
                                           outputDetails.isFactoryCompany = "No"
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
                        <input type="text" className="custom-input input-lg" disabled={outputDetails.isFactoryCompany === "No"} onBlur={() => requireValidator('factoryReason')}
                               defaultValue={outputDetails.factoryCompanyReason} onChange={(event) => {
                                    outputDetails.factoryCompanyReason = event.target.value;
                                    requireValidator('factoryReason');
                        }}/>
                    </div>
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column container-lg">
                        <label className="font-input-label">
                            Bank account number<span className="red">*</span>
                            {!validationRequired.bankAccountNumber && validationRequired.bankAccountNumber !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" onBlur={() => requireValidator('bankAccountNumber')}
                               defaultValue={outputDetails.bankAccountNumber} onChange={(event) => {
                                    outputDetails.bankAccountNumber = event.target.value;
                                    requireValidator('bankAccountNumber')
                        }}/>
                    </div>
                </div>
                <div id="bankContainer" className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label className="font-input-label">
                            IBAN number<span className="red">*</span>
                            {!validationRequired.iban && validationRequired.iban !== null ? <small> : <small className="red">Invalid</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" onBlur={() => requireValidator('iban')}
                               defaultValue={outputDetails.ibanNumber} onChange={(event) => {
                            outputDetails.ibanNumber = event.target.value;
                                   requireValidator('iban')
                        }}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="font-input-label">
                            SWIFT code<span className="red">*</span>
                            {!validationRequired.swift && validationRequired.swift !== null ? <small> : <small className="red">Invalid</small></small> : ""}
                        </label>
                        <input type="text" className="custom-input input-lg" onBlur={() => requireValidator('swift')}
                            defaultValue={outputDetails.swiftNumber} onChange={(event) => {
                                outputDetails.swiftNumber = event.target.value;
                                requireValidator('swift')
                            }} />
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
