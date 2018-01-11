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

body: { seatId: THE_SEAT_ID}
