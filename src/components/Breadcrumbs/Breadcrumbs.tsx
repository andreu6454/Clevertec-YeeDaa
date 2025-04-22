import { Box, ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ChahkraLink, Text } from '@chakra-ui/react';
import { FC, memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

import { recipeData } from '~/shared/data/recipeData';

type PathNames = Record<string, string>;

interface SmartBreadcrumbsProps {
    pathNames?: PathNames;
    homeElement?: ReactNode;
}

export const Breadcrumbs: FC<SmartBreadcrumbsProps> = memo(
    ({ pathNames = {}, homeElement = 'Главная' }) => {
        const location = useLocation();
        const pathnames = location.pathname.split('/').filter(Boolean);

        const mappedPaths = pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            const isNumericPath = !isNaN(Number(path));

            const displayName = isNumericPath
                ? recipeData.find((el) => el.id === path)?.title || path
                : pathNames[path] || path;

            return (
                <Box display='flex' alignItems='center' key={displayName}>
                    {isLast ? (
                        <Text color='black'>{displayName}</Text>
                    ) : (
                        <>
                            <ChahkraLink
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
                    color={location.pathname !== '/' ? 'blackAlpha.700' : ''}
                    as={Link}
                    to='/'
                >
                    {homeElement}
                    {location.pathname !== '/' && <ChevronRightIcon color='gray.500' mx='4px' />}
                </ChahkraLink>
                {mappedPaths}
            </Box>
        );
    },
);
