const faker = require('faker')
const fs = require('fs')

const priceSelector = row => {
  let price = 0
  if (row <= 6) {
    price = 8
  } else {
    price = 7
  }
  return price
}

const generateSeat = (room, rowIndex, numberIndex) => ({
  room: room,
  row: rowIndex + 1,
  number: numberIndex + 1,
  price: priceSelector(rowIndex + 1)
})

const generateSeats = (room, rows, seats) => {
  const seatsArray = []

  for (let r = 0; r < rows; r++) {
    for (let s = 0; s < seats; s++) {
      seatsArray.push(generateSeat(room, r, s))
    }
  }

  return seatsArray
}

const seats = generateSeats(1, 20, 10)

fs.writeFile('./seats.json', JSON.stringify(seats), () => {
  console.log('Seats saved in json file')
})
