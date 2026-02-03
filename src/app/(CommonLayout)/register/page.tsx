import { SignupForm } from "@/components/modules/authentication/signup-form";
import { authClient } from "@/lib/auth-client";
import { CloudCog } from "lucide-react";

const RegisterPage = async() => {

    const session = await authClient.getSession()

    console.log(session)

  return (
    <div>
      <SignupForm></SignupForm>
    </div>
  );
};

export default RegisterPage;
