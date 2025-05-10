import { Tags } from '~/shared/ui/Tags/Tags';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppSelector } from '~/store/hooks';
import { allergensSelector } from '~/store/recipesListPage-slice';

export const SearchAllergensHeader = () => {
    const allergens = useAppSelector(allergensSelector);
    const isSearchAllergenFilterOn = useAppSelector(allergensSelector);

    if (allergens.length === 0 || !isSearchAllergenFilterOn) {
        return (
            <Typography
                color='rgba(0, 0, 0, 0.64)'
                paddingLeft='0'
                fontWeight={400}
                overflow='hidden'
                textOverflow='ellipsis'
                Size={TypographySizes.md}
            >
                Выберите из списка аллергенов...
            </Typography>
        );
    }
    return <Tags elements={allergens} trim />;
};
