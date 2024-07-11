'use strict'

const Excuse = require('../models/excuse.model')

// Retrieve and return all excuses from the database.
module.exports.getAllExcuses = async (req, res) => {
  try {
    const excuses = await Excuse.find().exec()
    if (excuses.length > 0) {
      res.json(excuses)
    } else {
      res.status(202).json({ message: 'no excuses available' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// Create and Save a new Excuse
module.exports.createExcuse = async (req, res) => {
  // Create a Excuse
  const excuse = new Excuse({
    http_code: req.body.http_code,
    tag: req.body.tag,
    message: req.body.message
  })
  // Save Excuse in the database
  try {
    const data = await excuse.save()
    res.status(201).send(data)
  } catch (err) {
    // if http_code already exists
    if (err.code === 11000 && err.keyPattern.http_code) {
      res.status(409).send({
        message: 'this http_code already exists'
      })
    }
    // if message already exists
    else if (err.code === 11000 && err.keyPattern.message) {
      res.status(409).send({
        message: 'this message already exists'
      })
    } else {
      res.status(500).send(err)
    }
  }
}
