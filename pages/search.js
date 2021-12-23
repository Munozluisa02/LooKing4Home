import { useState} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon} from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'
import SearchFilters from '../components/SearchFilters'
import noresult from '../assets/noresult.svg'
import Property from '../components/Property'
import { fetchApi, baseUrl } from '../utils/fecthApi'

const Search = ({ properties }) => {
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
                {properties.map ((property) => <Property property={property} key={property.id}/>)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent='center' alingItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                    <Image alt='No result' src={noresult} />
                    <Text fontSize='2xl' marginTop='3'>No results Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export default Search

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrenquency || 'yerly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalIDs = query.categoryExternalIDs || '4';

    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalIDs}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
   
    return {
      props: {
        properties: data?.hits,
      }
    }
  }
