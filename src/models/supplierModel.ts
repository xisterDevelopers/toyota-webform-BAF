import {SupplierIdentificationUpsertModel} from "./supplierIdentificationUpsert.model";
import {SupplierBankDetailsUpsertModel} from "./supplierBankDetailsUpsertModel";

export interface SupplierModel {
    identification?: SupplierIdentificationUpsertModel;
    bankDetails?: SupplierBankDetailsUpsertModel;
}