import React from "react";
import styles from "./Form.module.css";
import validation from "./validation.jxs";


export default function Form(props) {

    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = React.useState({});
    // errors = {}
    // errors = { email: tiene...., password: tiene...}

    const handleChange = event => {
        const {name, value} = event.target; // { name:-, value:- }
        setUserData({
            ...userData,
            [name]: value
        })
        // console.log(userData);
        setErrors(validation({
            ...userData,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        props.login(userData);
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
                <p className={styles.error}>{errors.email ? errors.email : null}</p>

                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />
                <p className={styles.error}>{errors.password ? errors.password : null}</p>
                <hr />

                <button type="submit">Submit</button>

            </form>
        </div>
    )
}