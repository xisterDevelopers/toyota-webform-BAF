export interface SupplierBankDetailsObject {
    bankName?: string;
    bankAccountCurrency?: string;
    effectiveDate?: string;
    bankAccountHolderName?: string;
    //isSupplierDifferent è una stringa nel BE
    isSupplierDifferentFromHolderName?: boolean;
    supplierDifferentReason?: string;
    //isFactoryCompany è una stringa nel BE
    isFactoryCompany?: boolean;
    factoryCompanyReason?: string;
    bankAccountNumber?: string;
    ibanNumber?: string;
    swiftNumber?: string;
    sortCode?: string;
}