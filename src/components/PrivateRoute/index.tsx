"use client"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import { useAuthContext } from "@/context/authContext";
import jwt, { JwtPayload } from "jsonwebtoken"
import { apiGet } from "@/lib/api/api-client";
import { useToast } from "@/hooks/useToast";
import { removeRandomCharsFromToken } from "@/helpers/jwt-token/overshadowedToken";
import MainLayout from "@/components/layout/MainLayout";
import { browserStorage } from "@/utils/browserStorage";

type PrivateRouteProps = {
    children: ReactNode;
}
interface DecodedJwtPayload extends JwtPayload {
    userInfos?: string;
  }

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { push } = useRouter();
    const { setAuthInfo, userLogged } = useAuthContext();
    const { notifyError } = useToast();
    const [authenticated, setAuthenticated] = useState(false);

    const fetchCheckTokenValidation = async () => {
        try {
            await apiGet('validate-token');
          } catch (err: any) {
            const error = err?.response?.status;
            console.log(error);
            if (error == 401) {
                setAuthInfo(null);
                setAuthenticated(false);
                notifyError('Seu token de acesso está expirado, você precisar fazer login novamente!', 5000);
                browserStorage.removeItem('session');
                return push(APP_ROUTES.public.home);
            }
          }
    }

    useEffect(() => {
        const sessionData = browserStorage.getObject<any>('session');
        if (!sessionData) {
            setAuthenticated(false);
            notifyError('Você precisa estar logado para acessar esta página, faça login.', 5000);
            push(APP_ROUTES.public.home);
            return
        } else if (!userLogged && sessionData) {
            fetchCheckTokenValidation();
            try {
                const cleannedToken = removeRandomCharsFromToken(sessionData.user_token);
                const decoded = jwt.decode(cleannedToken) as DecodedJwtPayload | null;
                const decodedParsed = decoded?.userInfo ? JSON.parse(decoded?.userInfo) : null;

             if (decoded && decodedParsed) {
                const userInfo = {
                    ...decodedParsed,
                    access_token: sessionData.session.session_access_token
                };
                setAuthInfo(userInfo);
                setAuthenticated(true);
                return
            } else {
                notifyError('Seu token de acesso está expirado, você precisar fazer login novamente!', 5000);
                browserStorage.removeItem('session');
                return push(APP_ROUTES.public.home);
              }
            } catch (err: any) {
                console.log(err);
            }
        } else if (userLogged) {
            fetchCheckTokenValidation();
            setAuthenticated(true);
            return
        }
    }, [authenticated, push, fetchCheckTokenValidation]);
    return (
        <>
            {!authenticated && null}
            {authenticated && <MainLayout>{children}</MainLayout>}
        </>
    );
};

export default PrivateRoute