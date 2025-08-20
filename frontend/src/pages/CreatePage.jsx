import {useState} from 'react';
import { Box, VStack, Heading, Button, Container, Input, useColorModeValue, useToast } from '@chakra-ui/react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct}= useProductStore()

  const toast = useToast()

  const handleAddProduct = async() => {
    const { success, message } = await createProduct(newProduct);
    console.log("Success :" ,success);
    console.log("Message :", message);

    if(!success) {
      toast({
        title :"Error",
        description:message,
        status:"error",
        isClosable: true
    })

    }
    else{
      toast({
        title :"Success!",
        description:message,
        status:"success",
        isClosable: true,
        duration: 2500
    })
    }
    setNewProduct({ name: "",
      price: "",
      image: "",});
  };

  return (
    <Container maxWidth={"1140px"} px={4} >
      <VStack spacing = {8}>
        <Heading as ={"h1"} size ={"lg"} textAlign ={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box 
        w={"full"} bg= {useColorModeValue("white", "gray.800")} p={8} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing = {4} align ={"stretch"}>
            <Input 
            placeholder = "Product Name"
            name ='name'
            value= {newProduct.name}
            onChange = {(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input 
            placeholder = "Price"
            name ='price'
            type = "number"
            value= {newProduct.price}
            onChange = {(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input 
            placeholder = "Product Image URL"
            name ='image'
            value= {newProduct.image}
            onChange = {(e) => setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorScheme = 'blue' onClick={handleAddProduct} w='full'> 
              Add Product
            </Button>

          </VStack>
        </Box>
      </VStack>

    </Container>
  );
}

export default CreatePage;