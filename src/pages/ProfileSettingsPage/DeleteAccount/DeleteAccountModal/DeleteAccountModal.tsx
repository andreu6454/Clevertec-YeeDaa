import { Button, Flex, Image, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import BreakfastImage from '~/assets/breakfast.png';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useDeleteProfileMutation } from '~/query/services/users';
import { ALERT_STATUSES, defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { USERS_ALERTS } from '~/shared/constants/alertStatuses/usersAlerts';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppDispatch } from '~/store/hooks';
import { setUserId } from '~/store/slices/app-slice';

type DeleteAccountModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
    const [deleteProfile, { isLoading }] = useDeleteProfileMutation();
    const alert = useAlertToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onDeleteHandler = async () => {
        try {
            onClose();
            await deleteProfile().unwrap();
            alert(
                {
                    status: ALERT_STATUSES.success,
                    title: USERS_ALERTS.deleteAccountSuccess,
                },
                false,
            );
            dispatch(setUserId('forbidden403'));
            navigate(APP_PATHS.login);
        } catch {
            alert(defaultAlert, false);
        }
    };

    if (isLoading) return <FullScreenSpinner />;
    return (
        <CustomModal onClose={onClose} isOpen={isOpen} width={{ base: '316px', xl: '396px' }}>
            <VStack gap='32px' padding='32px'>
                <Image
                    width={{ base: '108px', xl: '206px' }}
                    height={{ base: '108px', xl: '206px' }}
                    src={BreakfastImage}
                />
                <VStack gap='16px'>
                    <Typography Size={TypographySizes['2xl']} textAlign='center'>
                        Действительно хотите удалить свой аккаунт?
                    </Typography>
                    <Typography
                        Size={TypographySizes.md}
                        textAlign='center'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        Если вы удалите аккаунт, вы больше не сможете всеми функциями сервиса,
                        которые вы использовали.
                    </Typography>
                    <Typography
                        Size={TypographySizes.md}
                        textAlign='center'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        Мы удалим все ваши опубликованные рецепты и записи в блоге.
                    </Typography>
                </VStack>
                <Button
                    onClick={onDeleteHandler}
                    width='100%'
                    size='lg'
                    backgroundColor='#000'
                    color='#fff'
                >
                    Удалить мой аккаунт
                </Button>
                <Flex gap='4px' whiteSpace='nowrap'>
                    <Typography Size={TypographySizes.xs} color='rgba(0, 0, 0, 0.48)'>
                        Остались вопросы? Свяжитесь
                    </Typography>
                    <Typography
                        Size={TypographySizes.xs}
                        color='rgba(0, 0, 0, 0.48)'
                        textDecoration='underline'
                    >
                        с поддержкой
                    </Typography>
                </Flex>
            </VStack>
        </CustomModal>
    );
};
