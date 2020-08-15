import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../configs/routes";
import styles from "./index.module.scss";

export function CityCard({ name, customersTotal }) {
  return (
    <Link
      to={`${Routes.CITY}/${name}`}
      aria-label={`City: ${name}`}
      className={styles.card}
    >
      <article>
        <h1>{name}</h1>
        <p>Total customers: {customersTotal}</p>
      </article>
    </Link>
  );
}
