const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
  res.status(200).json([
    {
      name: 'videoGames'
    },

    {
      name: 'clothes'
    }
  ])
})

router.get('/:categoryId', (req, res) => {
  const {categoryId} = req.params
  if (categoryId === '999') {
    res.status(404).json({
      message: "Not Found"
    })
  } else {
    res.status(200).json({
      categoryId,
      name: "new Category",
      products: "shoes"
    })
  }
})

router.get('/:categoryId/products/:productId', (req, res)=>{
  const {categoryId, productId} = req.params
  res.json({
    categoryId,
    productId
  })
})

router.post('/', (req, res) =>{
  const body = req.body

  res.status(201).json({
    message: "created",
    data: body
  })
})

router.patch('/:categoryId', (req,res)=>{
  const {categoryId} = req.params
  const body = req.body
  res.json({
    message: "update",
    data: body,
    categoryId,
  })
})

router.delete('/:categoryId', (req, res) => {
  const {categoryId} = req.params

  res.json({
    message: "deleted",
    categoryId
  })
})

module.exports = router;
