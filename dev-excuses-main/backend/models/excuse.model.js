'use strict'

const mongoose = require('mongoose')

const excuseSchema = new mongoose.Schema({
  http_code: {
    type: Number,
    minlength: 3,
    maxlength: 3,
    unique: true
  },
  tag: {
    type: String,
  },
  message: {
    type: String,
    required: true,
    unique: true
  }
})

const ExcuseModel = mongoose.model('Excuse', excuseSchema)
module.exports = ExcuseModel
