import { useState, useEffect } from "react";
import { validation, validationPass } from "../Validation/Validation";
import style from './Form.module.css';
import imageCircle from '../Images/circlelock.png'
import rickCreate from '../Images/rickCreate.png'
import axios from "axios";

const Form = ({ login }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createError, setCreateError] = useState(null);

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
    const [errorsCreate, setErrorsCreate] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData)
    }
    const handleSubmit2 = (event) => {
        event.preventDefault();
        createUser(postUser)
    }
    const [postUser, setPostUser] = useState({
        email: '',
        password: ''
    })
    const handleChange2 = (event) => {
        setPostUser({
            ...postUser,
            [event.target.name]: event.target.value
        })
    }
    const handleBlur2 = (event) => {
        setErrorsCreate(validation({
            ...postUser,
            email: event.target.value,
        }))
    }
    const handleBlurPass2 = (event) => {
        setErrorsCreate(validationPass({
            ...postUser,
            password: event.target.value
        }))
    }
    const createUser = async (postUser) => {
        try {
            setCreateError()
            const { email, password } = postUser;
            const URL = 'http://localhost:3001/rickandmorty/login/';
            const { data } = await axios.post(URL, {
                email,
                password
            });
            window.alert("User created successfully.")
            setShowCreateForm(false)
            setShowLoginForm(true);
        } catch (error) {
            setCreateError(error.response.data);
        }
    }
    return (
        <div className={style.background}>
            {showLoginForm &&
                <form className={style.form} onSubmit={handleSubmit}>
                    <p>
                        <img src={imageCircle} className={style.imageCircle} />
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
                    <p className={style.text}>Not registered? <a className={style.text} href="#" onClick={() => { setShowLoginForm(false); setShowCreateForm(true); }}>Create an account</a></p>
                </form>
            }
            {showCreateForm &&
                <form className={style.form} onSubmit={handleSubmit2}>
                    <p>
                        <img src={rickCreate} className={style.imageCircle} />
                    </p>
                    <input
                        placeholder="Email"
                        className={style.loginemail}
                        type="text"
                        value={postUser.email}
                        name="email"
                        onChange={handleChange2}
                        onBlur={handleBlur2}
                    />
                    {errors.email && <p className={style.warning}>{errors.email}</p>}
                    {createError && <p className={style.warning}>{createError}</p>}
                    <br />
                    <input
                        placeholder="Password"
                        className={style.loginpass}
                        type="password"
                        value={postUser.password}
                        name="password"
                        onChange={handleChange2}
                        onBlur={handleBlurPass2}
                    />
                    {errors.password && <p className={style.warning}>{errors.password}</p>}

                    <br />
                    <button className={style.submit} type="submit">Create</button>
                    <p className={style.text}>Already registered? <a className={style.text} href="#" onClick={() => { setShowLoginForm(true); setShowCreateForm(false) }}>Sig In</a></p>
                </form>
            }
        </div>
    )
}

export default Form;