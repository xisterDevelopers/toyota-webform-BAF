import {CurrencyModel} from "./currency.model";

export interface CountryModel {
    name: string;
    cca2: string;
    idd: string[];
    currency: CurrencyModel
}
