import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { AllBlogsLink } from '~/components/AllBlogsLink/AllBlogsLink';
import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';

export const CulinaryBlogs = memo(() => {
    const { isDesktopLaptop } = useScreenSize();

    const userId = useAppSelector(userIdSelector);
    const { data: BloggersData, isError } = useGetBloggersQuery({
        currentUserId: userId,
        limit: '',
    });

    const alert = useAlertToast();
    const navigate = useNavigate();

    const bloggersForRender = BloggersData?.others?.slice(0, 3).map((el) => {
        const onClickHandler = () => {
            navigate(`${APP_PATHS.blogs}/${el._id}`);
        };

        return (
            <CardWithAvatar
                name={`${el.firstName} ${el.lastName}`}
                username={`@${el.login}`}
                text={el.notes[0]?.text}
                onCardClick={onClickHandler}
            />
        );
    });

    if (isError) {
        alert(defaultAlert, false);
        return null;
    }
    if (!BloggersData) return null;
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.mainPageBlogsBox}
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
                {isDesktopLaptop && <AllBlogsLink dataTestId={DATA_TEST_IDS.mainPageBlogsButton} />}
            </Flex>
            <Flex
                data-test-id={DATA_TEST_IDS.mainPageBlogsGrid}
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
                    <AllBlogsLink dataTestId={DATA_TEST_IDS.mainPageBlogsButton} />
                </Flex>
            )}
        </Flex>
    );
});
