import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { signin, errors: signinErrors, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });



    useEffect(() => {
        if (isAuthenticated) {
            console.log(user);
            if (user && user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        }
    }, [isAuthenticated, user]);


    return (
        <div>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                {
                    signinErrors.map((error, index) => (
                        <div key={index} className="block bg-red-500 p-2 text-white rounded-md my-2 w-72">
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="relative my-6">

                        <input
                            type='text'
                            className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                            placeholder=""
                            {...register('carnet', { required: true })}
                        />
                        <label htmlFor='username' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">USAC ID / Code</label>
                        {errors.carnet && (
                            <p className="text-red-500">Password is required</p>
                        )}
                    </div>
                    <div className="relative my-6">
                        <input
                            type='password'
                            className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                            placeholder=""
                            {...register('contrasena', { required: true })}
                        />
                        <label htmlFor='password' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Password</label>
                        {errors.carnet && (
                            <p className="text-red-500">Password is required</p>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <input type='checkbox' id='' />
                            <label htmlFor='Remember Me'>Remember Me</label>
                        </div>
                        <Link to='' className="text-blue-500 ">Forgot Password?</Link>
                    </div>
                    <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type="submit">Login</button>
                    <div className="flex justify-center">
                        <span className="m-4">Don't have an account? <Link to='/register' className="text-blue-500">Sign Up</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;