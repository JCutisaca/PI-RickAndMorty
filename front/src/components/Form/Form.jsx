import { useState, useEffect } from "react";
import {validation, validationPass} from "../Validation/Validation";
import style from './Form.module.css';
import imageCircle from '../Images/circlelock.png'

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
        <div className={style.background}>
        <form className={style.form} onSubmit={handleSubmit}>
            <p>
            <img src={imageCircle} className={style.imageCircle}/>
            </p>
      <input
        placeholder="Email"
        className={style.loginemail}
        type="text"
        value={userData.email}
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && <p className={style.warning}>{errors.email}</p>}
      <br />
      <input
        placeholder="Password"
        className={style.loginpass}
        type="password"
        value={userData.password}
        name="password"
        onChange={handleChange}
        onBlur={handleBlurPass}
      />
      {errors.password && <p className={style.warning}>{errors.password}</p>}
      <br />
      <button className={style.submit} type="submit">Login</button>
    </form>
    </div>
    )
}

export default Form;