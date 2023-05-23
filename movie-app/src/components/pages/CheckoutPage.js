import {Button, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import axios from "axios";
import {CURRENCY, REST_API_CHECKOUT_URL, REST_API_URL} from "../../constants";
import {useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function CheckoutPage() {

    const [total, setTotal] = useState(1);
    const [errors, setErrors] = useState({email: '', firstName: '', lastName: '', error: ''});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getTotal() {
            setIsLoading(true)
            const response = await axios.get(REST_API_URL + "/total");
            setTotal(response.data["total"].toFixed(2));
        }

        getTotal()
            .catch(e => setErrors(e.response.data))
            .finally(() => setIsLoading(false));
    }, []);

    async function emptyCart() {
        try {
            setIsLoading(true);
            const response = await axios.delete(REST_API_URL);
            console.log(response);
            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (e) {
            setErrors({...errors , error: "Error emptying cart , please try again later"});
        } finally {
            setIsLoading(false);
        }
    }

    async function onSubmit(e) {
        try {
            e.preventDefault();
            const data = {
                email: e.target.email.value,
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                payment: total
            }
            console.log(data);
            if(!validateForm(data)) {
                return;
            }
            setIsLoading(true);
            const response = await axios.post(REST_API_CHECKOUT_URL, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                await emptyCart();
            }
            if (response.status === 200) {
                window.location.href = "/";
            }

        } catch (e) {
            console.log(e);
            if (e.response.status === 400) { // Bad Request
                setErrors(e.response.data);
            }
            else {
                setErrors({...errors , error: "Error checking out , please try again later"});
            }
        } finally {
            setIsLoading(false);
        }
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validateName(name) {
        return name.length > 0 && name.length < 50 && name.match(/^[a-zA-Z]+$/);
    }

    function validateForm(data) {
        let errorList = {};
        if(!validateEmail(data.email)) {
            errorList["email"] = "Invalid email";
        }
        if(!validateName(data.firstName)) {
            errorList["firstName"] = "Invalid first name";
        }
        if(!validateName(data.lastName)) {
            errorList["lastName"] = "Invalid last name";
        }
        setErrors(errorList);
        return Object.keys(errorList).length === 0;
    }

    return (
        <Container>
            <Row>
                <Form className={"mt-3"} onSubmit={onSubmit}>
                    {errors.error && <Form.Text className="text-danger">{errors.error}</Form.Text>}
                    <FloatingLabel label="Email address" className="mb-3"
                    >
                        <Form.Control name="email" type="email" placeholder="Email"/>
                        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </FloatingLabel>

                    <FloatingLabel label="First Name" className="mb-3">
                        <Form.Control name="firstName" type="text" placeholder="First Name"/>
                        {errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
                    </FloatingLabel>

                    <FloatingLabel label="Last Name" className="mb-3">
                        <Form.Control name="lastName" type="text" placeholder="Last Name"/>
                        {errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
                    </FloatingLabel>

                    <FloatingLabel label="Total" className="mb-3">
                        <Form.Control type="text" value={total + CURRENCY} name={"payment"} disabled/>
                    </FloatingLabel>

                    <Button variant="primary" type="submit">Submit</Button>

                </Form>
            </Row>
            {isLoading && <LoadingSpinner/>}
        </Container>
    )
}