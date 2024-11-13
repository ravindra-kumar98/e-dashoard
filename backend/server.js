const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./model/user');
const Product = require('./model/product');
const app = express();
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const product = require('./model/product');
app.use('/uploads', express.static('uploads'));

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        const uploadDir = determineUploadDirectory(req.path);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb)
    {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
function determineUploadDirectory(endpoint)
{
    switch (endpoint)
    {
        case '/add-product':
            return 'uploads/';
        case '/edit-profile':
            return 'profile/';
        default:
            return 'uploads/';
    }
}
const upload = multer({ storage: storage });

app.post("/signup", async (req, res) =>
{
    const { email, firstName, lastName, password } = req.body;
    try
    {
        if (!firstName || !lastName || !password)
        {
            return res.status(400).send('All fields are required');
        }
        let userExist = await User.findOne({ email: email });
        if (userExist)
        {
            return res.status(403).json({ error: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let user = new User(req.body);
        user.password = hashedPassword;
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;
        await user.save();
        res.send(userWithoutPassword);
    } catch (error)
    {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/signin", async (req, res) =>
{
    const { email, password } = req.body;
    try
    {
        const user = await User.findOne({ email: email });
        if (!user)
        {
            return res.status(404).json({ error: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
        {
            return res.status(401).json({ error: "Password mismatch" });
        }
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;
        res.send(userWithoutPassword);
    } catch (error)
    {
        res.status(500).send("Internal Server Error");
    }
});

app.post('/add-update-product/:id?', upload.single('productImage'), async (req, res) =>
{
    try
    {
        const productId = req.params.id;
        let result;

        if (!productId || productId === 'undefined')
        {
            // Creating a new product
            const filePath = req.file ? req.file.path.replace(/\\/g, '/') : null;
            const product = new Product({
                ...req.body,
                productImage: filePath,
            });
            result = await product.save();
            res.status(201).json(result);
        } else
        {
            // Updating an existing product
            const updateFields = req.body;
            if (req.file)
            {
                updateFields.productImage = req.file.path.replace(/\\/g, '/');
            }

            const updatedProduct = await Product.findByIdAndUpdate(productId, updateFields, { new: true });

            if (!updatedProduct)
            {
                return res.status(404).json({ error: "Product not found" });
            }

            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        }
    } catch (error)
    {
        console.error('Error in add-update-product route:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/product-list', async (req, res) =>
{
    try
    {
        const products = await Product.find();
        res.send(products);
    } catch (err)
    {
        res.status(500).send("Internal Server Error");
    }
});

app.get('/profile', async (req, res) =>
{
    try
    {
        const userList = await User.find();
        res.send(userList);
    } catch (err)
    {
        res.status(500).send("Internal Server Error");
    }
});

// Delete Product Endpoint
app.delete('/delete-product/:id', async (req, res) =>
{
    try
    {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct)
        {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error)
    {
        res.status(500).send("Internal Server Error");
    }
});

// Update Product Endpoint
app.get('/product/:id', upload.single('productImage'), async (req, res) =>
{
    try
    {
        console.log('API creating', req.params.id)
        const productId = req.params.id;  // Corrected this line
        console.log(productId);
        const retrieveFields = req.body;

        if (req.file)
        {
            retrieveFields.productImage = req.file.path.replace(/\\/g, '/');
        }

        const retrieveProduct = await Product.findById(productId, retrieveFields, { new: true });

        if (!retrieveProduct)
        {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Retrive Product", retrieveProduct });
    } catch (error)
    {
        res.status(500).send("Internal Server Error");
    }
});


app.listen(9000, () =>
{
    console.log("Server running on http://localhost:9000");
});
