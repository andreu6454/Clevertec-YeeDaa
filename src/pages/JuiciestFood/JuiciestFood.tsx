import { memo } from 'react';

import { JuiciestPageData } from '~/shared/data/juiciestPageData';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const JuiciestFood = memo(() => (
    <CuisinePageLayout
        searchTitle='Самое сочное'
        recTitle='Веганская кухня'
        recDescription='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
    >
        <RecipesContainer data={JuiciestPageData} />
    </CuisinePageLayout>
));
