import { GoogleLogin } from "react-google-login";

const clientId = "521123783257-d2stfpejph6ok0djqqpm8e396dsg10c5.apps.googleusercontent.com"

const LoginGoogle = () => {
    const onSuccess = (res) => {
        // console.log("Login Success! current user: ", res.profileObj);
        // console.log({profileObj: res.profileObj});
        const name = res.profileObj.familyName;
        console.log(name);
    };

    const onFailure = (res) => {
        console.log("Login Failed: res: ", res);
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiesPolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
}

export default LoginGoogle;