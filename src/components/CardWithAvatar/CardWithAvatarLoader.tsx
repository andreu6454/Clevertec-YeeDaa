import { Flex, Spinner } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

type CardWithAvatarLoaderProps = {
    isLoading?: boolean;
    width:
        | {
              base: string;
              xl: string;
              '2xl'?: string;
          }
        | string;
    height: {
        base: string;
        xl: string;
        '2xl'?: string;
    };
};

export const CardWithAvatarLoader = ({ isLoading, width, height }: CardWithAvatarLoaderProps) => {
    if (!isLoading) return null;
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.mobileLoader}
            alignItems='center'
            justifyContent='center'
            width={width}
            height={height}
            position='absolute'
            background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
        >
            <Spinner data-test-id='app-loader' />
        </Flex>
    );
};
