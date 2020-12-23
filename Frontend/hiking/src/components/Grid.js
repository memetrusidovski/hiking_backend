import { Container, Row, Col } from "react-bootstrap";
import { Flex, Center, Wrap, WrapItem } from "@chakra-ui/react";
import Databox from "./Box";

const Gridlayout = () => {
    return(
        <Wrap>
              
            {Array(50)
            .fill("")
            .map((_, i) => (
                <WrapItem >
                        <Databox/>
                </WrapItem>
                ))}
        </Wrap>
    )
}

export default Gridlayout;