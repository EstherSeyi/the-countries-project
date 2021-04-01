import { useState } from "react";

import Layout from "../components/layout";
import Search from "../components/icons/search";

import { useAppQuery } from "../hooks/api";

export default function Countries() {
  const [countryName, setCountryName] = useState("");
  const { data } = useAppQuery("countries", {
    url: `${process.env.NEXT_PUBLIC_API_URL}/all`,
  });

  // name/{name}

  const handleCountryChange = ({ target }) => {
    console.log(target.value);
    setCountryName(target.value);
  };

  const handleCountrySearch = (event) => {
    event.preventDefault();
    console.log(countryName);
  };

  return (
    <Layout pageTitle="Countries">
      <div className="flex my-12 w-11/12 mx-auto justify-between flex-col sm:flex-row text-secondary opacity-50">
        <form
          onSubmit={handleCountrySearch}
          className="block bg-elements p-2 pl-8 relative  mb-4 sm:mb-0 flex-30"
        >
          <input
            value={countryName}
            name="country-name"
            id="country-name"
            onChange={handleCountryChange}
            className="bg-elements text-sm focus:outline-none"
            placeholder="Search for a country..."
          />
          <button
            type="submit"
            className="focus:outline-none absolute top-3 left-2.5"
          >
            <Search />
          </button>
        </form>
        <div className="bg-elements p-2 text-sm flex-20">
          <input className="bg-elements" placeholder="Filter by Region" />
        </div>
      </div>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(225px,1fr))",
        }}
        className="w-11/12 grid gap-16  mx-auto mt-8"
      >
        {data?.length &&
          data.map((country) => (
            <div className=" flex flex-col shadow-lg cursor-pointer">
              <div className="">
                <img
                  className="w-full h-200 rounded-t-md"
                  src={country.flag}
                  alt={`${country.name ?? "country"}'s flag`}
                />
              </div>
              <div className="bg-elements p-4 text-secondary rounded-b-md h-150">
                <p className="mb-4 font-bold hover:underline">{country.name}</p>
                <p>
                  <span>Population: </span>
                  <span className="opacity-50">{country.name}</span>
                </p>
                <p>
                  <span>Region: </span>
                  <span className="opacity-50">{country.region}</span>
                </p>
                <p>
                  <span>Capital: </span>
                  <span className="opacity-50">{country.capital}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}
