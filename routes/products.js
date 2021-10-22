const express = require('express');
const ProductServices = require('../services/productServices')
const validatorHandler = require('../middlewares/validatorHandler')
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schema/productSchema')

const router = express.Router()
const service = new ProductServices()

router.get('/', async (req, res)=> {
  const products =  await service.find()
  res.status(200).json(products)
});

router.get('/filter', async (req, res)=>{
  res.send('soy un filter')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
    try {
      const {id} = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res)=>{
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const {id} = req.params;
      const product = await service.update(id, body)

      res.json(product)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }
)

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const rta = await service.delete(id)
  res.json(rta)
})

module.exports = router;
