import { breadCrumbsTranslations } from '../constants/breadCrumbs';

export function getBreadCrumbTranslation(path: string) {
    if (path in breadCrumbsTranslations) {
        return breadCrumbsTranslations[path as keyof typeof breadCrumbsTranslations];
    }
    return path;
}
