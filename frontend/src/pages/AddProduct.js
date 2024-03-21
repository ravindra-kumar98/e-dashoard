import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import AlertSuccess from '../components/AlertSuccess';

function AddProduct()
{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [productImage, setProductImage] = useState('');
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState({
        name: '',
        price: '',
        category: '',
        company: '',
        productImage: '',
    });

    const validateForm = () =>
    {
        const newErrors = {
            name: '',
            price: '',
            category: '',
            company: '',
            productImage: '',
        };

        if (!name)
        {
            newErrors.name = 'Please fill the product name';
        }
        if (!price)
        {
            newErrors.price = 'Please fill the product price';
        }
        if (!category)
        {
            newErrors.category = 'Please fill the product category';
        }
        if (!company)
        {
            newErrors.company = 'Please fill the product company';
        }
        if (!productImage)
        {
            newErrors.productImage = 'Please upload the product image';
        }

        setError(newErrors);

        return Object.values(newErrors).every((error) => !error);
    };

    const fileValue = useRef(null);

    const fileUpload = () =>
    {
        const selectedFile = fileValue.current.files[0];
        const fileName = selectedFile ? selectedFile.name : '';
        setProductImage(fileName);
    };

    const resetForm = () =>
    {
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
        fileValue.current.value = null;
    };

    const submitProduct = async (e) =>
    {
        e.preventDefault();
        debugger;
        if (validateForm())
        {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('company', company);
            formData.append('productImage', fileValue.current.files[0]);

            try
            {
                const result = await fetch('http://localhost:9000/add-product', {
                    method: 'POST',
                    body: formData,
                });
                const data = await result.json();

                if (data.error)
                {
                    setError({ ...error, name: data.error });
                } else
                {
                    resetForm();
                    setAlert(true);
                    setTimeout(() =>
                    {
                        setAlert(false);
                    }, 5000); // Set timeout for 5 seconds
                }
            } catch (error)
            {
                console.error('Error during form submission:', error);
            }
        }
    };
    return (
        <section className='sec-height'>
            <div className='container'>
                <form className='signup_form' onSubmit={submitProduct} encType="multipart/form-data">
                    <div className='pro-inp-wrap'>
                        <div className="row gx-2">
                            <div className="col-md-12 mb-4">
                                <h2 className='title'>Add Product</h2>
                            </div>
                            <div className="col-md-4 mb-3">
                                <input type="text" className="form-control" placeholder='Product Name'
                                    onChange={(e) => setName(e.target.value)} value={name} />
                                {error.name && <div className="invalid-feedback">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {error.name}
                                </div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <input type="text" className="form-control" placeholder='Price'
                                    onChange={(e) => setPrice(e.target.value)} value={price} />
                                {error.price && <div className="invalid-feedback">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {error.price}
                                </div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <input type="text" className="form-control" placeholder='Product Category'
                                    onChange={(e) => setCategory(e.target.value)} value={category} />
                                {error.category && <div className="invalid-feedback">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {error.category}
                                </div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <input type="text" className="form-control" placeholder='Company'
                                    onChange={(e) => setCompany(e.target.value)} value={company} />
                                {error.company && <div className="invalid-feedback">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {error.company}
                                </div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <input className="form-control form-control-sm upload_file_inp" type="file" name="productImage" onChange={fileUpload} ref={fileValue} />
                                {error.productImage && <div className="invalid-feedback">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {error.productImage}
                                </div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <button className='submit-btn'>Add Product</button>
                            </div>
                        </div>
                    </div>
                </form>
                {(alert) ? <AlertSuccess /> : null}
            </div>
        </section>
    )
}

export default AddProduct;