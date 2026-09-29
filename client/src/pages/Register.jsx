import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(169, 169, 169, 0.01)", // Fondo transparente
    border: "1px solid #94a3b8",
    borderRadius: "0.375rem",
    padding: "0",
    height: "0.5rem",
    width: "100%",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    backdropFilter: "blur(4px)",
    color: state.isDisabled ? "#94a3b8" : "white",
    "&:hover": {
      borderColor: state.isFocused ? "#3b82f6" : "#94a3b8",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3b82f6" : "rgba(169, 169, 169, 0.01)",
    color: state.isSelected ? "white" : "white",
    "&:hover": {
      backgroundColor: "#334155",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(30, 41, 59, 0.3)",
    backdropFilter: "blur(4px)",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

// Campo con label flotante, mismo estilo que el Login
const FloatInput = ({ label, icon: Icon, error, ...props }) => (
  <div className="relative">
    <input
      className="block w-full py-2.5 pe-8 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=""
      {...props}
    />
    <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
      {label}
    </label>
    {Icon && <Icon className="absolute text-white top-4 right-2" />}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((values) => {
    signup(values);
  });

  return (
    <div className="w-full max-w-xl bg-slate-800 border border-slate-400 rounded-md p-6 sm:p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      {registerErrors.map((error, index) => (
        <div key={index} className="bg-red-500 p-2 text-white rounded-md mb-2">
          {error}
        </div>
      ))}
      <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          <div className="sm:col-span-2">
            <FloatInput
              label="USAC Code / ID"
              icon={BiUser}
              error={errors.carnet && "USAC Code is required"}
              {...register("carnet", { required: true })}
            />
          </div>

          <FloatInput
            label="First Names"
            error={errors.nombres && "First name is required"}
            {...register("nombres", { required: true })}
          />
          <FloatInput
            label="Last Names"
            error={errors.apellidos && "Last name is required"}
            {...register("apellidos", { required: true })}
          />

          <FloatInput
            label="Email Address"
            type="email"
            error={errors.correo && "Email is required"}
            {...register("correo", { required: true })}
          />

          <div>
            <label className="block text-sm text-slate-300 mb-2">Gender</label>
            <Controller
              name="genero"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={genderOptions}
                  placeholder="Select Gender"
                  styles={selectStyles}
                />
              )}
            />
            {errors.genero && (
              <p className="text-red-500 text-xs mt-1">Gender is required</p>
            )}
          </div>

          <FloatInput
            label="Faculty"
            error={errors.facultad && "Faculty is required"}
            {...register("facultad", { required: true })}
          />
          <FloatInput
            label="Major"
            error={errors.carrera && "Major is required"}
            {...register("carrera", { required: true })}
          />

          <FloatInput
            label="Password"
            type="password"
            icon={RiLockPasswordLine}
            error={errors.contrasena && "Password is required"}
            {...register("contrasena", { required: true })}
          />
          <FloatInput
            label="Confirm Password"
            type="password"
            icon={RiLockPasswordLine}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: true,
              validate: (val) =>
                watch("contrasena") !== val ? "Passwords do not match" : true,
            })}
          />
        </div>

        <button
          className="w-full mb-4 text-[18px] mt-8 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
          type="submit"
        >
          Register
        </button>
        <div className="flex justify-center">
          <span className="m-4 text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
