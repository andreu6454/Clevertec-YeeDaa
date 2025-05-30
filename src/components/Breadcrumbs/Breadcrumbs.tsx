import { Box, ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ChahkraLink, Text } from '@chakra-ui/react';
import { FC, memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

import { CategoryResponse } from '~/query/types/types';
import { APP_PATHS } from '~/shared/constants/pathes';
import { closeBurgerMenu, recipePageTitleSelector } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

interface SmartBreadcrumbsProps {
    pathNames: CategoryResponse;
    homeElement?: ReactNode;
}

export const Breadcrumbs: FC<SmartBreadcrumbsProps> = memo(
    ({ pathNames, homeElement = 'Главная' }) => {
        const location = useLocation();
        const pathnames = location.pathname.split('/').filter(Boolean);
        const dispatch = useAppDispatch();
        const pageTitle = useAppSelector(recipePageTitleSelector);

        const closeMenuHandler = () => {
            dispatch(closeBurgerMenu());
        };

        const mappedPaths = pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            let displayName = pathNames.find((el) => el.category === path)?.title || path;
            //  для все категорий и сабКатегорий

            if (pageTitle && pageTitle._id === path) {
                displayName = pageTitle.title;
            } // для названий рецептов

            if (path === 'the-juiciest') {
                displayName = 'Самое сочное';
            }

            if (path === 'new-recipe') {
                displayName = 'Новый рецепт';
            }

            if (path === 'not-found') {
                displayName = 'Страница не существует';
            }

            if (path === 'edit-recipe') {
                return null;
            }

            return (
                <Box display='flex' alignItems='center' key={displayName}>
                    {isLast ? (
                        <Text color='black'>{displayName}</Text>
                    ) : (
                        <>
                            <ChahkraLink
                                onClick={closeMenuHandler}
                                as={Link}
                                to={routeTo}
                                color='blackAlpha.700'
                                _hover={{ textDecoration: 'underline' }}
                            >
                                {displayName}
                            </ChahkraLink>
                            <ChevronRightIcon color='gray.500' mx='4px' />
                        </>
                    )}
                </Box>
            );
        });

        return (
            <Box display='flex' maxWidth='100%' data-test-id='breadcrumbs' flexWrap='wrap'>
                <ChahkraLink
                    onClick={closeMenuHandler}
                    color={location.pathname !== '/' ? 'blackAlpha.700' : ''}
                    as={Link}
                    to={APP_PATHS.root}
                >
                    {homeElement}
                    {location.pathname !== APP_PATHS.root && (
                        <ChevronRightIcon color='gray.500' mx='4px' />
                    )}
                </ChahkraLink>
                {mappedPaths}
            </Box>
        );
    },
);
