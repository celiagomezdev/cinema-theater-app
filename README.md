<h1 align="center">Cinema-Theater-App</h1>

Application for buying tickets for a cinema theater 📽

**Information**: Backend application with an external REST API for the clients.
**Technology used**: Node.js, Express.js, MongoDB and mongoose.js.

## Run locally

```
Localhost: http://localhost:3000
```

## API calls

### Get list of customers

`GET`

```
/theater/customer/all
```

### Create a new customer

`POST`

```
/theater/customer/
```

Body example:

```
{ firstName: 'Joan', lastName: 'López', email: 'joanlopez567@gmail.com' }
```

`firstName`, `lastName` and `email` are required fields. If any of the entries are empty or not valid, the user will receive a 422 response with the correct error message.

If there is already in the database an user with the same email, the user will receive a 409 response with the informative error.

### Show details of a customer

`GET`

```
/theater/customer/detail/THE_USER_ID
```

### Get list of all seats

`GET`

```
/theater/seat/all
```

### Get list of available seats

`GET`

```
/theater/seat/available
```

### Show details of a seat

`GET`

```
/theater/seat/detail/THE_SEAT_ID
```

### Make a reservation

`POST`

```
/theater/customer/THE_USER_ID/booking'
```

```
body: { seatId: THE_SEAT_ID}
```

Introduce instead of _THE_USER_ID_ the id of the user who makes the reservation, and instead of _THE_SEAT_ID_ the id of the seat to reserve.

If the customer attemt to book a seat, but he/she already has a seat booked or that seat has been booked for any other customer, there will be a 409 response showing the correct error message to the user.
