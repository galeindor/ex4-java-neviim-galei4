
import {Button, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import axios from "axios";
import {CURRENCY, REST_API_CHECKOUT_URL, REST_API_URL} from "../../constants";
import {useEffect, useState} from "react";

export default function CheckoutPage() {

    const [total, setTotal] = useState(1);

    useEffect(() => {
        async function getTotal() {
            const response = await axios.get(REST_API_URL+"/total");
            console.log(response);
            setTotal(response.data["total"].toFixed(2));
        }
        getTotal().catch(e => console.log(e));
    }, []);

    async function onSubmit(e) {
        try {
            e.preventDefault();
            const data = new URLSearchParams();
            const formData = new FormData(e.target);
            for (const pair of formData.entries()) {
                data.append(pair[0].toString(), pair[1]);
            }
            data.append("payment", parseFloat(total));

            const response = await axios.post(REST_API_CHECKOUT_URL, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            console.log(response);
            if (response.status === 200) {
                console.log("CheckoutPage: onSubmit: response.status === 200");
                window.location.href = "/";
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <Row>
                <Form className={"mt-3"} onSubmit={onSubmit}>

                    <FloatingLabel label="Email address" className="mb-3"
                    >
                        <Form.Control name="email" type="email" placeholder="Email"/>
                    </FloatingLabel>

                    <FloatingLabel label="First Name" className="mb-3">
                        <Form.Control name="firstName" type="text" placeholder="First Name"/>
                    </FloatingLabel>

                    <FloatingLabel label="Last Name" className="mb-3">
                        <Form.Control name="lastName" type="text" placeholder="Last Name"/>
                    </FloatingLabel>

                    <FloatingLabel label="Total" className="mb-3">
                        <Form.Control type="text" value={total+CURRENCY} disabled/>
                    </FloatingLabel>

                    <Button variant="primary" type="submit">Submit</Button>

                </Form>
            </Row>
        </Container>
    )
}