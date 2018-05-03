const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema(
  {
    row: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
      unique: false
    },
    number: {
      type: Number,
      min: 1,
      max: 8,
      required: true,
      unique: false
    },
    movieTitle: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId
    },
    bookedAt: {
      type: Date
    },
    purchasedAt: {
      type: Date
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const bookingExpired = (Date.now() - ret.bookedAt) / 1000 > 180
        if (bookingExpired && purchasedAt === null) {
          delete ret.customerId && ret.bookedAt
        }
      }
    }
  }
)

SeatSchema.index({ row: 1, number: 1 }, { unique: true })

const SeatModel = mongoose.model('Seat', SeatSchema)

module.exports = SeatModel
