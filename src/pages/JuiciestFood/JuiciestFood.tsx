import { memo } from 'react';

import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { useAppSelector } from '~/store/hooks';
import { recipesSelector } from '~/store/recipesListPage-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const JuiciestFood = memo(() => {
    const recipes = [...useAppSelector(recipesSelector)].sort((a, b) => b.likes - a.likes);
    return (
        <CuisinePageLayout
            searchTitle='Самое сочное'
            recTitle='Веганская кухня'
            recDescription='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
        >
            <RecipesContainer data={recipes} />
        </CuisinePageLayout>
    );
});
