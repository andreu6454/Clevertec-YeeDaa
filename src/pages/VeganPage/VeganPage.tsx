import { memo } from 'react';

import { LinksCarousel } from '~/components/LinksCarousel/LinksCarousel';
import { useScreenSize } from '~/hooks/useScreenSize';
import { NavBarData } from '~/shared/data/navBarData';
import { VeganPageData } from '~/shared/data/veganPageData';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const VeganPage = memo(() => {
    const { screenSize } = useScreenSize();

    return (
        <CuisinePageLayout
            searchTitle='Веганская кухня'
            searchDescription='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            recTitle='Десерты, выпечка'
            recDescription='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны..'
        >
            <LinksCarousel size={screenSize} links={NavBarData[6].links} />
            <RecipesContainer data={VeganPageData} />
        </CuisinePageLayout>
    );
});
