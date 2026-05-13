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
        ...errors,
      });
      return;
    }

    props.login(userData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          placeholder="Ingrese su email..."
          value={userData.email}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.email ? errors.email : null}</p>

        <label htmlFor="password">Contraseña: </label>
        <input
          type="password"
          name="password"
          placeholder="Ingrese su contraseña..."
          value={userData.password}
          onChange={handleChange}
        />
        <p className={styles.error}>
          {errors.password ? errors.password : null}
        </p>

        <button type="submit">Ingresar</button>
        <p>Mail test: ejemplo@gmail.com</p>
        <p>Contraseña test: ejemplo123</p>
      </form>
    </div>
  );
}
