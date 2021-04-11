import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function Filter({ currentRegion }) {
  const router = useRouter();
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setCurrValue] = useState("");

  useEffect(() => {
    setCurrValue(currentRegion ?? "");
  }, [currentRegion]);

  const handleClick = (event) => {
    if (dropdownRef.current.contains(event.target)) {
      return;
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <form
      className="text-sm w-full sm:flex-20 relative"
      ref={dropdownRef}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <input
        className="bg-elements w-full p-2 shadow-lg rounded-sm focus:outline-none cursor-pointer capitalize"
        placeholder="Filter by Region"
        onClick={() => setShowDropdown(!showDropdown)}
        name="region"
        disabled={true}
        value={value}
        onChange={() => {
          return;
        }}
      />
      <ul
        className={`bg-elements mt-1 pl-4 opacity-1 z-10 absolute w-full shadow-lg rounded-sm ${
          showDropdown ? "" : "hidden"
        }`}
      >
        {regions.map((region) => (
          <li
            onClick={() => {
              router.push(`/region/${region.value}`);
              setCurrValue(region.label);
              setShowDropdown(!showDropdown);
            }}
            className="py-2 hover:opacity-50 cursor-pointer"
            key={region.value}
          >
            {region.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

const regions = [
  { label: "Africa", value: "africa" },
  { label: "Americas", value: "americas" },
  { label: "Asia", value: "asia" },
  { label: "Europe", value: "europe" },
  { label: "Oceania", value: "oceania" },
];
