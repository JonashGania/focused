import Pomodoro from "./Pomodoro";
import CreateDialog from "../dialogs/CreateDialog";

const Hero = () => {
  return (
    <div className="w-full px-8">
      <Pomodoro />
      <CreateDialog />
      {/* <div className="flex mt-6 max-w-[500px] mx-auto">
        <p className="flex-1 text-white text-center font-bold text-3xl cursor-pointer">
          Add your priorities for the day ✏️
        </p>
      </div> */}
    </div>
  );
};

export default Hero;
