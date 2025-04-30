import LoginForm from "@/components/auth/form/LoginForm";
import { Suspense } from "react";

const Login = () => {
  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
