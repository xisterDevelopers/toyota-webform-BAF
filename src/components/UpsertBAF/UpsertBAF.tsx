import React, {FC} from 'react';
import './UpsertBAF.css';
import {useParams} from "react-router-dom";

interface UpsertBafProps {}

const UpsertBaf: FC<UpsertBafProps> = () => {
    let {id}= useParams();


    return(
        <div className="UpsertBAF">
            <p>{id}</p>
        </div>
    );
}


export default UpsertBaf;
