import { GoogleLogout } from "react-google-login";

const clientId = "521123783257-d2stfpejph6ok0djqqpm8e396dsg10c5.apps.googleusercontent.com";

function Logout() {
    const onSuccess = () => {
        console.log("Log out successfully!");
    };

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;