import { useContext, } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthContext";
export default function LoginForm() {
    const {user, Login} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    function onSubmit(data) {
        Login(data.name)
    }
    return (
        <div className="min-h-screen from-blue-100 to-indigo-200 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your account
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            User Name
                        </label>

                        <input
                            type="text"{
                                    ...register('user', {
                                        required: "User Is Required", 
                                        maxLength :{
                                            value: 8,
                                            message:'Maximum input value is 8'
                                        },
                                        minLength:{
                                            value:4,
                                            message:'Minimum input value is 4'
                                        }
                                    })
                            }   
                            placeholder="Enter your username"
                            className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        {errors.user && <p className="text-red-400">{errors.user.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            {...register('email', {required:' Email is Required',
                                    pattern:{
                                        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message:'Invalid Email'
                                    }
                                })
                            }
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        {errors.email && <p className="text-red-500"> Invalid Email </p>}
                    </div>

                    {/* Button */}
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                {!user.isAuth ?
                (<p className="text-center text-sm text-gray-500 mt-6">
                    Don&apos;t have an account?
                    <span className="text-blue-500 cursor-pointer ml-1 hover:underline">
                        Register
                    </span>
                </p>) :
                (<p className="text-center text-sm text-gray-500 mt-6">
                    Hello 
                    <span className="text-blue-500 cursor-pointer ml-1 hover:underline">
                        {user.name}
                    </span>
                </p>)
                }
            </div>
        </div>
    );
}