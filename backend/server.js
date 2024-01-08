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

app.post("/add-product", async (req, res) =>
{
    const { name } = req.body;
    try
    {
        let prodNm = await Product.findOne({ name: name });
        if (prodNm)
        {
            return res.status(403).json({ error: "Product already exist" })
        } else
        {
            let product = new Product(req.body);
            let result = await product.save();
            res.send(result);
        }

    } catch (error)
    {
        res.status(500).send("Internal Server Error");
    }
})
app.listen('9000');