const router = require('express').Router();
const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({ createdAt: -1 });

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
        const reciever = {};
        const { to } = req.query;
        const customers = await Customer.find({}).sort({ name: 1 });

        if (to) {
            reciever.account = to;
            const { email } = await Customer.findOne({ account: to }).select('-_id email');
            reciever.email = email;
        }

        res.render('pages/transfer', {
            title: 'Xeon Bank | Transfer Money',
            files: 'transactions',
            reciever,
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

            return res.redirect(`./${transaction._id}`);
        }

        res.redirect('back');
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;