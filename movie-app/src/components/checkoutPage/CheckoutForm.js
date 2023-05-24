import {Button, FloatingLabel, Form} from "react-bootstrap";
import {CURRENCY, REST_API_CHECKOUT_URL} from "../../constants";
import axios from "axios";
import {useFetch} from "../../customHooks/useFetch";
import {useState} from "react";

export default function CheckoutForm({total, emptyCart}){
    const [errors, setErrors] = useState({email: '', firstName: '', lastName: '', error: ''});
    const [isLoading, setIsLoading] = useState(false);
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

    return(
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
    )
}