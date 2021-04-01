import { useRouter } from "next/router";

import Layout from "../../components/layout";
import BackArrow from "../../components/icons/back-arrow";

export default function Country() {
  const router = useRouter();
  const { pid } = router.query;

  console.log(pid);

  return (
    <Layout pageTitle="Countries">
      <div className="w-11/12 mx-auto mt-16 mb-16">
        <button className="bg-elements shadow-lg py-2 px-5 text-secondary flex items-center mb-16">
          <BackArrow />
          <span className="ml-2">Back</span>
        </button>
        <div className="text-secondary flex flex-col sm:flex-row justify-between">
          <div className="flex-35 mb-8 sm:mb-none sm:mr-10">
            <img
              src="https://cutt.ly/2ctCroO"
              alt="avatar"
              className="w-full h-96"
            />
          </div>
          <div className="flex-40">
            <h2 className="text-2xl font-bold mb-6">Belgium</h2>
            <div className="md:flex justify-between my-auto">
              <div className="flex-35">
                <p className="mb-2">
                  <span>Native Name: </span>
                  <span className="opacity-50">Belgie</span>
                </p>
                <p className="mb-2">
                  <span>Population: </span>
                  <span className="opacity-50">11,319,511</span>
                </p>
                <p className="mb-2">
                  <span>Region: </span>
                  <span className="opacity-50">Europe</span>
                </p>
                <p className="mb-2">
                  <span>Sub Region: </span>
                  <span className="opacity-50">Western Europe</span>
                </p>
                <p className="mb-2">
                  <span>Capital: </span>
                  <span className="opacity-50">Brussels</span>
                </p>
              </div>
              <div className="flex-35">
                <p className="mb-2">
                  <span>Top Level Domain: </span>
                  <span className="opacity-50">.be</span>
                </p>
                <p className="mb-2">
                  <span>Currencies: </span>
                  <span className="opacity-50">Euro</span>
                </p>
                <p className="mb-2">
                  <span>Languages: </span>
                  <span className="opacity-50">Dutch, French, German</span>
                </p>
              </div>
            </div>
            <div className="text-secondary mt-8">
              <p className="flex items-center">
                <span className="mr-4">Border Countries: </span>
                <span className="flex flex-wrap">
                  <span className="shadow py-2 px-4 mb-2 bg-elements mr-2">
                    France
                  </span>
                  <span className="shadow py-2 px-4 bg-elements mb-2 mr-2">
                    Germany
                  </span>
                  <span className="shadow py-2 px-4 bg-elements mb-2 mr-2">
                    Netherland
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
