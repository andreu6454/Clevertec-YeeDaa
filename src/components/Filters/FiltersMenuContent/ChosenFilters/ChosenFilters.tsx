import { Flex, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { meatFilters, sideDishFilters } from '~/shared/data/recipeFilters';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    meatFiltersSelector,
    setMeatFilters,
    setSideDishFilters,
    sideDishFiltersSelector,
} from '~/store/recipesListPage-slice';

const ChosenFilters = () => {
    const meatFiltersData = useAppSelector(meatFiltersSelector);
    const sideDishFiltersData = useAppSelector(sideDishFiltersSelector);
    const dispatch = useAppDispatch();

    const mappedMeatFilters = meatFiltersData.map((el) => {
        const onClickHandler = () => {
            dispatch(setMeatFilters(meatFiltersData.filter((element) => el != element)));
        };

        return (
            <Tag
                height='24px'
                key={el + 'tag'}
                border='1px solid #b1ff2e'
                borderRadius='6px'
                padding='0px 8px'
                color='#207e00'
                backgroundColor='#eaffc7'
                variant='solid'
                colorScheme='green'
            >
                <TagLabel>
                    {meatFilters.filter((element) => element.general === el)[0]?.title}
                </TagLabel>
                <TagCloseButton onClick={onClickHandler} />
            </Tag>
        );
    });

    const mappedSideDishFilters = sideDishFiltersData.map((el) => {
        const onClickHandler = () => {
            dispatch(setSideDishFilters(sideDishFiltersData.filter((element) => el != element)));
        };

        return (
            <Tag
                height='24px'
                onClick={onClickHandler}
                key={el + 'tag'}
                border='1px solid #b1ff2e'
                borderRadius='6px'
                padding='0px 8px'
                backgroundColor='#eaffc7'
                variant='solid'
                colorScheme='green'
                color='#207e00'
            >
                <TagLabel>
                    {sideDishFilters.filter((element) => element.general === el)[0]?.title}
                </TagLabel>
                <TagCloseButton />
            </Tag>
        );
    });

    return (
        <Flex width='100%' gap='16px' flexWrap='wrap' alignItems='flex-end'>
            {mappedMeatFilters}
            {mappedSideDishFilters}
        </Flex>
    );
};

export default ChosenFilters;
