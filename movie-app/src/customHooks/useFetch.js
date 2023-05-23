import {useState, useEffect} from 'react';
import axios from 'axios';

export const useFetch = (initialData) => {
    const [data, setData] = useState(initialData); // initialData is the initial value of the data
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [method, setMethod] = useState("get");
    const [body, setBody] = useState({});

    function setValues(url, method, body = {}) {
        setUrl(url);
        setMethod(method);
        setBody(body);
    }

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
                setUrl("") // reset url to empty string to allow refetching the same url in case of error
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
                    return axios({url, method, data: body, headers: {'Content-Type': 'application/json'}});
                default:
                    return axios({url, method});
            }
        }

        fetchData(); // execute the function above

    }, [url, method, body]); // trigger the effect when url changes

    /**
     * function to set the values of the hook (url, method, body)
     *
     * @param url
     * @param method
     * @param body
     */

    return [{data, isLoading, errors}, setValues]; // return the data and the URL setter function
};