export default function Filter() {
  return (
    <form className="text-sm w-full sm:flex-20 relative">
      <input
        className="bg-elements w-full p-2 shadow-lg rounded-sm"
        placeholder="Filter by Region"
      />
      <ul className="bg-elements mt-1 pl-4 opacity-1 z-10 absolute w-full shadow-lg rounded-sm">
        {continents.map((continent) => (
          <li className="py-2 hover:opacity-50 cursor-pointer" key={continent}>
            {continent}
          </li>
        ))}
      </ul>
    </form>
  );
}

const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
