"use client";

import jwt, { JwtPayload } from "jsonwebtoken";
import { removeRandomCharsFromToken } from "../jwt-token/overshadowedToken";
import { useAuthContext } from "@/context/authContext";

interface DecodedJwtPayload extends JwtPayload {
    userInfos?: string;
}

export const useDecode = () => {

    const { setAuthInfo } = useAuthContext();

    const decodeUserJwtTokenAndUpdateAuthInfo = (tokenToDecode: string) => {
        try {
            const cleannedToken = removeRandomCharsFromToken(tokenToDecode);
            const decoded = jwt.decode(cleannedToken) as DecodedJwtPayload | null;


            const decodedParsed = decoded?.userInfos ? JSON.parse(decoded?.userInfo) : null;
            if (decoded && decodedParsed) {

                const userInfo = {
                    ...decodedParsed,
                    access_token: JSON.parse(localStorage.session).session.session_access_token
                };
                console.log('como vou setar userInfo 2... ', userInfo)
                setAuthInfo(userInfo);
                return
            } else {
                return null
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    const decodeUserJwtToken = (tokenToDecode: string) => {
        try {
            const cleannedToken = removeRandomCharsFromToken(tokenToDecode);
            const decoded = jwt.decode(cleannedToken) as DecodedJwtPayload | null;
            if (decoded && typeof decoded === 'object') {

                return decoded
            } else {
                return null
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    const decodeAndParseToken = (token: string) => {
        const unshadowToken = removeRandomCharsFromToken(token);
        let data = null;
        try {
            const decodedToken = jwt.decode(unshadowToken) as DecodedJwtPayload | null;
            const parsedToken = JSON.parse(decodedToken?.data ?? decodedToken?.companyInfos ?? decodedToken?.userInfos);
            data = parsedToken;
        } catch (err) {
            console.log('(decodedShadowedJwt.ts -> decodeToken()) -> decode token error... ', err);
        }
        return data;
    }

    return {
        decodeUserJwtToken,
        decodeUserJwtTokenAndUpdateAuthInfo,
        decodeAndParseToken
    }
}
