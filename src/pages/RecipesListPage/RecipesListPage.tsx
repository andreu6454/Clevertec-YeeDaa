import { memo, useEffect } from 'react';

import { LinksCarousel } from '~/components/LinksCarousel/LinksCarousel';
import { useRouteSegments } from '~/hooks/useRouteSegments';
import { useScreenSize } from '~/hooks/useScreenSize';
import { navBarData } from '~/shared/data/navBarData';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { filteredDataSelector, setFilteredData } from '~/store/recipesListPage-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const RecipesListPage = memo(() => {
    const { screenSize } = useScreenSize();

    const dispatch = useAppDispatch();

    const { category, subcategory } = useRouteSegments();
    useEffect(() => {
        dispatch(setFilteredData({ category, subcategory }));
    }, [category, subcategory]);

    const title = navBarData.filter((el) => el.general === category)[0].title;

    const recipes = useAppSelector(filteredDataSelector);

    return (
        <CuisinePageLayout
            searchTitle={title}
            searchDescription='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            recTitle='Десерты, выпечка'
            recDescription='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны..'
        >
            <LinksCarousel size={screenSize} links={navBarData[6].links} />
            <RecipesContainer data={recipes} />
        </CuisinePageLayout>
    );
});
