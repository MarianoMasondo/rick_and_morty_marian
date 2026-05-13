import React from "react";
import styles from "./Form.module.css";
import validation from "./validation";

export default function Form(props) {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});
  const [copied, setCopied] = React.useState("");

  const demoEmail = "ejemplo@gmail.com";
  const demoPassword = "ejemplo123";

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

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch (error) {
      console.error("No se pudo copiar el texto", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Rick and Morty</h1>
        <h2>¡Bienvenido de vuelta!</h2>

        <p className={styles.subtitle}>Inicia sesión para continuar</p>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Ingresa tu email"
            value={userData.email}
            onChange={handleChange}
          />
          <p className={styles.error}>{errors.email ? errors.email : null}</p>
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

        <button className={styles.submitButton} type="submit">
          Ingresar
        </button>

        <div className={styles.demoBox}>
          <p className={styles.demoTitle}>Usuario de prueba</p>

          <div className={styles.demoItem}>
            <div className={styles.demoText}>
              <span>Email:</span>
              <strong>{demoEmail}</strong>
            </div>

            <button
              type="button"
              className={styles.copyButton}
              onClick={() => handleCopy(demoEmail, "email")}
              title="Copiar email"
            >
              {copied === "email" ? "Copiado" : "📋"}
            </button>
          </div>

          <div className={styles.demoItem}>
            <div className={styles.demoText}>
              <span>Contraseña:</span>
              <strong>{demoPassword}</strong>
            </div>

            <button
              type="button"
              className={styles.copyButton}
              onClick={() => handleCopy(demoPassword, "password")}
              title="Copiar contraseña"
            >
              {copied === "password" ? "Copiado" : "📋"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}