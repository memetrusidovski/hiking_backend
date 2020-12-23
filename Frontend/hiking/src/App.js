import './App.css';
import "react-multi-carousel/lib/styles.css";
import  Header  from './components/Header';
import Gridlayout from './components/Grid';
import { Flex, Center, Box, Input } from "@chakra-ui/react";
import Databox from "./components/Box";

function App() {
  return (
    <div>
      <Header />
      <Flex>
        <Box w="400px" bg="tomato">
          <Input/>
        </Box>
        <Center w="2000px">
          <Gridlayout/>
        </Center>
      </Flex>
    </div>
  );
}

export default App;
