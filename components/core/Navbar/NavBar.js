import Link from "next/link";

import LogoSVG from "@components/icons/Logo";
import Searchbar from "@components/ui/Searchbar";
import Usernav from "@components/ui/Usernav";

const Navbar = () => {
  return (
    <div className="px-7 py-0">
      <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a>
              <LogoSVG color="#212121" size={34} />
            </a>
          </Link>
          <div className="flex-1 justify-center hidden lg:flex ml-10">
            <Searchbar placeholder="Arama yap" />
          </div>
        </div>

        <div className="flex lg:flex-1 md:flex-2 justify-end space-x-8">
          <Usernav />
        </div>
      </div>

      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar placeholder="Arama yap" />
      </div>
    </div>
  );
};

export default Navbar;
