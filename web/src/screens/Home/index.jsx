import React from "react";
import { Button } from "../../components/Button";
import { CityCard } from "../../components/CityCard";
import { useFetchTotalCustomersByCities } from "./useFetchCitiesCustomers";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./index.module.scss";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const { logout } = useAuth0();
  const { data, error, status, refetch } = useFetchTotalCustomersByCities();

  return (
    <section className="site-section">
      <h1>Total customers in cities</h1>
      <Button onClick={logout}>Log out</Button>
      {status === "loading" && <ClipLoader size={30} />}
      {error && (
        <p>
          {error.message} <Button onClick={refetch}>try again</Button>
        </p>
      )}
      <div className={styles["cards-container"]}>
        {Array.isArray(data) &&
          data.map((city) => (
            <CityCard
              key={city.city}
              name={city.city}
              customersTotal={city.customers_total}
            />
          ))}
      </div>
    </section>
  );
}
