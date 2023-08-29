const express = require("express");
const router = express.Router();

router.get('/products', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests"
    })
})

router.get('/:orderid', (req, res, next) => {
    const id = req.params.orderid;
    if (id === 'special') {
        res.status(200).json({
            message: "Handling GET requests",
            id: id
        })
    }else{
        res.status(200).json({
            message: "You passed on ID "
        })
    }
})

router.post('/', (req, res, next) => {

})

router.put('/', (req, res, next) => {

})

router.delete('/', (req, res, next) => {

})

module.exports = router;
