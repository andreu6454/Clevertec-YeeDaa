import { BreadcrumbItem, ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbLink, BreadcrumbProps, Text } from '@chakra-ui/react';
import { FC, memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

type PathNames = Record<string, string>;

interface SmartBreadcrumbsProps extends BreadcrumbProps {
    pathNames?: PathNames;
    homeElement?: ReactNode;
}

export const Breadcrumbs: FC<SmartBreadcrumbsProps> = memo(
    ({ pathNames = {}, homeElement = 'Главная', ...rest }) => {
        const location = useLocation();
        const pathnames = location.pathname.split('/').filter(Boolean);

        return (
            <Breadcrumb spacing={0} separator={<ChevronRightIcon color='gray.500' />} {...rest}>
                <BreadcrumbItem>
                    <BreadcrumbLink color='blackAlpha.700' as={Link} to='/'>
                        {homeElement}
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {pathnames.map((path, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const displayName =
                        pathNames[path] ||
                        path
                            .replace(/-/g, ' ')
                            .replace(
                                /\w\S*/g,
                                (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
                            );

                    return (
                        <BreadcrumbItem key={path} isCurrentPage={isLast}>
                            {isLast ? (
                                <Text color='black'>{displayName}</Text>
                            ) : (
                                <BreadcrumbLink
                                    color='blackAlpha.700'
                                    as={Link}
                                    _hover={{ textDecoration: 'underline' }}
                                    to={routeTo}
                                >
                                    {displayName}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumb>
        );
    },
);
