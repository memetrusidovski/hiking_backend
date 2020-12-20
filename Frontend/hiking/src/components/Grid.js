import { Container, Row, Col } from "react-bootstrap";
import Databox from "./Box";

const Gridlayout = () => {
    return(
        <Container fluid="true">
            <Row>
            {Array(5)
            .fill("")
            .map((_, i) => (
                <Col>
                    <Databox/>
                    <Databox/>
                    <Databox/>
                    <Databox/>
                </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Gridlayout;