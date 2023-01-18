import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Products from '../app/models/Products'
import User from '../app/models/User'

import configDataBase from '../config/database'

const models = [User, Products]

class DataBase {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDataBase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/codeburger',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new DataBase()
