import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const ContinueButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <button
      className={twMerge(
        "bg-indigo-500 hover:bg-indigo-600 py-4 px-6 text-xl font-semibold rounded-2xl text-gray-200 cursor-pointer",
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default ContinueButton;
