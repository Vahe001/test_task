
const usernameRegExp = /^(?=.*[A-Za-z0-9]){4,}$/;
const nameRegExp = /^(?=.*[A-Za-z0-9]){4,}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validateUserData = async ({username, password, name, forSignUp = false} = {}) => {
    if(forSignUp) {
        const isThereAnotherUsername = !!(await global.USERS.count({where: {username}}));
        if(isThereAnotherUsername)
            return false
    }

    const isUsername = usernameRegExp.test(username) ;
    const isName = name ? nameRegExp.test(name) : true;
    const isPassword = passwordRegExp.test(password);

    return isUsername && isPassword && isName;
};