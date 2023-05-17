import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

import 'react-toastify/dist/ReactToastify.css'
import bgImageLogin from '../assets/images/bgImageLogin.jpg'
import {
  invalidMessage,
  passwordMessage,
  requireMessage,
} from '../constants/errorMessages'
import { emailPattern, passwordPattern } from '../constants/patterns'
import { useLoginCusMutation } from '../redux/slices/auth.slice'

const Login = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [typePass, setTypePass] = useState(false)
  const navigate = useNavigate()

  const password = useRef(null)
  password.current = watch('password')

  const cookies = new Cookies()

  const [loginCus, { error }] = useLoginCusMutation()

  const onSubmit = async ({ email, password }) => {
    loginCus({
      email: email,
      password: password,
    }).then((res) => {
      console.log('res', res?.data?.Token)
      if (res?.data?.Token) {
        cookies.set('tokenAccess', res?.data?.Token)
        navigate('/')
      }
      else {
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
      }
    })
  }

  return (
    <>
      <div className="flex">
        <div className="hidden xl:block min-w-1/2 h-screen">
          <img src={bgImageLogin} className="max-w-full max-h-full" />
        </div>
        <div className="flex-1 mt-28">
          <h1 className="uppercase text-center text-3xl font-semibold mt-10 mb-4">
            đăng nhập
          </h1>
          <div className="w-1/2 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
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

              {/* input password */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center justify-between">
                  <label className="ml-2">
                    Mật khẩu<span className="text-red-500"> *</span>
                  </label>
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
                {error?.data?.error && (
                  <p className="text-red-500 text-sm italic">
                    {error?.data?.error}
                  </p>
                )}
              </div>

              <div className="flex justify-center">


                <button
                  type="submit"
                  value="Submit"
                  className="w-[200px] bg-[#3577F0] py-3 rounded-md uppercase text-white font-semibold hover:scale-105 duration-300"
                >
                  Đăng nhập
                </button>

              </div>
            </form>
            <p className="mt-4">
              Nếu chưa có tài khoản, hãy đăng ký{' '}
              <Link to="/register">
                <span className="text-blue-400 italic">tại đây</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
