export default function Searchbar({ placeholder }) {
  return (
    <div className="flex w-full">
      <input
        placeholder={placeholder}
        className={`searchBar bg-gray-100 placeholder-gray-500 hover:bg-gray-200 focus:bg-gray-100`}
      />
    </div>
  );
}
