'use strict'

const excuseRouter = require('express').Router()
const excuseController = require('../controllers/excuse.controller')

excuseRouter.get('/', excuseController.getAllExcuses)
excuseRouter.post('/', excuseController.createExcuse)

module.exports = excuseRouter
