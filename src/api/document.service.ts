import axios from "axios";
import {ChangeCategoryRequestDTO} from "../models/ChangeCategoryRequestDTO.model";
import {UpdateFileRequestDTO} from "../models/UpdateFileRequestDTO.model";
import {BafDocumentDTO} from "../models/BafDocumentDTO.model";
import {FileRequestDTO} from "../models/FileRequestDTO.model";
import {DownloadResponseDTO} from "../models/DownloadResponseDTO.model";
import {BaseResponseDTO} from "../models/BaseResponseDTO.model";

const getDocumentsByBAFId = (bafId: string) : Promise<BafDocumentDTO[]> => {
    return  axios.get(process.env.REACT_APP_API_URL! + '/document/getdocumentsbybafid/'+ bafId);
};

const downloadFile = (fileRequest : FileRequestDTO) : Promise<DownloadResponseDTO> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/document/downloadfile/', fileRequest)
}

const changeCategoryByFileURL = (changeCategoryRequestDTO: ChangeCategoryRequestDTO) : Promise<BaseResponseDTO> => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/document/changecategorybyfileurl', changeCategoryRequestDTO);
};

const uploadFileForBAF = (updateFileRequestDTO: UpdateFileRequestDTO) : Promise<BaseResponseDTO> => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/document/uploadfileforbaf', updateFileRequestDTO);
};

const deleteFileForBAF = (file: FileRequestDTO) : Promise<BaseResponseDTO> => {
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
