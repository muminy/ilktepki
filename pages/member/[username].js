import Avatar from "@components/core/Avatar";

import { useEffect, useState } from "react";

import { Api } from "lib/api";
import { CommentLink, CreatedPostLink } from "components/ui/CustomLink";
import { useAuthToken } from "context/AuthToken";
import { UserActionSkeleton } from "@components/core/Skeleton/Skeleton";
import { useRouter } from "next/router";

import Layout from "@components/core/Layout";
import Cookies from "js-cookie";

export default function Profile({ userDetail }) {
  const router = useRouter();
  const [userActions, setUserActions] = useState([]);
  const { USER_ID } = useAuthToken();

  const [userActionLoaded, setActionLoaded] = useState(false);

  const GetUserActions = async () => {
    const getAllActions = await Api.post("/member/actions", {
      USER_ID: userDetail._id,
    });

    const allArray = getAllActions.data.results;
    setUserActions(allArray);
    setActionLoaded(true);
  };

  const LogOut = async () => {
    Cookies.remove("JWT_TOKEN");
    Cookies.remove("USER_ID");
    router.push("/");
  };
  useEffect(() => {
    GetUserActions();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center w-full xl:w-3/5 lg:w-3/5 mx-auto ">
        <div className="w-full">
          <div className="flex bg-white justify-between items-center shadow-sm rounded-md items-center p-4">
            <div className="flex items-center">
              <Avatar size={60} />
              <div className="ml-4">
                <div className="font-bold text-2xl">{userDetail.name}</div>
                <div className="text-sm">@{userDetail.username}</div>
              </div>
            </div>
          </div>
          <div className="flex mb-4">
            {USER_ID === userDetail._id ? (
              <>
                <div className="w-3/5 mr-4 shadow-sm outline-none focus:outline-none py-2 text-center rounded-none xl:rounded-md lg:rounded-md md:rounded-md font-semibold bg-white mt-4">
                  Profili düzenle
                </div>
                <button
                  onClick={LogOut}
                  className="w-2/5 ml-4 outline-none focus:outline-none px-2 rounded-none xl:rounded-md lg:rounded-md md:rounded-md shadow-sm mt-4 bg-white font-semibold text-red-500"
                >
                  Çıkış Yap
                </button>
              </>
            ) : USER_ID ? (
              <>
                <div className="w-3/5 mt-4 bg-white shadow-sm py-2 text-center rounded-none xl:rounded-md lg:rounded-md md:rounded-md mr-4 font-semibold">
                  Mesaj
                </div>
                <div className="w-2/5 mt-4   bg-white shadow-sm text-red-500 py-2 text-center rounded-none xl:rounded-md lg:rounded-md md:rounded-md text-white font-semibold">
                  Bildir
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {!userActionLoaded && (
            <>
              <UserActionSkeleton size={2} />
              <UserActionSkeleton size={3} />
              <UserActionSkeleton size={1} />
            </>
          )}
          {userActionLoaded && !userActions.length ? (
            <div className="shadow-sm bb py-1 rounded-md px-4">
              <img src="https://cdn.dribbble.com/users/2629812/screenshots/6431843/5.png?compress=1&resize=800x600" />
              <div className="text-center my-4 font-medium">
                Bu kullanıcıya ait hiç birşey bulamadık
              </div>
            </div>
          ) : null}
          {userActions.map((item, index) => {
            if (item.type === "comment") {
              return <CommentLink key={index} item={item} index={index} />;
            } else {
              return <CreatedPostLink key={index} item={item} index={index} />;
            }
          })}
        </div>
      </div>
      <style jsx>
        {`
          .bb {
            background-color: #ffffff;
          }
        `}
      </style>
    </Layout>
  );
}

Profile.getInitialProps = async (appContext) => {
  const response = await Api.post("/member/user", {
    username: appContext.query.username,
  });
  return {
    userDetail: response.data.results,
  };
};
