export const showToast = (title) => {
    wx.showToast({
        title: title,
        icon: 'none'
    })
}

export const valideIsNull = (value, text) => {
    if (!value) {
        showToast('请输入' + text);
        return false
    }
    return true
}

export const valideIullDyText = (value, text) => {
    if (!value) {
        showToast(text);
        return false
    }
    return true
}

export const validatePhone = (phone) => {
    const phoneReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!phoneReg.test(phone)) {
        showToast("请输入正确的手机号")
        return false
    }
    return true
}


export const validePassword = (value) => {
    const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
    if (!reg.test(value)) {
        showToast("密码格式不正确");
        return false
    }
    return true
}


export const valideComfirmPassword = (str1, str2) => {
    if (str1 != str2) {
        showToast("两次密码输入不相同");
        return false
    }
    return true
}


export const valideNumPassword = (value) => {
    const reg = /^\d{6}$/;
    if (!reg.test(value)) {
        showToast("密码格式不正确");
        return false
    }
    return true
}


export const valideEmail = (value) => {
    const reg = /^([a-zA-Z]|[0-9]).+(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(value == ""){
        showToast("请输入邮箱"); return false
    }
    else if (!reg.test(value)) {
        showToast("邮箱格式不正确"); return false
    }
    return true

}

export const valideIdentity = (value) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(value)) {
        showToast("身份证格式不正确"); return false
    }
    return true

} 