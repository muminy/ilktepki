import { SpinIcon } from "@constants/icons";
import Avatar from "../Avatar";
import Layout from "../Layout";
import Sidebar from "../Sidebar";

export default function Skeleton() {
  return (
    <Layout>
      <div className="w-full rounded-md flex items-center xl:w-3/4 lg:w-3/4 pr-0 xl:pr-10 lg:pr-10 py-8 pb-0 bg-white px-8 shadow-sm mr-0 md:mr-16">
        <div className="w-full">
          <div className="flex items-center mb-2">
            <Avatar />
            <div className="font-semibold w-40 rounded-md h-6 bg-gray-100 text-base ml-4"></div>
          </div>
          <div className="font-semibold w-full rounded-md h-8 mb-4 bg-gray-100 text-base"></div>
          <div className="flex mb-4 items-center mb-10">
            <div className="font-semibold w-20 rounded-md h-4 bg-gray-100 text-base"></div>
          </div>
          <div className="mb-10 leading-1">
            <div className="font-semibold w-full rounded-md h-4 bg-gray-100 text-base mb-2"></div>
            <div className="font-semibold w-full rounded-md h-4 bg-gray-100 text-base mb-2 mr-8"></div>
            <div className="font-semibold w-32 rounded-md h-4 bg-gray-100 text-base mb-8"></div>
            <div className="font-semibold w-32 rounded-md h-4 bg-gray-100 text-base"></div>
          </div>
        </div>
      </div>
      <Sidebar />
    </Layout>
  );
}

export const CommentSkeleton = () => (
  <div className="w-full flex mb-4 pr-6">
    <div>
      <Avatar />
    </div>
    <div className="ml-4 w-full">
      <div className="w-20 h-4 bg-gray-100 rounded-md mb-4"></div>
      <div className="w-full h-2 bg-gray-100 rounded-md mb-2"></div>
      <div className="w-full h-2 bg-gray-100 rounded-md mb-2"></div>
      <div className="w-20 h-2 bg-gray-100 rounded-md mb-4"></div>
      <div className="w-full h-2 bg-gray-100 rounded-md mb-2"></div>
      <div className="w-full h-2 bg-gray-100 rounded-md mb-2"></div>
      <div className="w-20 h-2 bg-gray-100 rounded-md mb-4"></div>
    </div>
  </div>
);

export const NavbarSkeleton = () => (
  <ul className="list-none p-0 m-0 flex">
    <SpinIcon color="red" />
  </ul>
);

export const UserActionSkeleton = ({ size }) => (
  <div className="w-full bg-white shadow-sm rounded-sm p-2 mb-2 flex justify-between">
    <div className={`w-${size}/4 bg-gray-100 rounded-md h-4`}></div>
    <div className="w-28 bg-gray-100 rounded-md h-4"></div>
  </div>
);
