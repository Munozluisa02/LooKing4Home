import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon} from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'
import SearchFilters from '../components/SearchFilters'
import noresult from '../assets/noresult.svg'

const search = () => {
    const [searchFilters, setSearchFilters] = useState(false)
    const router = useRouter();

    return (
        <Box>
            <Flex
                cursor='pointer'
                bg='gray.100'
                borderBottom='1px'
                borderColor='gray.200'
                p='2'
                fontWeight='black'
                fontSize='lg'
                justifyContent='center'
                alingItems='center'
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}>
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter}></Icon>
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize='2xl' p='4' fontWeight='bolder'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {[]. map ((property) => <Property property={property} key={property.id}/>)}
            </Flex>
            {[].length === 0 && (
                <Flex justifyContent='center' alingItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                    <Image alt='No result' src={noresult} /> 
                </Flex>
            )}
        </Box>
    )
}

export default search
