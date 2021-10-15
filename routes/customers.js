const router = require('express').Router();
const Customer = require('../models/Customer');

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({}).select('_id name email account balance').sort({ name: 1 });
        const totalBalance = customers.reduce((sum, customer) => sum + customer.balance, 0);

        res.render('pages/customers', {
            title: 'Xeon Bank | Customers',
            files: 'customers',
            customers,
            totalBalance
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id).populate('transactions', '_id from to amount createdAt', null, { sort: { 'createdAt': -1 } });
        
        res.render('pages/customer-details', {
            title: `Xeon Bank | ${customer.name}`,
            files: 'customers',
            transactions: customer.transactions,
            customer
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const customer = await new Customer(req.body);
        await customer.save();
        
        res.sendStatus(200);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;