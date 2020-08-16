import { useState, useCallback } from "react";
import { usePaginatedQuery } from "react-query";
import { requestApi } from "../../configs/api";

export function useFetchCityCustomer(city) {
  const [page, setPage] = useState(0);
  const query = usePaginatedQuery(
    ["city-customers", city, page],
    fetchCityCustomers,
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  async function fetchCityCustomers(_, city, page) {
    const cityCustomersReq = await requestApi(
      `customers/cities/${city}?page=${page}`
    );
    if (cityCustomersReq.status >= 400)
      throw new Error("It was not possible to fetch clients for this city");

    if (cityCustomersReq.status >= 200) {
      return cityCustomersReq.json();
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
