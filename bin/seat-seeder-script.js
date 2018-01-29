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

const generateSeat = (roomId, rowIndex, numberIndex) => ({
  roomId: roomId,
  row: rowIndex + 1,
  number: numberIndex + 1,
  price: priceSelector(rowIndex + 1)
})

const generateSeats = (roomId, amountOfRows, amountOfSeats) => {
  const seatsArray = []

  for (let r = 0; r < amountOfRows; r++) {
    for (let s = 0; s < amountOfSeats; s++) {
      seatsArray.push(generateSeat(roomId, r, s))
    }
  }

  return seatsArray
}

const seats = generateSeats(1, 15, 10)

fs.writeFile('./seats.json', JSON.stringify(seats), () => {
  console.log('Seats saved in json file')
})
