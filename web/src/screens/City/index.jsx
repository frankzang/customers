import React from "react";
import { useParams } from "react-router-dom";
import { useFetchCityCustomer } from "./useFetchCityCustomer";
import { Button } from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./index.module.scss";
import { CityCustomerCard } from "../../components/CityCustomerCard";

export default function City() {
  const { city } = useParams();
  const {
    resolvedData,
    status,
    error,
    refetch,
    page,
    fetchNextPage,
    fetchPreviousPage,
  } = useFetchCityCustomer(city);
  const isLoading = status === "loading";

  return (
    <section className={"site-section"}>
      <h1>{city} customers</h1>

      {isLoading && <ClipLoader size={30} />}
      {error && (
        <p>
          {error.message} <Button onClick={refetch}>Try again</Button>
        </p>
      )}
      <div className={styles["cards-container"]}>
        {Array.isArray(resolvedData?.customers) &&
          resolvedData.customers.map((customer) => {
            return (
              <CityCustomerCard
                key={customer.id}
                id={customer.id}
                firstName={customer.first_name}
                lastName={customer.last_name}
                email={customer.email}
                company={customer.company}
              />
            );
          })}
      </div>
      <footer>
        <div className={styles["page-navigation"]}>
          <Button disabled={isLoading || page <= 0} onClick={fetchPreviousPage}>
            Previous page
          </Button>
          <span>Page: {page + 1}</span>
          <Button
            disabled={isLoading || !resolvedData?.hasMore}
            onClick={fetchNextPage}
          >
            Next page
          </Button>
        </div>
      </footer>
    </section>
  );
}
