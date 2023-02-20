import React, { FC } from 'react';
import './UploadFile.css';
import upload from '../../assets/svg/upload.svg';
import Button from "../Button/Button";

interface UploadFileProps {
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    upload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    overrideEventDefaults: (event: React.DragEvent<HTMLDivElement>) => void;
    isMultiple: boolean;
    mainText: string;
}

const UploadFile: FC<UploadFileProps> = (uploadFileProps) => {

    const hiddenFileInput = React.useRef({ } as HTMLInputElement );

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    return(
        <div onDragOver={uploadFileProps.overrideEventDefaults} onDragEnter={uploadFileProps.overrideEventDefaults}
             onDragStart={uploadFileProps.overrideEventDefaults} onDragLeave={uploadFileProps.overrideEventDefaults}
             onDrop={uploadFileProps.handleDrop} className="UploadFile d-flex justify-center align-center flex-column w-100">
                <img width="69" height="54" className="" src={upload} alt="upload"/>
                <span className="mt-3 light-grey">
                  {uploadFileProps.mainText}
                </span>
                <span className="my-3 light-grey">
                  OR
                </span>
                <Button btnWidth={"150px"} color={"bg-dark-grey"} text={"Browse File"} textColor={"white"} onClick={handleClick} disabled={false} />
                <input type="file" multiple={uploadFileProps.isMultiple} style={{display: 'none'}}
                       ref={hiddenFileInput}
                       onChange={uploadFileProps.upload}/>
        </div>
    );
};

export default UploadFile;
