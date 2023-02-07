export interface SupplierBankDetailsObject {
    bankName?: string;
    bankAccountCurrency?: string;
    effectiveDate?: string;
    bankAccountHolderName?: string;
    isSupplierDifferentFromHolderName?: boolean;
    supplierDifferentReason?: string;
    isFactoryCompany?: boolean;
    factoryCompanyReason?: string;
    bankAccountNumber?: string;
    ibanNumber?: string;
    swiftNumber?: string;
    sortCode?: string;
}