import Link from "next/link";

const Verify = async ({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) => {
  const params = await searchParams;
  return (
    <div className="w-full h-screen bg-neutral-950 flex flex-col items-center">
      <h2 className="text-xl text-gray-200 mt-20">
        Please verify your email address
      </h2>
      <p className="text-zinc-400 pt-2 text-center">
        We have sent a verification link to{" "}
        <span className="font-bold text-gray-200">{params.message}</span>.
        Please check your <br />
        inbox and click the link to verify your email.
      </p>
      <Link
        href={"/login"}
        className="mt-4 bg-white text-neutral-900 px-6 rounded-full py-2 font-semibold"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Verify;
