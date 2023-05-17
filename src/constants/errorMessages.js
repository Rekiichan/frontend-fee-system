export const requireMessage = 'Trường này là bắt buộc!'
export const minLengthMessage = 'Tối thiếu value ký tự!'
export const maxLengthMessage = 'Tối đa value ký tự!'
export const invalidMessage = 'value không hợp lệ!'
export const passwordMessage = (p) => {
  if (p?.length < 8) {
    return 'Mật khẩu phải có ít nhất 8 ký tự'
  }
  if (p?.search(/[a-z]/i) < 0) {
    return 'Mật khẩu phải chứa ít nhất một ký tự là chữ'
  }
  if (p?.search(/[0-9]/) < 0) {
    return 'Mật khẩu phải chứa ít nhất một ký tự là số'
  }
}
export const nameMessage = (name) => {
  const inputName = name?.trim()
  const words = name?.trim()?.split(' ')

  if (!inputName) {
    return "Vui lòng nhập họ và tên"
  }
  if (!/^[A-Za-z ]+$/.test(name)) {
    return "Họ và tên không được chứa ký tự đặc biệt hoặc số"
  }
  if (inputName?.length < 2 || inputName?.length > 50) {
    return "Họ và tên phải có độ dài từ 2 đến 50 ký tự"
  }
  if (words.length < 2) {
    return 'Họ và tên phải chứa ít nhất hai từ'
  }
}
export const passwordConfirmationMessage = 'Mật khẩu không khớp'
