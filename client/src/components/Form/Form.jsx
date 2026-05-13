import React from "react";
import styles from "./Form.module.css";
import validation from "./validation";

export default function Form(props) {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });

    setErrors(
      validation({
        ...userData,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isEmailRegistered = await props.login(userData);

    if (!isEmailRegistered) {
      setErrors({
        email: "El email ingresado no se encuentra registrado",
      });
      return;
    }

    props.login(userData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Rick and Morty</h1>
        <h2>¡Bienvenido de vuelta!</h2>
        <p className={styles.subtitle}>
          Inicia sesión para continuar
        </p>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Ingresa tu email"
            value={userData.email}
            onChange={handleChange}
          />
          <p className={styles.error}>
            {errors.email ? errors.email : null}
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={userData.password}
            onChange={handleChange}
          />
          <p className={styles.error}>
            {errors.password ? errors.password : null}
          </p>
        </div>

        <button type="submit">Ingresar</button>

        <div className={styles.demoBox}>
          <p>
            <span>Email:</span> ejemplo@gmail.com
          </p>
          <p>
            <span>Contraseña:</span> ejemplo123
          </p>
        </div>
      </form>
    </div>
  );
}