import { useState, useEffect } from "react";
import {validation, validationPass} from "../Validation/Validation";
import style from './Form.module.css'

const Form = ({login}) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }
    const handleBlur = (event) => {
        setErrors(validation({
            ...userData,
            email: event.target.value,
        }))
    }
    const handleBlurPass = (event) => {
        setErrors(validationPass({
            ...userData,
            password: event.target.value
        }))
    }
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData)
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
                type="text" 
                value={userData.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.email && <p className={style.warning}>{errors.email}</p>}
            <br />
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                value={userData.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlurPass}
            />
            {errors.password && <p className={style.warning}>{errors.password}</p>}
            <br />
            <button>Submit</button>
        </form>
    )
}

export default Form;