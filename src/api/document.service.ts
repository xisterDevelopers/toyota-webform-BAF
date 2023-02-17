import axios, { AxiosResponse } from "axios";
import {ChangeCategoryRequestDTO} from "../models/ChangeCategoryRequestDTO.model";
import {UpdateFileRequestDTO} from "../models/UpdateFileRequestDTO.model";
import {BafDocumentDTO} from "../models/BafDocumentDTO.model";
import {FileRequestDTO} from "../models/FileRequestDTO.model";
import {DownloadResponseDTO} from "../models/DownloadResponseDTO.model";
import {BaseResponseDTO} from "../models/BaseResponseDTO.model";

const getDocumentsByBAFId = (bafId: string): Promise<AxiosResponse<BafDocumentDTO[]>> => {
    return  axios.get(process.env.REACT_APP_API_URL! + '/document/getdocumentsbybafid?bafId='+ bafId);
};

const downloadFile = (fileRequest: FileRequestDTO): Promise<AxiosResponse<DownloadResponseDTO>> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/document/downloadfile/', fileRequest)
}

const changeCategoryByFileURL = (changeCategoryRequestDTO: ChangeCategoryRequestDTO): Promise<AxiosResponse<BaseResponseDTO>> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/document/updatefieldsbyfileURL', changeCategoryRequestDTO);
};

const uploadFileForBAF = (updateFileRequestDTO: UpdateFileRequestDTO): Promise<AxiosResponse<BaseResponseDTO>> => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/document/uploadfileforbaf', updateFileRequestDTO);
};

const deleteFileForBAF = (file: FileRequestDTO): Promise<AxiosResponse<BaseResponseDTO>> => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/document/deletefileforbaf/', file);
};

const DocumentService = {
    getDocumentsByBAFId,
    changeCategoryByFileURL,
    uploadFileForBAF,
    deleteFileForBAF,
    downloadFile
};

export default DocumentService;
