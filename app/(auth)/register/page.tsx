import RegisterForm from "@/components/auth/form/RegisterForm";
import { Suspense } from "react";

const Register = () => {
  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default Register;
