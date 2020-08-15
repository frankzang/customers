import React from "react";
import { useParams } from "react-router-dom";
import { useFetchCustomer } from "./useFetchCustomer";
import { Button } from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./index.module.scss";

export default function Customer() {
  const { id } = useParams();
  const { data, status, error, refetch } = useFetchCustomer(id);
  const isLoading = status === "loading";

  return (
    <section className={"site-section"}>
      <h1>Customer information</h1>
      {isLoading && <ClipLoader size={30} />}
      {error && (
        <p>
          {error.message} <Button onClick={refetch}>Try again</Button>
        </p>
      )}
      {data && (
        <>
          <div className={styles["customer-details"]}>
            <h2>
              {data.first_name} {data.last_name}
            </h2>
            <table>
              <tbody>
                <tr>
                  <th>Email</th>
                  <td>{data.email || "-"}</td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td>{data.title || "-"}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{data.gender || "-"}</td>
                </tr>
                <tr>
                  <th>Company</th>
                  <td>{data.company || "-"}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{data.city || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {data.lat && data.long && (
            <iframe
              title="user location"
              width="600"
              height="450"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCp9QzLbkbT6MUwU807kr_R2gf_Y3-Rssk
        &q=${data.lat},${data.long}`}
            ></iframe>
          )}
        </>
      )}
    </section>
  );
}
