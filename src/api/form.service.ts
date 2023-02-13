import axios from "axios";
import {BAFObjectDTO} from "../models/BAFObjectDTO.model";
import {SubmitBAFRequestDTO} from "../models/SubmitBAFRequestDTO..model";
import {ValuesDTO} from "../models/ValuesDTO.model";
import {BaseResponseDTO} from "../models/BaseResponseDTO.model";

const Get = (id: string) : Promise<BAFObjectDTO> => {
    return axios.get(process.env.REACT_APP_API_URL! + '/Form/' + id);
};

const GetD365Values = () : Promise<ValuesDTO> => {
    return axios.get(process.env.REACT_APP_API_URL! + '/Form/GetD365Values');
};

const SaveBAFDraft = (bafObjectDTO: BAFObjectDTO) : Promise<BaseResponseDTO> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Form/SaveBAFDraft', bafObjectDTO);
};

const SubmitBAF = (bafObjectDTO: BAFObjectDTO) : Promise<BaseResponseDTO> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Form/SubmitBAF', bafObjectDTO);
};

const SubmitBAFWithPEC = (submitBAFRequestDTO: SubmitBAFRequestDTO) : Promise<BaseResponseDTO> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Form/SubmitBAFWithPEC', submitBAFRequestDTO);
};

const ReturnBAFInSupplierPending = (bafId: string) : Promise<BaseResponseDTO> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Form/ReturnBAFInSupplierPending/' + bafId);
};

const FormService = {
    Get,
    GetD365Values,
    SaveBAFDraft,
    SubmitBAF,
    SubmitBAFWithPEC,
    ReturnBAFInSupplierPending
};

export default FormService;
