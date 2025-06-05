import { Tags } from '~/shared/ui/Tags/Tags';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import { categoryIdsSelector } from '~/store/slices/recipesListPage-slice';

export const CategoryFilterHeader = () => {
    const categories = useAppSelector(categoryIdsSelector);

    const allCategories = useAppSelector(categoriesSelector);

    const tagsTitles = categories.map((t) => allCategories.filter((el) => el._id === t)[0]?.title);

    if (categories.length === 0) {
        return (
            <Typography
                color='rgba(0, 0, 0, 0.64)'
                paddingLeft='0'
                fontWeight={400}
                overflow='hidden'
                textOverflow='ellipsis'
                Size={TypographySizes.md}
            >
                Категория
            </Typography>
        );
    }
    return <Tags elements={tagsTitles} />;
};
