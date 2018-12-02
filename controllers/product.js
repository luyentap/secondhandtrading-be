const { Product, validateProduct } = require('../models/product');

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

        const {name, price, img_link, status} = req.body;
        let product = new Product({
            name: name,
            price: price,
            img_link: img_link,
            status: status
        });
        product = await product.save();

        res.send(product);
    },
    update: async (req, res) => {
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: name,
            price: price,
            img_link: img_link,
            status: status
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
