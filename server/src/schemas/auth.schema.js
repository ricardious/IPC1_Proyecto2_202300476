import { z } from 'zod';

export const registerSchema = z.object({
  carnet: z.string({
    required_error: 'Carnet is required',
  }),
  nombres: z.string({
    required_error: 'First name is required',
  }),
  apellidos: z.string({
    required_error: 'Last name is required',
  }),
  genero: z.string({
    required_error: 'Gender is required',
  }),
  facultad: z.string({
    required_error: 'Faculty is required',
  }),
  carrera: z.string({
    required_error: 'Career is required',
  }),
  correo: z.string({
    required_error: 'Email is required',
  }).email({
    message: 'Invalid email format',
  }),

  contrasena: z.string({
    required_error: 'Password is required',
  }).min(8, {
    message: 'Password must be at least 8 characters long',
  }).refine(value => (
    /[A-Z]/.test(value)
  ), {
    message: 'Password must contain at least 1 uppercase letter',
  }).refine(value => (
    /[a-z]/.test(value)
  ), {
    message: 'Password must contain at least 1 lowercase letter',
  }).refine(value => (
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
  ), {
    message: 'Password must contain at least 1 special character',
  }).refine(value => (
    !/[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
  ), {
    message: 'Password contains an invalid character',
  }),


}); 

export const loginSchema = z.object({
  carnet: z.string({
    required_error: 'Carnet is required',
  }),
  contrasena: z.string({
    required_error : 'Password is required',
  })
});