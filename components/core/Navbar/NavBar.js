import Link from "next/link";

import LogoSVG from "@components/icons/Logo";
import Searchbar from "@components/ui/Searchbar";
import Usernav from "@components/ui/Usernav";
import Container from "@components/ui/Container";

export default function Navbar() {
  return (
    <div className="bg-white shadow-sm mb-4 xl:mb-8 lg:mb-8 md:mb-8 pt-4 xl:pb-4 lg:pb-4 md:pb-0 sm:pb-0 px-4 xl:px-0 lg:px-0 md:px-2 sm:px-2 customNavBar ">
      <Container>
        <div className="flex justify-between align-center pb-4 w-full lg:pb-0 xl:pb-0 flex-row relative">
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
      </Container>
    </div>
  );
}
