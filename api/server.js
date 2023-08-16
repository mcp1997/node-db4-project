const express = require('express')
const helmet = require('helmet')
const recipesRouter = require('./recipes/recipes-router')

const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger)

server.use('/api/recipes', recipesRouter)

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'The resource you are looking for does not exist'
  })
})

module.exports = server