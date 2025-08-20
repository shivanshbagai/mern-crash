import React from 'react';
import { Box, useColorMode, Container, VStack, Text, SimpleGrid} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/productcard'; 
import { useEffect } from 'react';

const HomePage = () =>{
  const { colorMode} = useColorMode();

  const{ fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("Products:", products);

  return (
    <Container maxW="container.xl" p={12}>
      <VStack spacing={8} align="stretch">
        <Text
        fontSize={"30"}
        fontWeight={"bold"}
        bgGradient={colorMode === 'light' ? 'linear(to-r, blue.500, green.500)' : 'linear(to-r, blue.300, green.300)'}
        bgClip="text"
        textAlign="center"
        >
          Current Products 🚀
        </Text>
          <SimpleGrid
            columns={{
              base:1,
              md:2,
              lg:3
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        
          {products.length ==0 &&
          (
            <Text fontSize='xl' textAlign="center" fontWeight='bold' color='gray.500'>
            No Products found 😢{" "}
            <Link to={"/create"} style={{ textDecoration: 'none' }}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
          )}
        
      </VStack>

    </Container>
  );
}

export default HomePage;