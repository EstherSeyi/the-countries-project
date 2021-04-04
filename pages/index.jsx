import { useState, useEffect } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import Search from "../components/icons/search";
import Filter from "../components/filter";

import { useAppQuery } from "../hooks/api";

const queryObs = new Subject().pipe(debounceTime(1000));

export default function Countries() {
  const router = useRouter();
  const [countryName, setCountryName] = useState("");
  const [nameQuery, setNameQuery] = useState("all");
  const { data } = useAppQuery(`countries_${nameQuery}`, {
    url: `/${nameQuery}`,
  });

  useEffect(() => {
    const querySub = queryObs.subscribe(async (deb) => {
      if (deb?.length >= 3) {
        setNameQuery(`name/${deb}`);
      }
    });
    return () => querySub.unsubscribe();
  }, []);
  useEffect(() => {
    if (!countryName || !countryName?.length) {
      setNameQuery(`all`);
    }
  }, [countryName]);

  const handleCountryChange = ({ target }) => {
    if (target.value?.length >= 3) setNameQuery(`name/${target.value}`);
    setCountryName(target.value);
    queryObs.next(target.value);
  };

  const handleCountrySearch = (event) => {
    event.preventDefault();
    console.log(countryName);
  };

  return (
    <Layout pageTitle="Countries">
      <div className="flex my-12 w-11/12 mx-auto justify-between flex-col sm:flex-row text-secondary items-start">
        <form
          onSubmit={handleCountrySearch}
          className="block bg-elements p-2 pl-8 relative  mb-4 sm:mb-0 w-full sm:flex-30 opacity-50"
        >
          <input
            value={countryName}
            name="country-name"
            id="country-name"
            onChange={handleCountryChange}
            className="bg-elements text-sm focus:outline-none w-full"
            placeholder="Search for a country..."
          />
          <button
            type="submit"
            className="focus:outline-none absolute top-3 left-2.5"
          >
            <Search />
          </button>
        </form>
        <Filter />
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(225px,${
            data?.length < 4 ? "250px" : "1fr"
          }))`,
        }}
        className="w-11/12 grid gap-16  mx-auto mt-8"
      >
        {data?.length &&
          data.map((country) => (
            <div
              key={country.alpha3Code}
              className=" flex flex-col shadow-lg cursor-pointer"
            >
              <div className="">
                <img
                  className="w-full h-200 rounded-t-md"
                  src={country.flag}
                  alt={`${country.name ?? "country"}'s flag`}
                />
              </div>
              <div className="bg-elements p-4 text-secondary rounded-b-md h-150">
                <Link
                  href={`/country/${country.name}`}
                  onClick={() => router.push(`/country/${country.name}`)}
                >
                  <p className="block mb-4 font-bold hover:underline">
                    {country.name}
                  </p>
                </Link>
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
