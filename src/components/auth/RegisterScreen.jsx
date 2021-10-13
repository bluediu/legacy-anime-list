import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRegisterWithEmailPasswordName } from '../../context/actions/auth';

/* components, helpers* and hooks */
import AuthButton from '../utils/AuthButton';
import { validationsFormRegister } from '../../helpers/validationsForm';
import { useForm } from '../../hooks/useForm';

const initialForm = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

function RegisterScreen() {
  const { form, errors, handleChange, handleBlur } = useForm(
    initialForm,
    validationsFormRegister
  );

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidFormData(errors)) {
      dispatch(
        startRegisterWithEmailPasswordName(
          form.email,
          form.password,
          form.name
        )
      );
    }
  };

  const isValidFormData = ({ name, email, password }) =>
    !name && !email && !password ? false : true;

  return (
    <div>
      <form
        className="animate__animated animate__fadeInDown animate__faster"
        onSubmit={handleRegister}
      >
        <h4 className="mb-3">Crea una cuenta</h4>

        <div className="form-group mb-2">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>

          <input
            type="text"
            className={`form-control ${
              errors.name && 'is-invalid'
            }`}
            id="name"
            placeholder="Escribe tu nombre..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.name}
            name="name"
          />

          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.email && 'is-invalid'
            }`}
            id="email"
            placeholder="Escribe tu email..."
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

        <div className="form-group mb-2">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password && 'is-invalid'
            }`}
            id="password"
            placeholder="Escribe tu Contraseña..."
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

        <div className="form-group mb-3">
          <label htmlFor="passwordRepit" className="form-label">
            Repite tu contraseña
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password && 'is-invalid'
            }`}
            id="passwordRepit"
            placeholder="Repite tu contraseña..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password2}
            name="password2"
          />
        </div>

        <AuthButton
          isValid={isValidFormData(errors)}
          title="Crear"
        />

        <Link to="/auth/login" className="d-block mt-3">
          Registrarme
        </Link>
      </form>
    </div>
  );
}

export default RegisterScreen;
