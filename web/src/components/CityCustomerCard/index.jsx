import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../configs/routes";
import styles from "./index.module.scss";

export function CityCustomerCard({ id, firstName, lastName, email, company }) {
  return (
    <Link
      to={`${Routes.CUSTOMER}/${id}`}
      aria-label={`Customer: ${firstName} ${lastName}`}
      className={styles.card}
    >
      <article>
        <h1>
          {firstName} {lastName}
        </h1>
        <p>
          <strong>Email</strong> {email}
        </p>
        <p>
          <strong>Company</strong> {company}
        </p>
      </article>
    </Link>
  );
}
