import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import { Api } from "lib/api";
import { useEffect, useState } from "react";
import { CommentLink, CreatedPostLink } from "components/ui/CustomLink";
import { useAuthToken } from "context/AuthToken";
import { UserActionSkeleton } from "@components/core/Skeleton/Skeleton";

export default function Profile({ userDetail, UserId }) {
  const [userActions, setUserActions] = useState([]);
  const { USER_ID } = useAuthToken();

  const GetUserActions = async () => {
    const getAllActions = await Api.post("/member/actions", {
      USER_ID: userDetail._id,
    });

    const allArray = getAllActions.data.results;
    setUserActions(allArray);
  };

  useEffect(() => {
    GetUserActions();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center w-full xl:w-3/5 lg:w-3/5 mx-auto ">
        <div className="w-full">
          <div className="flex bg-white shadow-sm rounded-md items-center p-4">
            <Avatar size={60} />
            <div className="ml-4">
              <div className="font-bold text-2xl">{userDetail.name}</div>
              <div className="text-sm">@{userDetail.username}</div>
            </div>
          </div>
          <div className="flex mb-4">
            {USER_ID === userDetail._id ? (
              <div className="w-full shadow-sm py-2 text-center rounded-none xl:rounded-md lg:rounded-md md:rounded-md font-semibold bg-white mt-4">
                Profili düzenle
              </div>
            ) : UserId ? (
              <>
                <div className="w-3/4 bg-white shadow-sm py-2 text-center rounded-none xl:rounded-md lg:rounded-md md:rounded-md mr-4 font-semibold">
                  Mesaj
                </div>
                <div className="w-1/4 bg-white shadow-sm text-red-500 py-2 text-center rounded-none xl:rounded-md lg:rounded-md md:rounded-md text-white font-semibold">
                  Bildir
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {!userActions.length && (
            <>
              <UserActionSkeleton size={2} />
              <UserActionSkeleton size={3} />
              <UserActionSkeleton size={1} />
            </>
          )}
          {userActions.map((item, index) => {
            if (item.type === "comment") {
              return <CommentLink key={index} item={item} index={index} />;
            } else {
              return <CreatedPostLink key={index} item={item} index={index} />;
            }
          })}
        </div>
      </div>
    </Layout>
  );
}

Profile.getInitialProps = async (appContext) => {
  const response = await Api.post("/member/user", {
    username: appContext.query.username,
  });

  const getAllActions = await Api.post("/member/actions", {
    USER_ID: response.data.results._id,
  });

  const allArray = getAllActions.data.results;

  allArray.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return {
    userDetail: response.data.results,
    actions: allArray,
  };
};
