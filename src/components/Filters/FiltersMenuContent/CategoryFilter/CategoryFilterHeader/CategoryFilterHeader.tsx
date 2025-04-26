import { navBarData } from '~/shared/data/navBarData';
import { Tags } from '~/shared/ui/Tags/Tags';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppSelector } from '~/store/hooks';
import { filterCategorySelector } from '~/store/recipesListPage-slice';

export const CategoryFilterHeader = () => {
    const categories = useAppSelector(filterCategorySelector);

    console.log(categories);

    const tagsTitles = categories.map((t) => navBarData.filter((el) => el.general === t)[0]?.title);

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
