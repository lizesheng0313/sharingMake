
export const validatePhone = (phone) => {
    const phoneReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!phoneReg.test(phone)) {
        return false
    }
    return true
}
