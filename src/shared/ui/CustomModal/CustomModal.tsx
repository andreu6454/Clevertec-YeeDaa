import { CloseButton, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CustomModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode | ReactNode[];
    testID?: string;
    width?: string;
};

export const CustomModal = (props: CustomModalProps) => {
    const { isOpen, onClose, children, testID, width } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} data-testid={testID}>
            <ModalOverlay />
            <ModalContent width={width}>
                <CloseButton
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
