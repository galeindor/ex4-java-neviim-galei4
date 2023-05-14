
import {Button, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {redirect, useParams} from "react-router-dom";
import axios from "axios";
import {CURRENCY, REST_API_CHECKOUT_URL} from "../../constants";

export default function CheckoutPage() {
    const {total} = useParams();
    async function onSubmit(e) {
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
        if(response.status === 200) {
            console.log("CheckoutPage: onSubmit: response.status === 200");
            return redirect("/");
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
                        <Form.Control type="text" defaultValue={total+CURRENCY} disabled/>
                    </FloatingLabel>

                    <Button variant="primary" type="submit">Submit</Button>

                </Form>
            </Row>
        </Container>
    )
}