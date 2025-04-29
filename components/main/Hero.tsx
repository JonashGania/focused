import Pomodoro from "./pomodoro/Pomodoro";
import PrioritiesDialog from "./pomodoro/PrioritiesDialog";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

const Hero = async ({ user }: { user: User }) => {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("todos")
    .select()
    .eq("user_id", user.id)
    .order("inserted_at", { ascending: true });

  return (
    <div className="flex-1 w-full px-4 min-[450px]:px-8 select-none">
      <Pomodoro />
      <PrioritiesDialog tasks={tasks} />
    </div>
  );
};

export default Hero;
