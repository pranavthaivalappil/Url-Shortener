import { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import DataTable from "./DataTable";
import { UrlData } from "../interface/UrlData";
import axios from "axios";

const Container = () => {
    const [data, setData] = useState<UrlData[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    const updateReloadState = () => {
        setReload(!reload);
    };

    const fetchUrls = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/shortUrl");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, [reload]);

    return (
        <>
            <FormContainer updateReloadState={updateReloadState} />
            <DataTable data={data} updateReloadState={updateReloadState} />
        </>
    );
};

export default Container;