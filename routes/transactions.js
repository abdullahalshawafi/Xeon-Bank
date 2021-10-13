const router = require('express').Router();
const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({});

        res.render('pages/transactions', {
            title: 'Xeon Bank | Transactions',
            files: 'transactions',
            transactions
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.get('/transfer', async (req, res) => {
    try {
        const sender = {};
        const { from } = req.query;
        const customers = await Customer.find({});

        if (from) {
            sender.account = from;
            const { email } = await Customer.findOne({ account: from }).select('-_id email');
            sender.email = email;
        }

        res.render('pages/transfer', {
            title: 'Xeon Bank | Transfer Money',
            files: 'transactions',
            sender,
            customers
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        const sender = await Customer.findOne({ account: transaction.from });
        const reciever = await Customer.findOne({ account: transaction.to });

        if (!transaction || !sender || !reciever) {
            res.redirect('back');
        }

        res.render('pages/transaction-details', {
            title: 'Xeon Bank | Transactions',
            files: 'transactions',
            transaction,
            sender,
            reciever
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.post('/transfer', async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const sender = await Customer.findOne({ account: from }).populate('transactions');

        if (sender.balance >= amount) {
            const reciever = await Customer.findOne({ account: to }).populate('transactions');
            const transaction = await new Transaction(req.body);

            sender.balance -= amount;
            reciever.balance += amount;

            sender.transactions.push(transaction);
            reciever.transactions.push(transaction);

            await sender.save();
            await reciever.save();
            await transaction.save();
        }

        res.redirect('back');
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;