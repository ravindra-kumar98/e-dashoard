import React, { useEffect, useState } from 'react'

const Product = () =>
{
    const [products, setproducts] = useState([]);
    useEffect(() =>
    {
        const fetchProducts = async () =>
        {
            try
            {
                let response = await fetch('http://localhost:9000/product-list');
                if (!response.ok)
                {
                    throw new Error('Failed to fetch data');
                }
                let data = await response.json();
                setproducts(data);
                //console.log(data)
            } catch (err)
            {
                console.error(err);
            }
        }
        fetchProducts();
    })
    return (
        <>
            <section className='sec-height'>
                <div className='container'>
                    <div className='row g-4'>
                        {
                            products.map((item) => (
                                <div className='col-lg-3 col-md-4 col-sm-6' key={item._id}>
                                    <div className="card">
                                        <img src={`http://localhost:9000/${item.productImage}`} className="card-img-top" alt="product" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <h6>{item.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div >
            </section >
        </>
    )
}

export default Product