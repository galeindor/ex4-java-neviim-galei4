import {Button, FloatingLabel, Form} from "react-bootstrap";
import {CURRENCY, formErrors, REST_API_CHECKOUT_URL} from "../../constants";
import {useFetch} from "../../customHooks/useFetch";
import {useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function CheckoutForm({total, emptyCart}) {
    const [{data, isLoading, errors}, doFetch] = useFetch(false);
    const [fieldErrors, setFieldErrors] = useState({email: '', firstName: '', lastName: '', error: ''});

    /**
     * Handles the form submission and calls the checkout endpoint
     * validates the form before submission and displays errors if any
     * if checkout is successful , empties the cart
     * @param e {Event} form submission event
     * @returns {Promise<void>} void
     */
    async function onSubmit(e) {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            payment: total
        }
        if (!validateForm(data)) {
            return;
        }
        doFetch(REST_API_CHECKOUT_URL, "post", data);
    }

    useEffect(() => {
        if (errors && errors.status) {
            if (errors.status === 400) {
                setFieldErrors(errors);
            } else {
                setFieldErrors({...fieldErrors, error: "Error checking out , please try again later"});
            }
        }
        if (data) {
            emptyCart(); // empty cart if checkout is successful
        }
    }, [data]);

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validateName(name) {
        return name.length > 0 && name.length < 50 && name.match(/^[a-zA-Z]+$/);
    }

    function validateForm(data) {
        let errorList = {};
        if (!data.email || !data.firstName || !data.lastName) {
            errorList["error"] = formErrors.EMPTY;
        }
        if (!validateEmail(data.email)) {
            errorList["email"] = formErrors.INVALID_EMAIL;
        }
        if (!validateName(data.firstName)) {
            errorList["firstName"] = formErrors.INVALID_FIRST_NAME;
        }
        if (!validateName(data.lastName)) {
            errorList["lastName"] = formErrors.INVALID_LAST_NAME;
        }
        setFieldErrors(errorList);
        return Object.keys(errorList).length === 0;
    }

    return (
        <>
            <Form className={"mt-3"} onSubmit={onSubmit}>
                {fieldErrors.error && <Form.Text className="text-danger">{fieldErrors.error}</Form.Text>}
                <FloatingLabel label="Email address" className="mb-3"
                >
                    <Form.Control name="email" type="email" placeholder="Email"/>
                    {fieldErrors.email && <Form.Text className="text-danger">{fieldErrors.email}</Form.Text>}
                </FloatingLabel>

                <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control name="firstName" type="text" placeholder="First Name"/>
                    {fieldErrors.firstName && <Form.Text className="text-danger">{fieldErrors.firstName}</Form.Text>}
                </FloatingLabel>

                <FloatingLabel label="Last Name" className="mb-3">
                    <Form.Control name="lastName" type="text" placeholder="Last Name"/>
                    {fieldErrors.lastName && <Form.Text className="text-danger">{fieldErrors.lastName}</Form.Text>}
                </FloatingLabel>

                <FloatingLabel label="Total" className="mb-3">
                    <Form.Control type="text" value={total + CURRENCY} name={"payment"} disabled/>
                </FloatingLabel>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            {isLoading && <LoadingSpinner/>}
        </>
    )
}