import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

// import configDatabase from '../config/database'

const models = [User, Product, Category]

class DataBase {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:4ifkdV2NqEo4uFTjYFPl@containers-us-west-147.railway.app:5640/railway'
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:cvPFERSyO9vcv4gAEubb@containers-us-west-104.railway.app:7774',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}
export default new DataBase()
