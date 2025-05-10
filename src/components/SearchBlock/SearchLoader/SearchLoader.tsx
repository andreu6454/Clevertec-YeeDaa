import { Flex, Spinner } from '@chakra-ui/react';

import { SearchTitle } from '~/components/SearchBlock/SearchTitle/SearchTitle';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

type SearchLoaderProps = {
    title: string;
};

const Sizes = {
    Desktop: {
        width: '898px',
        paddingY: '32px 0 32px 0',
    },
    Laptop: {
        width: '578px',
        paddingY: '32px 0 32px 0',
    },
    Tablet: {
        width: '727px',
        paddingY: '16px 0 32px 0',
    },
    Mobile: {
        width: '328px',
        paddingY: '16px 0 32px 0',
    },
};

export const SearchLoader = (props: SearchLoaderProps) => {
    const { title } = props;
    const { screenSize } = useScreenSize();

    return (
        <Flex
            boxShadow='0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            width={Sizes[screenSize].width}
            flexDirection='column'
            borderRadius='24px'
            padding={Sizes[screenSize].paddingY}
            alignItems='center'
        >
            <SearchTitle title={title} />
            <Flex alignItems='center' justifyContent='center' width='134px' height='134px'>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    width='80px'
                    height='80px'
                    background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
                >
                    <Spinner data-test-id='loader-search-block' size='sm' />
                </Flex>
            </Flex>
        </Flex>
    );
};
