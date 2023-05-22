import {useState, useEffect} from 'react';
import axios from 'axios';

export const useFetch = (initialData) => {
    const [data, setData] = useState(initialData); // initialData is the initial value of the data
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [method, setMethod] = useState("get");
    const [body, setBody] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                return; // if url is empty, do nothing
            }
            setErrors({})
            setIsLoading(true);
            try {
                const result = await doAxios();
                console.log(result);
                setData(result.data);
            } catch (error) {
                console.log(error.response);
                setErrors({
                    message: error.message,
                    status: error.response.status,
                    statusText: error.response.statusText
                });
            } finally {
                setIsLoading(false);
            }
        };

        async function doAxios() {
            switch (method) {
                case 'post' || 'put':
                    return axios({url, method, body, headers: {'Content-Type': 'application/json'}});
                default:
                    return axios({url, method});
            }
        }

        fetchData(); // execute the function above

    }, [url]);

    /**
     * function to set the values of the hook (url, method, body)
     *
     * @param url
     * @param method
     * @param body
     */
    const setValues = (url, method, body = {}) => {
        setUrl(url);
        setMethod(method);
        setBody(body);
    }

    return [{data, isLoading, errors}, setValues]; // return the data and the URL setter function
};