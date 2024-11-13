import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Product = () =>
{
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const handleUpdateRedirect = (productId) =>
    {
        navigate(`/update-product/${productId}`);
    };

    const handleDelete = async (productId) =>
    {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete)
        {
            try
            {
                const response = await fetch(`http://localhost:9000/delete-product/${productId}`, {
                    method: 'DELETE',
                });
                if (response.ok)
                {
                    setProducts(products.filter((product) => product._id !== productId));
                } else
                {
                    console.error("Failed to delete product");
                }
            } catch (error)
            {
                console.error("Error deleting product:", error);
            }
        }
    };

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
                setProducts(data);
            } catch (err)
            {
                console.error(err);
            }
        };
        fetchProducts();
    }, []); // Fetch products only once on component mount



    return (
        <section className='sec-height'>
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Category</th>
                            <th scope="col">Product Company</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <th scope="row">
                                    <img
                                        src={`http://localhost:9000/${item.productImage}`}
                                        className="prod-img"
                                        alt="product"
                                    />
                                </th>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button className="btn-action" onClick={() => handleUpdateRedirect(item._id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn-action" onClick={() => handleDelete(item._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Product;
