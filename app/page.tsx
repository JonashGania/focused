import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/actions/auth";
import BackgroundWrapper from "@/components/BackgroundWrapper";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <BackgroundWrapper />
      <div className="w-full h-screen">
        <div></div>
        <div>
          <h1 className="text-white">This is main page</h1>
          <form action={signout}>
            <button className="bg-white text-black cursor-pointer px-5 py-2">
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
