import { User } from "@supabase/supabase-js";

const Header = ({ user }: { user: User }) => {
  return (
    <header className="py-8 px-12 flex justify-end">
      <div className="">
        <p className="text-gray-200 text-end text-2xl font-medium select-none">
          &quot;Your focus today defines your <br /> success tomorrow,{" "}
          <span className="font-bold text-white">
            {user.user_metadata.first_name}
          </span>
          &quot;
        </p>
      </div>
    </header>
  );
};

export default Header;
