import { CloseButton, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

type CustomModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode | ReactNode[];
    testID?: string;
    width?: string;
    dataTestId?: string;
};

export const CustomModal = (props: CustomModalProps) => {
    const { isOpen, onClose, children, testID, width, dataTestId } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} data-testid={testID}>
            <ModalOverlay />
            <ModalContent borderRadius='16px' width={width} data-test-id={dataTestId}>
                <CloseButton
                    data-test-id={DATA_TEST_IDS.closeButton}
                    size='sm'
                    position='absolute'
                    top={6}
                    right={6}
                    border='1px solid #000'
                    borderRadius='50%'
                    onClick={onClose}
                />
                {children}
            </ModalContent>
        </Modal>
    );
};
