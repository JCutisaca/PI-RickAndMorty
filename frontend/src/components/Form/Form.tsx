import React, { useState, useEffect } from "react";
import style from './Form.module.css';
import imageCircle from '../Images/circlelock.png'
import rickCreate from '../Images/rickCreate.png'
import axios from "axios";

type FormProps = {
    login: (userData: { email: string; password: string }) => Promise<void>;
    logout: () => void;
};

const Form: React.FC<FormProps> = ({ login, logout }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    // const [createError, setCreateError] = useState(null);
    type FormErrors = {
        email?: string;
        password?: string;
    };
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            email: event.target.value
        });
        validation({ ...userData, email: event.target.value }, setErrors);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            password: event.target.value
        });
        validation({ ...userData, password: event.target.value }, setErrors);
    };

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexNumber = /\d/;


    const validation = (data: { email: any; password: any; }, setErrors: { (value: React.SetStateAction<{}>): void; (value: React.SetStateAction<{}>): void; (arg0: {}): void; }) => {
        let newErrors = {};
        if (!data.email.length) {
            newErrors = {
                ...newErrors,
                email: 'Username cannot be empty'
            };
        } if (!regexEmail.test(data.email)) {
            newErrors = {
                ...newErrors,
                email: 'The entered email is not valid'
            };
        } if (data.email.length > 35) {
            newErrors = {
                ...newErrors,
                email: 'Email cannot exceed 35 characters'
            };
        }
        if (data.password.length < 6 || data.password.length > 10) {
            newErrors = {
                ...newErrors,
                password: 'Password must be between 6 and 10 characters'
            };
        }
        if (!regexNumber.test(data.password)) {
            newErrors = {
                ...newErrors,
                password: 'Password must contain at least one number'
            };
        }
        setErrors(newErrors);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        login(userData);
    };

    const [errorsPost, setErrorsPost] = useState<FormErrors>({})

    const validationPost = (postUser: { email: any; password: any; }, setErrorsPost: { (value: React.SetStateAction<{}>): void; (value: React.SetStateAction<{}>): void; (arg0: {}): void; }) => {
        let newErrors = {};
        if (!postUser.email.length) {
            newErrors = {
                ...newErrors,
                email: 'Username cannot be empty'
            };
        } if (!regexEmail.test(postUser.email)) {
            newErrors = {
                ...newErrors,
                email: 'The entered email is not valid'
            };
        } if (postUser.email.length > 35) {
            newErrors = {
                ...newErrors,
                email: 'Email cannot exceed 35 characters'
            };
        }
        if (postUser.password.length < 6 || postUser.password.length > 10) {
            newErrors = {
                ...newErrors,
                password: 'Password must be between 6 and 10 characters'
            };
        }
        if (!regexNumber.test(postUser.password)) {
            newErrors = {
                ...newErrors,
                password: 'Password must contain at least one number'
            };
        }
        setErrorsPost(newErrors);
    };

    const handleSubmit2 = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        createUser(postUser)
    }
    const [postUser, setPostUser] = useState({
        email: '',
        password: ''
    })
    const handleChangePost = (event: { target: { value: any; }; }) => {
        setPostUser({
            ...postUser,
            email: event.target.value
        });
        validationPost({ ...postUser, email: event.target.value }, setErrorsPost);
    };

    const handleChangePasswordPost = (event: { target: { value: any; }; }) => {
        setPostUser({
            ...postUser,
            password: event.target.value
        });
        validationPost({ ...postUser, password: event.target.value }, setErrorsPost);
    };

    const createUser = async (postUser: { email: any; password: any; }) => {
        try {
            // setCreateError()
            const { email, password } = postUser;
            const URL = '/rickAndMorty/user/';
            await axios.post(URL, {
                email,
                password
            });
            window.alert("User created successfully.")
            setShowCreateForm(false)
            setShowLoginForm(true);
        } catch (error: any) {
            window.alert(error?.response.data);
        }
    }

    useEffect(() => {
        logout()
    }, [])

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
                    />
                    {errors?.email && <p className={style.warning}>{errors.email}</p>}
                    <br />
                    <input
                        placeholder="Password"
                        className={style.loginpass}
                        type="password"
                        value={userData.password}
                        name="password"
                        onChange={handleChangePassword}
                    />
                    {errors?.password && <p className={style.warning}>{errors.password}</p>}
                    <br />
                    <button disabled={!(Object.keys(errors).length === 0)} className={style.submit} type="submit">Login</button>
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
                        onChange={handleChangePost}
                    />
                    {errorsPost.email && <p className={style.warning}>{errorsPost.email}</p>}
                    <br />
                    <input
                        placeholder="Password"
                        className={style.loginpass}
                        type="password"
                        value={postUser.password}
                        name="password"
                        onChange={handleChangePasswordPost}
                    />
                    {errorsPost.password && <p className={style.warning}>{errorsPost.password}</p>}

                    <br />
                    <button disabled={!(Object.keys(errorsPost).length === 0)} className={style.submit} type="submit">Create</button>
                    <p className={style.text}>Already registered? <a className={style.text} href="#" onClick={() => { setShowLoginForm(true); setShowCreateForm(false) }}>Sig In</a></p>
                </form>
            }
        </div>
    )
}

export default Form;