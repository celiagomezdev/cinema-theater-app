# Cinema-Theater-App

Application for buying tickets for a cinema theater 📽.

## Run locally

```
Localhost: http://localhost:3000
```

## API calls:

### Get list of customers:

```
/theater/customer/all
```

### Get list of all seats:

```
/theater/seat/all
```

### Get list of available seats:

GET Request:

```
/theater/seat/available
```

### Make a reservation:

POST Request

```
/theater/customer/THE_USER_ID/booking'
```

```
body: { seatId: THE_SEAT_ID}
```

Introduce instead of _THE_USER_ID_ the id of the user who makes the reservation, and instead of _THE_SEAT_ID_ the id of the seat to reserve.

If the customer already has a seat booked, or the seat has been booked for any other customer, there will be a 404 response.
