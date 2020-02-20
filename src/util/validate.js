
export const validatePhone = (phone) => {
    const phoneReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!phoneReg.test(phone)) {
        return false
    }
    return true
}

export const validateNumber = (rule, value, callback) => {
  let reg= /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/
  if(reg.test(value)){
    callback()
  }else{
    callback(new Error('请输入正确数值'));
  }
};
