
export const updateLocalUserToken = (newUserToken: any) => {
    if (localStorage?.session) {
        const getPreviousLocalStorageSave = JSON.parse(localStorage?.session);
        getPreviousLocalStorageSave.user_token = newUserToken;
        localStorage.session = JSON.stringify(getPreviousLocalStorageSave);
        return 
    }
}