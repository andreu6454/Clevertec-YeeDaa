import { useSelector } from 'react-redux';

import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Tags } from '~/shared/ui/Tags/Tags';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { subCategoriesSelector } from '~/store/slices/categories-slice';

type CategoryHeaderProps = {
    categoriesIds: string[];
};

export const CategoryHeader = (props: CategoryHeaderProps) => {
    const { categoriesIds } = props;
    const { isDesktopLaptop } = useScreenSize();

    const subCategories = useSelector(subCategoriesSelector);

    const categoriesForMap = categoriesIds?.map(
        (el) => subCategories.find((cat) => el === cat._id)?.title,
    );

    const tagsPerView = isDesktopLaptop ? 2 : 1;

    if (categoriesForMap?.length === 0) {
        return (
            <Typography
                color='rgba(0, 0, 0, 0.64)'
                paddingLeft='0'
                fontWeight={400}
                overflow='hidden'
                textOverflow='ellipsis'
                Size={TypographySizes.md}
            >
                Выберите из списка...
            </Typography>
        );
    }
    return <Tags width='100%' elements={categoriesForMap as string[]} cutOn={tagsPerView} />;
};
