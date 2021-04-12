import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout";
import BackArrow from "../../components/icons/back-arrow";
import Loading from "../../components/loading";

import http from "../../utils/http";

export default function Country() {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    data: null,
    isError: false,
  });

  useEffect(() => {
    const getCountry = async () => {
      try {
        setIsLoading(true);
        const { data } = await http().get(`/name/${pid}?fullText=true`);

        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError({
          isError: true,
          data: error,
        });
      }
    };
    if (pid) {
      getCountry();
    }
  }, [pid]);

  const isLast = (index, data) => index === data?.length - 1;

  return (
    <Layout pageTitle={pid}>
      <div className="w-11/12 mx-auto mt-16 mb-16">
        <button
          className="bg-elements shadow-lg py-2 px-5 text-secondary flex items-center mb-16"
          onClick={() => router.back()}
        >
          <BackArrow />
          <span className="ml-2">Back</span>
        </button>

        {isLoading ? (
          <Loading />
        ) : !error.isError && !isLoading ? (
          <>
            {data[0] ? (
              <div className="text-secondary flex flex-col sm:flex-row justify-between">
                <div className="flex-35 mb-8 sm:mb-none sm:mr-10">
                  <img
                    src={data ? data[0].flag : "https://cutt.ly/2ctCroO"}
                    alt={`${pid} flag`}
                    className="w-full h-96"
                  />
                </div>
                <div className="flex-40">
                  <h2 className="text-2xl font-bold mb-6">{pid}</h2>
                  <div className="md:flex justify-between my-auto">
                    <div className="flex-35">
                      <p className="mb-2">
                        <span className="mr-2">Native Name: </span>
                        <span className="opacity-50">
                          {data[0]?.nativeName ?? ""}
                        </span>
                      </p>
                      <p className="mb-2">
                        <span className="mr-2">Population: </span>
                        <span className="opacity-50">
                          {data[0]?.population ?? ""}
                        </span>
                      </p>
                      <p className="mb-2">
                        <span className="mr-2">Region: </span>
                        <span className="opacity-50">
                          {data[0]?.region ?? ""}
                        </span>
                      </p>
                      <p className="mb-2">
                        <span className="mr-2">Sub Region: </span>
                        <span className="opacity-50">
                          {data[0].subregion ?? "N/A"}
                        </span>
                      </p>
                      <p className="mb-2">
                        <span className="mr-2">Capital: </span>
                        <span className="opacity-50">
                          {data[0].capital ?? "N/A"}
                        </span>
                      </p>
                    </div>
                    <div className="flex-35">
                      <p className="mb-2">
                        <span className="mr-2">Top Level Domain: </span>

                        {data && data[0].topLevelDomain
                          ? data[0].topLevelDomain.map((item, index) => (
                              <span className="opacity-50" key={item}>
                                {item}
                                {isLast(index, data[0].topLevelDomain)
                                  ? ""
                                  : ", "}
                              </span>
                            ))
                          : null}
                      </p>
                      <p className="mb-2">
                        <span className="mr-2">Currencies: </span>

                        {data && data[0].currencies
                          ? data[0].currencies.map((item, index) => {
                              return (
                                <span key={item.code} className="opacity-50">
                                  {item.name}{" "}
                                  {isLast(index, data[0].currencies)
                                    ? ""
                                    : ", "}
                                </span>
                              );
                            })
                          : null}
                      </p>
                      <p className="mb-2">
                        <span className="mr-2">Languages: </span>
                        <span className="opacity-50">
                          {data && data[0].languages
                            ? data[0].languages.map((item, index) => (
                                <Fragment key={index}>
                                  {item.name}
                                  {isLast(index, data[0].languages) ? "" : ", "}
                                </Fragment>
                              ))
                            : null}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-secondary mt-8">
                    <p className="flex items-center">
                      <span className="mr-4">Border Countries: </span>
                      <span className="flex flex-wrap">
                        {data && data[0].borders?.length ? (
                          data[0].borders.map((item, index) => (
                            <span
                              key={`${index}_${item}`}
                              className="shadow py-2 px-4 mb-2 bg-elements mr-2"
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <em className="opacity-50">No border countries</em>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-secondary text-center">
            {error.response
              ? error.response.data.message
              : "An Error Occured, Please try Again"}
          </p>
        )}
      </div>
    </Layout>
  );
}
