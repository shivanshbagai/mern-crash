import React from 'react';
import { Box, Heading, IconButton, useColorModeValue, Image, Text, HStack, useToast, Modal, Input, ModalOverlay,
  ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, Button,
  ModalFooter}from '@chakra-ui/react';  
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';


const ProductCard = ({product}) => {
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const bg = useColorModeValue('white', 'gray.700');

  const {deleteProduct, updateProduct} = useProductStore()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });

  const handleDeleteProduct = async (pid, updatedProduct) => {
    const { success, message} = await deleteProduct(pid)
    if(!success)
    {
      toast(
        {
        title:"Error",
        description: message,
        duration: 3000,
        status: 'error',
        isClosable: true, 
        }
      )
    }
    else{
      toast(
        {
        title:"Successfully deleted",
        description: message,
        duration: 3000,
        status: 'success',
        isClosable: true, 
        }
      )
    }
  }

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (success) {
      toast({
        title: "Success",
        description: message,
        duration: 3000,
        status: 'success',
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: message,
        duration: 3000,
        status: 'error',
        isClosable: true,
      });
    }
  };


  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s ease'
      _hover={{ transform: 'scale(1.05)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
          </Heading>

          <Text fontWeight='bold' fontSize='lg' mb={2}>
            ${product.price}
          </Text>

          <HStack spacing={2}>
            <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue'/>
            <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>
          </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <VStack spacing={4} pb={6}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
              />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({...updatedProduct, price: parseFloat(e.target.value)})}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
              />
              <Button colorScheme='blue' onClick={handleUpdateProduct} w='full'>
                Update Product
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            
            >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;