import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineExclamationCircle,
} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import bgImageRegister from '../assets/images/bgImageRegister.jpg'
import {
  invalidMessage,
  maxLengthMessage,
  minLengthMessage,
  passwordConfirmationMessage,
  passwordMessage,
  requireMessage,
} from '../constants/errorMessages'
import {
  emailPattern,
  passwordPattern,
  phoneNumberPattern,
  userNamePattern,
} from '../constants/patterns'
import { useRegisterCusMutation } from '../redux/slices/auth.slice'

const Register = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const [typePass, setTypePass] = useState(false)
  const navigate = useNavigate()

  const password = useRef(null)
  password.current = watch('password')

  const name = useRef(null)
  name.current = watch('name')

  const [registerCus] = useRegisterCusMutation()

  const onSubmit = async ({ name, email, phoneNumber, password, address }) => {
    registerCus({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      address: '',
    }).then((res) => {
      if (res?.error?.originalStatus === 400) {
        console.log(res?.error?.data)
        toast.error(res?.error?.data, {
          position: 'top-right',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } else {
        console.log(res?.error?.data)
        toast.success(res?.error?.data, {
          position: 'top-right',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        reset()
        setTypePass(false)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    })
  }

  return (
    <>
      <ToastContainer />
      <div className="flex">
        <div className="hidden xl:block min-w-1/2 h-screen">
          <img src={bgImageRegister} className="max-w-full max-h-full" />
        </div>
        <div className="flex-1">
          <h1 className="uppercase text-center text-3xl font-semibold mt-10 mb-4">
            đăng ký
          </h1>
          <div className="w-1/2 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* input name */}
              <div className="flex flex-col mb-4">
                <label className="ml-2">
                  Tên<span className="text-red-500"> *</span>
                </label>
                <input
                  {...register('name', {
                    required: requireMessage,
                    pattern: {
                      value: userNamePattern,
                      message: invalidMessage.replace('value', 'Tên'),
                    },
                    minLength: {
                      value: 2,
                      message: minLengthMessage.replace('value', 2),
                    },
                    maxLength: {
                      value: 20,
                      message: maxLengthMessage.replace('value', 20),
                    },
                  })}
                  placeholder="Nguyễn Văn A"
                  className="input__field p-2"
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm italic">
                    {errors?.name?.message}
                  </p>
                )}
              </div>

              {/* input email */}
              <div className="flex flex-col mb-4">
                <label className="ml-2">
                  Email<span className="text-red-500"> *</span>
                </label>
                <input
                  {...register('email', {
                    required: requireMessage,
                    pattern: {
                      value: emailPattern,
                      message: invalidMessage.replace('value', 'Email'),
                    },
                  })}
                  placeholder="email@gmail.com"
                  className="input__field p-2"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm italic">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              {/* input phone number */}
              <div className="flex flex-col mb-4">
                <label className="ml-2">
                  Số điện thoại<span className="text-red-500"> *</span>
                </label>
                <input
                  {...register('phoneNumber', {
                    required: requireMessage,
                    pattern: {
                      value: phoneNumberPattern,
                      message: invalidMessage.replace('value', 'Số điện thoại'),
                    },
                  })}
                  placeholder="999-999-9999"
                  className="input__field p-2"
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500 text-sm italic">
                    {errors?.phoneNumber?.message}
                  </p>
                )}
              </div>

              {/* input password */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center justify-between">
                  <label className="ml-2">
                    Mật khẩu<span className="text-red-500"> *</span>
                  </label>
                  <AiOutlineExclamationCircle
                    className="text-green-500"
                    title="Mật khẩu phải có ít nhất 8 ký tự, ít nhất một ký tự là chữ và ít
                  nhất một ký tự là số!"
                  />
                </div>
                <div className="relative">
                  <input
                    type={typePass ? 'text' : 'password'}
                    {...register('password', {
                      required: requireMessage,
                      pattern: {
                        value: passwordPattern,
                        message: passwordMessage(password.current),
                      },
                    })}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className="w-full input__field p-2"
                  />
                  {typePass ? (
                    <AiFillEyeInvisible
                      className="absolute text-2xl right-[2%] top-1/2 -translate-y-1/2 text-[#7777] cursor-pointer"
                      onClick={() => setTypePass(!typePass)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute text-2xl right-[2%] top-1/2 -translate-y-1/2 text-[#7777] cursor-pointer"
                      onClick={() => setTypePass(!typePass)}
                    />
                  )}
                </div>
                {errors?.password && (
                  <p className="text-red-500 text-sm italic">
                    {errors?.password?.message}
                  </p>
                )}
              </div>

              {/* input confirm password */}
              <div className="flex flex-col mb-4">
                <label className="ml-2">
                  Nhập lại mật khẩu<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    type={typePass ? 'text' : 'password'}
                    {...register('password_confirmation', {
                      required: true,
                      validate: (value) =>
                        value === password.current ||
                        passwordConfirmationMessage,
                    })}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className="w-full input__field p-2"
                  />
                  {typePass ? (
                    <AiFillEyeInvisible
                      className="absolute text-2xl right-[2%] top-1/2 -translate-y-1/2 text-[#7777] cursor-pointer"
                      onClick={() => setTypePass(!typePass)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute text-2xl right-[2%] top-1/2 -translate-y-1/2 text-[#7777] cursor-pointer"
                      onClick={() => setTypePass(!typePass)}
                    />
                  )}
                </div>
                {errors?.password_confirmation && (
                  <p className="text-red-500 text-sm italic">
                    {errors?.password_confirmation?.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  value="Submit"
                  className="w-[200px] bg-[#3577F0] py-3 rounded-md uppercase text-white font-semibold hover:scale-105 duration-300"
                >
                  Đăng ký
                </button>
              </div>
            </form>
            <p className="mt-4">
              Nếu đã có tài khoản, hãy đăng nhập{' '}
              <Link to="/login">
                <span className="text-blue-400 italic">tại đây</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
