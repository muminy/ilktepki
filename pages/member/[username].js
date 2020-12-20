import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import { Api } from "lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CommentLink,
  CreatedPostLink,
} from "components/ui/CustomLink";

export default function Profile({ userDetail }) {
  const USER_ID = Cookies.get("USER_ID");

  const [userActions, setUserActions] = useState([]);
  const [Loading, setLoading] = useState(false);

  const getUserActions = async () => {
    const getAllActions = await Api.post("/member/actions", {
      USER_ID: userDetail._id,
    });
    const allArray = getAllActions.data.results;

    allArray.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setUserActions(allArray);
  };
  useEffect(() => {
    getUserActions();
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="flex justify-center xl:w-2/5 lg:w-3/5 md:w-4/5 sm:w-full mx-auto">
        <div className="w-full">
          <div className="text-center mb-4">
            <Avatar size={180} />
          </div>
          <div className="font-bold text-2xl text-center">
            {userDetail.name}
          </div>
          <div className="text-center mb-4 text-sm">
            @{userDetail.username}
          </div>
          <div className="flex mb-10">
            {USER_ID === userDetail._id ? (
              <div className="w-full bg-gray-100 py-2 text-center rounded-md mr-4 font-semibold">
                Profili düzenle
              </div>
            ) : (
              <>
                <div className="w-3/4 bg-gray-100 py-2 text-center rounded-md mr-4 font-semibold">
                  Mesaj
                </div>
                <div className="w-1/4 bg-blue-500 py-2 text-center rounded-md text-white font-semibold">
                  Bildir
                </div>
              </>
            )}
          </div>
          <div className="border-t border-gray-200 py-9">
            {userActions.map((item, index) => {
              if (item.type === "comment") {
                return (
                  <CommentLink
                    key={index}
                    item={item}
                    index={index}
                  />
                );
              } else {
                return (
                  <CreatedPostLink
                    key={index}
                    item={item}
                    index={index}
                  />
                );
              }
            })}
          </div>
          {!userActions.length && (
            <div className="py-6 text-center font-medium text-sm bg-gray-100 rounded-md">
              Kullanıcının son işlemleri yükleniyor
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

Profile.getInitialProps = async ({ query }) => {
  const response = await Api.post("/member/user", {
    username: query.username,
  });

  return {
    userDetail: response.data.results,
  };
};
