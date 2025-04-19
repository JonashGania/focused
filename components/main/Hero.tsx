import Pomodoro from "./pomodoro/Pomodoro";
import PrioritiesDialog from "./pomodoro/PrioritiesDialog";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

const Hero = async ({ user }: { user: User }) => {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("todos")
    .select()
    .eq("user_id", user.id);

  return (
    <div className="w-full px-8">
      <Pomodoro />
      <PrioritiesDialog tasks={tasks} />
    </div>
  );
};

export default Hero;
