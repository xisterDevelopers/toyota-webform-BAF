import {CurrencyObject} from "./CurrencyObject.model";
import {CountryObject} from "./CountryObject.model";
import {CompanySizeObject} from "./CompanySizeObject.model";
import {VatRegimeObject} from "./VatRegimeObject.model";

export interface ValuesDTO {
    currencies?: CurrencyObject[];
    countries?: CountryObject[];
    companySizes?: CompanySizeObject[];
    vatRegimes?: VatRegimeObject[];
    bafDocumentTypes?: string[];
}