import { LoginForm } from "@/components/authentication/login-form";
import { Suspense } from "react";
const LoginPage = () => {
   return( 
      <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
      </Suspense>   
   )
}

export default LoginPage;