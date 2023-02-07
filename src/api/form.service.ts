import axios from "axios";
import {BAFObjectDTO} from "../models/BAFObjectDTO.model";
import {SubmitBAFRequestDTO} from "../models/SubmitBAFRequestDTO..model";

const Get = (id: number) => {
    return axios.get(process.env.REACT_APP_API_URL! + '/Form/' + id);
};

const GetD365Values = () => {
    return axios.get(process.env.REACT_APP_API_URL! + '/Form/GetD365Values');
};

const SaveBAFDraft = (bafObjectDTO: BAFObjectDTO) => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Form/SaveBAFDraft', bafObjectDTO);
};

const SubmitBAF = (bafObjectDTO: BAFObjectDTO) => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Form/SubmitBAF', bafObjectDTO);
};

const SubmitBAFWithPEC = (submitBAFRequestDTO: SubmitBAFRequestDTO) => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Form/SubmitBAFWithPEC', submitBAFRequestDTO);
};

const ReturnBAFInSupplierPending = (bafId: number) => {
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
