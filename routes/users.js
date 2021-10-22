const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
  const users = []
  const {size} = req.query
  const limit = size || 10

  for (let index = 0; index < limit; index++) {
    users.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      city: faker.address.country(),
      phone: faker.phone.phoneNumber(),
    })
  }

  res.status(200).json(users)
})

router.get('/:id', (req, res) => {
  const {id} = req.params

  if (id === '999') {
    res.status(404).json({
      message: "Not Found"
    })
  } else {
    res.status(200).json({
      id,
      name: "Aquiles Castro",
      email: "ssssss@sss.com",
      city: "Nameku",
    })
  }
})

router.post('/', (req, res)=>{
  const body = req.body;

  res.status(201).json({
    message: "created",
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const body = req.body;
  const {id} = req.params;

  res.json({
    message: "update partial",
    data: body,
    id,
  })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  res.json({
    message: "deleted",
    id
  })
})

module.exports = router;
