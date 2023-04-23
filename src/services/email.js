import { validateEmail } from "../utilities/emailValidattion.js";
import Sib from "sib-api-v3-sdk/src/index.js";
import configData from "../../config.js";


export const sendUserPassword = async(email, password) => {
    try {
        let validatedEmail = validateEmail(email);
        if (!validatedEmail) {
          return false;
        }
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = configData.sendInBlueApiKey;
        console.log(apiKey.apiKey);
        const transactionalEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
          name: "Lovetap TV",
          email: "lovetapnetworks@gmail.com",  
        };

        const receivers = [{ email: `michaelchinye2018@gmail.com` }]; //${email}
        transactionalEmailApi
          .sendTransacEmail({
            sender,
            to: receivers,
            subject: "Welcome",
            htmlContent:`<div>
                <p>Welcome. Kindly use the credentials below to login to your account </p>
                <p>Your Password is: ${password}</p>            
            </div>`,
          })
          .then((response) => {
            console.log(response);
          });
        return true;
    } catch (error) {
        return error.message
    }
}