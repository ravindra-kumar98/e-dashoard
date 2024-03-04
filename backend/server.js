const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./model/user');
const Product = require('./model/product')
const app = express();
app.use(express.json());
app.use(cors());
const bycrypt = require('bcrypt');
const checkAuth = require('./middleware/checkAuth');
const multer = require('multer');
const path = require('path');
app.use('/uploads', express.static('uploads'));

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, 'uploads/'); // Specify the directory where you want to store uploaded files
    },
    filename: function (req, file, cb)
    {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
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
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
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
            return res.status(404).json({ error: "user not found" });
        }
        const passwordMatch = await bycrypt.compare(password, user.password);
        //const passwordMatch = await User.findOne({ password: password });
        if (!passwordMatch)
        {
            return res.status(401).json({ error: "password Mismatch" })
        }
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;
        res.send(userWithoutPassword);

    } catch (error)
    {
        res.status(500).send("Internal Server Error");
    }
})

app.post('/add-product', upload.single('productImage'), async (req, res) =>
{
    const { name } = req.body;
    try
    {
        // Replace backslashes with forward slashes
        const filePath = req.file.path.replace(/\\/g, '/');
        const product = new Product({
            ...req.body,
            productImage: filePath, // Save the file path in the productImage field
        });
        let result = await product.save();
        res.send(result);
    } catch (error)
    {
        res.status(500).send('Internal Server Error');
    }
});
app.get('/product-list', async (req, res) =>
{
    try
    {
        const products = await Product.find(); // Fetch all products from the database
        res.send(products);
    } catch (err)
    {
        res.status(500).send("Internal Server Error");
    }
})
app.listen('9000');