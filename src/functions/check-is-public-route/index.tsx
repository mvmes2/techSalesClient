import { APP_ROUTES } from "@/constants/app-routes";

/**
 * @param asPath string
 * @returns boolean
 */

export const checkIsPublicRoute = (asPath: string): boolean => {
    const appPublicRoutes = Object.values(APP_ROUTES.public);

    return appPublicRoutes.some((route) => {
        // Transforma a rota dinâmica em uma regex
        const routeRegex = new RegExp(
            `^${route.replace(/:[^/]+/g, "[^/]+")}$`
        );
        return routeRegex.test(asPath);
    });
};
