import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BackgroundWrapper from "@/components/main/BackgroundWrapper";
import Hydrated from "@/components/main/Hydrated";
import Hero from "@/components/main/Hero";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <Hydrated>
      <BackgroundWrapper />
      <div className="w-full flex flex-col min-h-screen font-[family-name:var(--font-roboto)]">
        <Header user={data.user} />
        <Hero user={data.user} />
        <Footer />
      </div>
    </Hydrated>
  );
}
