import { Flex } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { RecommendationBlock } from '~/widgets/RecommendationBlock/RecommendationBlock';

interface CuisinePageLayoutProps {
    searchTitle: string;
    searchDescription?: string;
    children: ReactNode | ReactNode[];
}

export const CuisinePageLayout = memo((props: CuisinePageLayoutProps) => {
    const { searchTitle, searchDescription, children } = props;

    return (
        <Flex width='100%' flexDirection='column' alignItems='center'>
            <SearchBlock title={searchTitle} description={searchDescription} />
            {children}
            <RecommendationBlock />
        </Flex>
    );
});
