import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { AllBlogsLink } from '~/pages/MainPage/CulinaryBlogs/AllBlogsLink';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { userIdSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export const CulinaryBlogs = memo(() => {
    const { isDesktopLaptop } = useScreenSize();

    const userId = useAppSelector(userIdSelector);
    const { data: BloggersData, isError } = useGetBloggersQuery({
        limit: '3',
        currentUserId: userId,
    });
    const alert = useAlertToast();

    const bloggersForRender = BloggersData?.others?.map((el) => (
        <CardWithAvatar
            name={`${el.firstName} ${el.lastName}`}
            username={`@${el.login}`}
            text={el.notes[0]?.text}
        />
    ));

    if (isError) {
        alert(defaultAlert, false);
        return null;
    }
    if (!BloggersData) return null;
    return (
        <Flex
            borderRadius='16px'
            direction='column'
            gap='16px'
            width='100%'
            padding='24px'
            backgroundColor='#c4ff61'
        >
            <Flex width='100%' alignItems='center' justifyContent='space-between'>
                <Text fontWeight='500' fontSize='30px' lineHeight='120%'>
                    Кулинарные блоги
                </Text>
                {isDesktopLaptop && <AllBlogsLink />}
            </Flex>
            <Flex
                alignItems='center'
                justifyContent='center'
                direction={{ base: 'column', md: 'row' }}
                gap='16px'
                width='100%'
            >
                {bloggersForRender}
            </Flex>
            {!isDesktopLaptop && (
                <Flex width='100%' justifyContent='center'>
                    <AllBlogsLink />
                </Flex>
            )}
        </Flex>
    );
});
