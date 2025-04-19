import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BackgroundWrapper from "@/components/main/BackgroundWrapper";
import Hero from "@/components/main/Hero";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <BackgroundWrapper />
      <div className="w-full h-screen font-[family-name:var(--font-roboto)]">
        <Hero user={data.user} />
      </div>
    </>
  );
}
