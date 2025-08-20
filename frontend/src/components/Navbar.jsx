import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Flex, Text , HStack, Button, useColorMode} from '@chakra-ui/react';
//import { PlusSquareIcon } from '@chakra-ui/icons';
import { CiSquarePlus } from "react-icons/ci";



function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  

  return (
    <Container maxWidth={"1140px"} px={4} >
      <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base: "column",
        sm : "row"
      }}
      >
        <Text
          fontSize={{base: "22px", sm: "28px"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={{base: "center", sm: "left"}}
          bgGradient={"linear(to-r, #00b09b,rgb(61, 87, 201))"}
          bgClip={"text"}
        >
          <Link to ={"/"}> Product Store 🛒 </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to ={"/create"}> 
           <Button
           colorScheme={"blue"}
           variant={"solid"}
           >
           <CiSquarePlus fontSize={25}/>
           Add Product
           </Button>
          </Link>

          <Button onClick={toggleColorMode}>
             {colorMode === "light" ? "🌙" : "🌞" }
           </Button>

        </HStack>
      </Flex>
    </Container>    
  );
}

export default Navbar;