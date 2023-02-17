import axios, {AxiosResponse} from "axios";
import {BAFObjectDTO} from "../models/BAFObjectDTO.model";
import {SubmitBAFRequestDTO} from "../models/SubmitBAFRequestDTO..model";
import {ValuesDTO} from "../models/ValuesDTO.model";
import {BaseResponseDTO} from "../models/BaseResponseDTO.model";

const get = (id: string): Promise<AxiosResponse<BAFObjectDTO>> => {
    return axios.get(process.env.REACT_APP_API_URL! + '/form/' + id);
};

const getD365Values = () : Promise<AxiosResponse<ValuesDTO>> => {
    return axios.get(process.env.REACT_APP_API_URL! + '/form/getd365values');
};

const saveBAFDraft = (bafObjectDTO: BAFObjectDTO): Promise<AxiosResponse<BaseResponseDTO>> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/form/savebafdraft', bafObjectDTO);
};

const submitBAF = (bafObjectDTO: BAFObjectDTO): Promise<AxiosResponse<BaseResponseDTO>> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/form/submitbaf', bafObjectDTO);
};

const submitBAFWithPEC = (submitBAFRequestDTO: SubmitBAFRequestDTO): Promise<AxiosResponse<BaseResponseDTO>> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/form/submitbafwithpec', submitBAFRequestDTO);
};

const returnBAFInSupplierPending = (bafId: string): Promise<AxiosResponse<BaseResponseDTO>> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/form/returnbafinsupplierpending/' + bafId);
};

const FormService = {
    get,
    getD365Values,
    saveBAFDraft,
    submitBAF,
    submitBAFWithPEC,
    returnBAFInSupplierPending
};

export default FormService;
