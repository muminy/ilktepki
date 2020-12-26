export default function Sidebar() {
  return (
    <div className="w-full xl:w-1/4 lg:w-1/4 md:w-full hidden xl:block lg:block pl-0 xl:pl-10 lg:pl-4 md:pl-0 ">
      <div className="xl:w-45 lg:w-45 xl:ml-auto lg:ml-auto md:ml-0 md:w-full">
        <div className="uppercase text-gray-700 font-semibold text-xs mb-2 w-full">
          Cevapsız yorumlar
        </div>
        <div className="text-xs leading-4 text-gray-500 font-medium mb-4">
          Sorun giderilecek bir cevabı olmayan postlar
        </div>
        <div className="hover:bg-gray-50 delay-50 duration-300 ease-in-out -mx-4 px-4 py-2 mb-0 bg-white">
          <div className="font-semibold text-sm text-black">
            eren
          </div>
          <div className="leading-5 text-sm">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </div>
        </div>
        <div className="hover:bg-gray-50 delay-50 duration-300 ease-in-out -mx-4 px-4 py-2 mb-0 bg-white">
          <div className="font-semibold text-sm text-black">
            yuşa
          </div>
          <div className="leading-5 text-sm">
            Adam 18 yıl tünel kazıp kaçacak umuda sahip benim
            akşamdan bile umdum yok kalmadı neden acaba?
          </div>
        </div>
        <div className="hover:bg-gray-50 delay-50 duration-300 ease-in-out -mx-4 px-4 py-2 mb-0 bg-white">
          <div className="font-semibold text-sm text-black">
            veee
          </div>
          <div className="leading-5 text-sm">
            Doğuştan dik başlı asi bi kızım
          </div>
        </div>
      </div>
    </div>
  );
}
