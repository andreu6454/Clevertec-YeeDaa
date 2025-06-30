import { ReactionType } from '~/shared/types/usersTypes';

export const getReactionCount = (reactions: ReactionType[]): number =>
    reactions?.reduce((acc, item) => acc + item.count, 0) || 0;
