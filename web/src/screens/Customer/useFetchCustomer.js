import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { requestApi } from "../../configs/api";

export function useFetchCustomer(id) {
  const [page, setPage] = useState(0);
  const query = useQuery(["customer", id], fetchCustomer, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  async function fetchCustomer(_, id) {
    const citiesReq = await requestApi(`customers/${id}`);
    if (citiesReq.status >= 400)
      throw new Error("It was not possible to fetch customer data");

    if (citiesReq.status >= 200) {
      return citiesReq.json();
    }
  }

  return { ...query };
}
