import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
import AlertSuccess from './AlertSuccess';

function AddProduct()
{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [alert, sertAlert] = useState(false);
    const submitProduct = async (e) =>
    {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const productField = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                name: name,
                price: price,
                category: category,
                userId: userId,
                company: company
            })
        }
        let result = await fetch('http://localhost:9000/add-product', productField);
        let newR = await result.json();
        if (newR)
        {
            sertAlert(true);
        }
    }
    return (
        <div className='container'>
            <form className='signup_form' onSubmit={submitProduct}>
                <div className='pro-inp-wrap'>
                    <div className="row gx-2">
                        <div className="col-md-12 mb-4">
                            <h2 className='title'>Add Product</h2>
                        </div>
                        <div className="col-md-4 mb-3">
                            <input type="text" className="form-control" placeholder='Product Name'
                                onChange={(e) => setName(e.target.value)} value={name} />
                            <div className="valid-feedback">
                                <FontAwesomeIcon icon={faCheck} /> Looks good!
                            </div>
                            <div className="invalid-feedback">
                                <FontAwesomeIcon icon={faTriangleExclamation} />  Required
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <input type="text" className="form-control" placeholder='Price'
                                onChange={(e) => setPrice(e.target.value)} value={price} />
                            <div className="valid-feedback">
                                <FontAwesomeIcon icon={faCheck} /> Looks good!
                            </div>
                            <div className="invalid-feedback">
                                <FontAwesomeIcon icon={faTriangleExclamation} />  Required
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <input type="text" className="form-control" placeholder='Product Category'
                                onChange={(e) => setCategory(e.target.value)} value={category} />
                            <div className="valid-feedback">
                                <FontAwesomeIcon icon={faCheck} /> Looks good!
                            </div>
                            <div className="invalid-feedback">
                                <FontAwesomeIcon icon={faTriangleExclamation} />  Required
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <input type="text" className="form-control" placeholder='Company'
                                onChange={(e) => setCompany(e.target.value)} value={company} />
                            <div className="valid-feedback">
                                <FontAwesomeIcon icon={faCheck} /> Looks good!
                            </div>
                            <div className="invalid-feedback">
                                <FontAwesomeIcon icon={faTriangleExclamation} />  Required
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <button className='submit-btn'>Add Product</button>
                        </div>
                    </div>
                </div>
            </form>
            {(alert) ? <AlertSuccess /> : null}
        </div>
    )
}

export default AddProduct;