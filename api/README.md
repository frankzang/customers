# Api Documentation

## Customers endpoint

**URL** : `/api/customers`

## Get Customer

Get the details of a customer.

**URL** : `/api/customers/{customerId}`

**Method** : `GET`

**Params** : `customerId`

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 854

```json
{
   "id": 854,
   "first_name": "Keith",
   "last_name": "Harrison",
   "email": "kharrisonnp@omniture.com",
   "gender": "Male",
   "company": "Jayo",
   "city": "Willow Run, IL",
   "title": "Staff Scientist",
   "lat": 38.8951,
   "long": -77.0364
 },
}
```

## Get total Customers in cities

Get the total number of customers in cities.

**URL** : `/api/customers/cities`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content examples**

```json
[
  {
    "city": "Willow Run, IL",
    "customers_total": 195
  },
  {
    "city": "Conyersville, AZ",
    "customers_total": 129
  }
]
```

## Get Customers by City

Get some details of all customers of the city, the response is paginated, with a maximum of 10 results per page.

**URL** : `/api/customers/cities/{city}?page=0`

**Method** : `GET`

**Params** : `city`, `page`

## Success Response

**Code** : `200 OK`

**Content examples**

```json
[
  {
    "id": 893,
    "first_name": "Ashley",
    "last_name": "Hicks",
    "email": "ahicksnq@wp.com",
    "company": "Fivespan"
  },
  {
    "id": 860,
    "first_name": "Ann",
    "last_name": "Jackson",
    "email": "ajacksonnv@facebook.com",
    "company": "Bluejam"
  }
]
```
