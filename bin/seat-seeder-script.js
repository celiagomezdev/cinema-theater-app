const faker = require('faker')
const fs = require('fs')

// const numberSelector = (min, max) => {
//   let number = 0

//   const formattedNumber = ('0' + min).slice(-2)
//     number = formattedNumber

//   return number
// }

const priceSelector = row => {
  let price = 0
  if (row <= 6) {
    console.log(`${row}, ${price}`)
    price = 8
  } else {
    console.log(`${row}, ${price}`)
    price = 7
  }
  return price
}

const generateSeat = (rowIndex, numberIndex) => ({
  row: rowIndex + 1,
  number: numberIndex + 1,
  movie: faker.random.word(),
  price: priceSelector(rowIndex + 1)
})

const generateSeats = (rows, seats) => {
  const seatsArray = []

  for (let r = 0; r < rows; r++) {
    for (let s = 0; s < seats; s++) {
      seatsArray.push(generateSeat(r, s))
    }
  }

  return seatsArray
}

const seats = generateSeats(20, 10)

fs.writeFile('./seats.json', JSON.stringify(seats), () => {
  console.log('Seats saved in json file')
})
