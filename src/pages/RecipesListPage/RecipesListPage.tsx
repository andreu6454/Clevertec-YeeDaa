import { memo, useEffect } from 'react';

import { LinksCarousel } from '~/components/LinksCarousel/LinksCarousel';
import { navBarData } from '~/shared/data/navBarData';
import { useRouteSegments } from '~/shared/hooks/useRouteSegments';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    filteredDataSelector,
    setCategoriesFilter,
    setFilteredData,
} from '~/store/recipesListPage-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const RecipesListPage = memo(() => {
    const { screenSize } = useScreenSize();

    const dispatch = useAppDispatch();

    const { category, subcategory } = useRouteSegments();

    useEffect(() => {
        dispatch(setCategoriesFilter({ categories: [category], subcategory: subcategory }));
        dispatch(setFilteredData());
    }, [category, subcategory]);

    const title = navBarData.filter((el) => el.general === category)[0].title;
    const links = navBarData.filter((el) => el.general === category)[0].links;

    const recipes = useAppSelector(filteredDataSelector);

    return (
        <CuisinePageLayout
            searchTitle={title}
            searchDescription='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            recTitle='Десерты, выпечка'
            recDescription='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны..'
        >
            <LinksCarousel category={category} size={screenSize} links={links} />
            <RecipesContainer data={recipes} />
        </CuisinePageLayout>
    );
});
