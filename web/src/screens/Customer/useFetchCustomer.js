import { useQuery } from "react-query";
import { requestApi } from "../../configs/api";

export function useFetchCustomer(id) {
  const query = useQuery(["customer", id], fetchCustomer, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  async function fetchCustomer(_, id) {
    const customerReq = await requestApi(`customers/${id}`);
    if (customerReq.status >= 400)
      throw new Error("It was not possible to fetch customer data");

    if (customerReq.status >= 200) {
      return customerReq.json();
    }
  }

  return query;
}
