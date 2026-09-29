import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { updateProfileRequest } from "../api/auth";
import Navbar from "../components/Navbar";

const GENDER_OPTIONS = ["Masculino", "Femenino", "Male", "Female"];

function Profile() {
  const { user, setUser } = useAuth();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        genero: user.genero || "",
        facultad: user.facultad || "",
        carrera: user.carrera || "",
        correo: user.correo || "",
        contrasena: "",
      });
    }
  }, [user, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setMessage("");
    setErrors([]);

    const payload = { ...values };
    if (!payload.contrasena) delete payload.contrasena;

    try {
      const res = await updateProfileRequest(payload);
      setUser(res.data);
      setMessage("Profile updated successfully");
    } catch (error) {
      const data = error.response?.data;
      setErrors(
        Array.isArray(data) ? data : ["The profile could not be updated"]
      );
    }
  });

  const inputClass =
    "w-full rounded-md border border-themify-border bg-themify-bg px-3 py-2 text-sm outline-none focus:border-blue-500";

  return (
    <div className="min-h-screen bg-themify-bgSoft text-themify-textColor">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-xl bg-themify-bg p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>

          {message && (
            <div className="mb-4 rounded-md bg-green-100 p-2 text-sm text-green-700 dark:bg-green-900/40 dark:text-green-300">
              {message}
            </div>
          )}

          {errors.map((error, index) => (
            <div
              key={index}
              className="mb-2 rounded-md bg-red-500 p-2 text-sm text-white"
            >
              {error}
            </div>
          ))}

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                USAC Code / ID (not editable)
              </label>
              <input
                type="text"
                value={user?.codigo || user?.carnet || ""}
                disabled
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                First Names
              </label>
              <input
                type="text"
                className={inputClass}
                {...register("nombres", { required: true })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                Last Names
              </label>
              <input
                type="text"
                className={inputClass}
                {...register("apellidos", { required: true })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                Gender
              </label>
              <select className={inputClass} {...register("genero")}>
                <option value="">Select a gender</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                Faculty
              </label>
              <input
                type="text"
                className={inputClass}
                {...register("facultad", { required: true })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                Major
              </label>
              <input
                type="text"
                className={inputClass}
                {...register("carrera", { required: true })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                Email Address
              </label>
              <input
                type="email"
                className={inputClass}
                {...register("correo", { required: true })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-themify-textColorSoft">
                New password (leave blank to keep the current one)
              </label>
              <input
                type="password"
                placeholder="At least 8 chars, 1 uppercase, 1 lowercase, 1 special"
                className={inputClass}
                {...register("contrasena")}
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
