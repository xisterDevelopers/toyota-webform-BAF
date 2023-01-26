import axios from "axios";

const httpCommon = axios.create({
    baseURL: "http://localhost:3004",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpCommon;
