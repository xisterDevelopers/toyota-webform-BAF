import React, {FC} from 'react';
import './UpsertBAF.css';
import {useParams} from "react-router-dom";
import UploadFile from "../../shared/UploadFile/UploadFile";

interface UpsertBafProps {}

const UpsertBaf: FC<UpsertBafProps> = () => {
    let {id} = useParams();

    const overrideEventDefaults = (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        overrideEventDefaults(event)
        console.log(event.dataTransfer.files);
    }

    const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        overrideEventDefaults(event)
        console.log(event.target.files);
    }

    return(
        <div className="UpsertBAF">
            <UploadFile handleDrop={handleDrop} upload={upload} overrideEventDefaults={overrideEventDefaults} />
        </div>
    );
}


export default UpsertBaf;
