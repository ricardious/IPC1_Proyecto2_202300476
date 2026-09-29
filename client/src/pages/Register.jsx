import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiUser } from "react-icons/bi";
import Select from "react-select";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form";
import { registerRequest } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';



const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const facultyOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'science', label: 'Science' },
  { value: 'arts', label: 'Arts' },
];

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'rgba(169, 169, 169, 0.01)', // Fondo transparente
    border: '1px solid #94a3b8',
    borderRadius: '0.375rem',
    padding: '0',
    height: '0.5rem',
    width: '100%',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    backdropFilter: 'blur(4px)',
    color: state.isDisabled ? '#94a3b8' : 'white',
    '&:hover': {
      borderColor: state.isFocused ? '#3b82f6' : '#94a3b8',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3b82f6' : 'rgba(169, 169, 169, 0.01)',
    color: state.isSelected ? 'white' : 'white',
    '&:hover': {
      backgroundColor: '#334155',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(4px)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
};


function RegisterPage() {
  const { 
    register, 
    handleSubmit, 
    control, 
    watch, 
    formState:{ errors} 
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) navigate('/profile');
    }, [isAuthenticated]); 

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (

    <div>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-20 w-full shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
       {
        registerErrors.map((error, index) => (
          <div key={index} className="bg-red-500 p-2 text-white rounded-md">
            {error}
            </div>
        ))
       }
        <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>
        <form onSubmit={onSubmit}>
          <div className="relative">

            <input
              type='text'
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
              {...register('carnet', { required: true })}
            />

            <label htmlFor='usacId' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">USAC Code / ID</label>
            <BiUser className="absolute text-white top-4 right-4" />           
            {errors.carnet && (
            <p className="text-red-500">Username is required</p>
            )}
          </div>

          <div className="flex space-x-4 mt-4">
            <div className="relative w-1/2">
              <input
                type='text'
                className="block w-52 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                {...register('nombres', { required: true })}
              />
              <label htmlFor='firstName' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Names</label>
              {errors.carnet && (
            <p className="text-red-500">First name is required</p>
            )}
            </div>
            <div className="relative w-1/2">
              <input
                type='text'
                className="block w-52 py-2.5 pe-4 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                {...register('apellidos', { required: true })}
              />
              <label htmlFor='lastName' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Names</label>
              {errors.carnet && (
            <p className="text-red-500">Last name is required</p>
            )}
            </div>
          </div>

          <div className="flex space-x-4 mt-4 items-end">
            <div className="relative w-1/2">

              <Controller
                name="genero"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={genderOptions}
                    placeholder="Select Gender"
                    className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                    styles={selectStyles}
                  />
                )}
                rules={{ required: true }}
              />

              <label htmlFor='gender' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
              {errors.carnet && (
            <p className="text-red-500">Gender is required</p>
            )}
            </div>
            <div className="relative w-1/2">
              <input
                type='email'
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                {...register('correo', { required: true })}
              />
              <label htmlFor='email' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
              {errors.carnet && (
            <p className="text-red-500">Email is required</p>
            )}
            </div>
          </div>



          <div className="flex space-x-4 mt-4 items-end">
            <div className="relative w-1/2">
              <input
                type='text'
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                {...register('facultad', { required: true })}
              />
              <label htmlFor='firstName' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Faculty</label>
              {errors.carnet && (
            <p className="text-red-500">Facultad is required</p>
            )}
            </div>

            <div className="relative w-1/2">
              <input
                type='text'
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                {...register('carrera', { required: true })}
              />
              <label htmlFor='firstName' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Major</label>
              {errors.carnet && (
            <p className="text-red-500">Username is required</p>
            )}
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <div className="relative w-1/2">
              <input
                type='password'
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                {...register('contrasena', { required: true })}
              />
              <label htmlFor='firstName' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              <RiLockPasswordLine className="absolute text-white top-4 right-1" />
              {errors.carnet && (
            <p className="text-red-500">Password is required</p>
            )}
            </div>
            <div className="relative w-1/2">
              <input
                type='password'
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                {...register("confirmPassword", {
                  required: true,
                  validate: (val) => {
                    if (watch('contrasena') !== val) {
                      return 'Passwords do not match';
                    }
                  },
                })}
              />
              <label htmlFor='lastName' className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
              <RiLockPasswordLine className="absolute text-white top-4 right-1" />
              {errors.carnet && (
            <p className="text-red-500">Password is required</p>
            )}
            </div>
          </div>


          <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type="submit">Register</button>
          <div className="flex justify-center">
            <span className="m-4">Already have an account? <Link to='/login' className="text-blue-500">Sign In</Link></span>
          </div>
        </form>
      </div>
    </div>

  );
};


export default RegisterPage;