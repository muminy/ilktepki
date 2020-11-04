import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";

export default function Profile() {
  return (
    <Layout>
      <div className="flex justify-center xl:w-2/5 lg:w-3/5 md:w-4/5 sm:w-full mx-auto">
        <div className="w-full">
          <div className="mx-auto w-32 h-32 mb-10">
            <Avatar size={32} />
          </div>
          <div className="font-semibold text-xl text-center mb-1">
            Erhan Düdük
          </div>
          <div className="text-center mb-4 text-sm">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </div>
          <div className="flex mb-10">
            <div className="w-3/4 bg-gray-100 py-2 text-center rounded-md mr-4 font-semibold">
              Mesaj
            </div>
            <div className="w-1/4 bg-blue-500 py-2 text-center rounded-md text-white font-semibold">
              Bildir
            </div>
          </div>
          <div className="border-t border-gray-200 py-9">
            <div className="text-sm">
              Konuya{" "}
              <span className="font-bold">
                "Lorem Ipsum is simply dummy text of the printing
                and typesetting industry."
              </span>{" "}
              yazdı{" "}
              <span className="text-xs text-gray-400 ml-2">
                10 dakika önce
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
