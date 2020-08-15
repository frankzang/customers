import { useQuery } from "react-query";
import { requestApi } from "../../configs/api";

function useFetchTotalCustomersByCities() {
  const query = useQuery("cities-customers", fetchCitiesCustomers, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  async function fetchCitiesCustomers() {
    const citiesReq = await requestApi("customers/cities");
    if (citiesReq.status >= 400)
      throw new Error("It was not possible to fetch the cities");

    if (citiesReq.status >= 200) {
      return citiesReq.json();
    }
  }

  return query;
}

export { useFetchTotalCustomersByCities };
