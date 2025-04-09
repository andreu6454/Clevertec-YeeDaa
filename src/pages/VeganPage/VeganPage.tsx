import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { LinksCarousel } from '~/components/LinksCarousel/LinksCarousel';
import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { useScreenSize } from '~/hooks/useScreenSize';
import { NavBarData } from '~/shared/data/navBarData';
import { VeganPageData } from '~/shared/data/veganPageData';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';
import { RecommendationBlock } from '~/widgets/RecommendationBlock/RecommendationBlock';

export const VeganPage = memo(() => {
    const { screenSize } = useScreenSize();

    return (
        <Flex width='100%' flexDirection='column' alignItems='center'>
            <SearchBlock
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
            <LinksCarousel size={screenSize} links={NavBarData[6].links} />
            <RecipesContainer data={VeganPageData} />
            <RecommendationBlock
                title='Десерты, выпечка'
                description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны..'
            />
        </Flex>
    );
});
