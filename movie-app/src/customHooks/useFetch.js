import {useState, useEffect} from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch data from an API
 * @param initialData - initial value of the data (used to initialize the state)
 * @returns {[{isLoading: boolean, data: unknown, errors: {}},setValues: function]} - returns the data, the loading state and the errors
 */
export const useFetch = (initialData) => {
    const [data, setData] = useState(initialData); // initialData is the initial value of the data
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [method, setMethod] = useState('GET');
    const [body, setBody] = useState({});

    /**
     * function to set the values of the hook (url, method, body) and trigger the fetch
     * @param url - url to fetch
     * @param method - method to use (GET, POST, PUT, DELETE)
     * @param body - body of the request
     */
    function setValues(url, method = 'GET', body = {}) {
        setMethod(method);
        setBody(body);
        setUrl(url);
    }

    /**
     * Effect to fetch data from the API
     * @returns {data, isLoading, errors} - returns the data, the loading state and the errors
     */
    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                return; // if url is empty, do nothing
            }
            setErrors({})
            setIsLoading(true);
            try {
                const result = await doAxios();
                setData(result.data);
            } catch (error) {
                console.log(error);
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
            switch (method.toUpperCase()) {
                case 'POST' || 'PUT':
                    return axios({url, method, data: body, headers: {'Content-Type': 'application/json'}});
                default:
                    return axios({url, method});
            }
        }

        fetchData(); // execute the function above

    }, [url, method, body]); // trigger the effect when url changes

    return [{data, isLoading, errors}, setValues]; // return the data and the URL setter function
};