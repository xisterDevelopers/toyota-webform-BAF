export interface SupplierBankDetailsUpsertModel {
    bankName: string;
    bankAccountCurrency?: string;
    effectiveDate?: Date;
    bankAccountHolderName?: string;
    nameIsDifferentFromBankAccountName?: boolean;
    reasonName?: string;
    factoryCompany?: boolean;
    reasonFactory?: string;
    bankAccountNumber: string;
    ibanNumber: string;
    swiftCode: string;
    sortCode: string;
}