import { useState, useCallback } from "react";
import { usePaginatedQuery } from "react-query";
import { requestApi } from "../../configs/api";

export function useFetchCityCustomer(city) {
  const [page, setPage] = useState(0);
  const query = usePaginatedQuery(
    ["cities-customers", city, page],
    fetchCityCustomers,
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  async function fetchCityCustomers(_, city, page) {
    const citiesReq = await requestApi(`customers/cities/${city}?page=${page}`);
    if (citiesReq.status >= 400)
      throw new Error("It was not possible to fetch clients for this city");

    if (citiesReq.status >= 200) {
      return citiesReq.json();
    }
  }

  const fetchPreviousPage = useCallback(() => {
    if (page <= 0) return;

    setPage(page - 1);
  }, [page]);

  const fetchNextPage = useCallback(() => {
    if (!query.resolvedData?.hasMore) return;

    setPage(page + 1);
  }, [page, query]);

  return { ...query, page, fetchNextPage, fetchPreviousPage };
}
