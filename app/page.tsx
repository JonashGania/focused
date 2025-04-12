import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BackgroundWrapper from "@/components/home/BackgroundWrapper";
import Hero from "@/components/home/Hero";

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
        <Hero />
      </div>
    </>
  );
}
