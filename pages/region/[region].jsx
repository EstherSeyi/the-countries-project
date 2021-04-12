import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../../components/layout";
import BackArrow from "../../components/icons/back-arrow";
import Filter from "../../components/filter";
import Loading from "../../components/loading";

import { useAppQuery } from "../../hooks/api";

export default function CountryByRegion() {
  const router = useRouter();
  const { region } = router.query;

  const { data, isLoading, error } = useAppQuery(`countries_${region ?? ""}`, {
    url: `/region/${region ?? ""}`,
  });

  return (
    <Layout pageTitle="Countries">
      <div className="flex my-12 w-11/12 mx-auto justify-between flex-col sm:flex-row text-secondary items-start">
        <button
          className="bg-elements shadow-lg py-2 px-5 text-secondary flex items-center mb-16"
          onClick={() => router.back()}
        >
          <BackArrow />
          <span className="ml-2">Back</span>
        </button>

        <Filter currentRegion={region} />
      </div>
      {isLoading ? (
        <Loading />
      ) : !isLoading && !error ? (
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
      ) : (
        <p className="text-secondary text-center">
          An Error Occurred - {error}
        </p>
      )}
    </Layout>
  );
}
