import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  startLoginWithEmailPassword,
  startloginWithGoogle,
} from '../../context/actions/auth';

/* components,libs and helpers */
import {AuthButton} from '../Utils/';
import { FaGoogle } from 'react-icons/fa';
import { validationsFormLogin } from '../../helpers/validationsForm';
import { useForm } from '../../hooks/';

const initialForm = {
  email: '',
  password: '',
};

function LoginScreen() {
  const [ canSubmit, setCanSubmit ] = useState(false);
  const { form, errors, handleChange, handleBlur } = useForm(
    initialForm,
    validationsFormLogin
  );

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!!form.email.length && !!form.password.length)
      setCanSubmit(true);
  }, [form]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (canSubmit)
      dispatch(startLoginWithEmailPassword(form.email, form.password));
  };

  useEffect(() => {
    document.title = `AnimeList- Entrar o registrarse`;
  }, []);



  const handleGoogleLogin = () => {
    dispatch(startloginWithGoogle());
  };

  const isValidFormData = ({ email, password }) =>
    !(!email && !password);

  return (
    <div>
      <form
        className="animate__animated animate__fadeInUp animate__faster"
        onSubmit={handleLogin}
      >
        <h4 className="mb-3">Iniciar sección</h4>

        <div
          className="social-media"
          onClick={handleGoogleLogin}
        >
          <div className="social-icon">
            <FaGoogle />
          </div>

          <div className="social-text">
            <span>Iniciar con una cuenta de Google</span>
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.email && 'is-invalid'
            }`}
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.email}
            name="email"
          />

          {errors.email && (
            <div className="invalid-feedback">
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password && 'is-invalid'
            }`}
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
            name="password"
          />

          {errors.password && (
            <div className="invalid-feedback">
              {errors.password}
            </div>
          )}
        </div>

        <AuthButton
          isValid={isValidFormData(errors)}
          title="Ingresar"
        />

        <Link to="/auth/register" className="d-block mt-3">
          Crear una cuenta
        </Link>
      </form>
    </div>
  );
}

export default LoginScreen;
