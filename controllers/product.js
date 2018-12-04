const { Product, validateProduct } = require('../models/product');
const {User} = require('../models/user');

var products = {
    getAll: async (req, res) => {
        const products = await Product.find();
        res.send(products);
    },
    create: async (req, res) => {
        const { error } = validateProduct(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        }

        const {type, price, img_link, status, comment, userId} = req.body;

        const user = await User.findById(userId);
        if(!user) return res.send('This user with given ID was not found');

        let product = new Product({
            type: type,
            price: price,
            img_link: img_link,
            status: status,
            user: {
                method: user.method,
                name: user.name,
                email: user.email
            }
        });
        product = await product.save();

        res.send(product);
    },
    update: async (req, res) => {
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const {type, price, img_link, status, comment, userId} = req.body;

        const user = await User.findById(req.user._id);
        if(!user) return res.send('This user with given ID was not found');

        const product = await Product.findByIdAndUpdate(req.params.id, {
            type: type,
            price: price,
            img_link: img_link,
            status: status,
            user: {
                name: user.name,
                email: user.email
            }
        }, {
                new: true
            });

        if (!product) return res.status(404).send('The product with the given ID was not found.');

        res.send(product);
    },
    delete: async (req, res) => {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) return res.status(404).send('This product with given ID was not found.');

        res.send(product);
    },
    getOne: async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('This product with given ID was not found.');

        res.send(product);
    }
};

module.exports = products;
