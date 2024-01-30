
import React, { useState, useEffect } from 'react';
import './BlogTable.css';

const initialProductList = [
  {
    id: 1,
    name: "Iphone11",
    priceDisplay: "12.000.000",
    price: 12000000,
    quantity: 10,
    img: "./img/iphone1.jpg"
  },
  {
    id: 2,
    name: "Iphone12",
    priceDisplay: "15.000.000",
    price: 15000000,
    quantity: 5,
    img: "./img/iphone2.jpg"
  },
  {
            id:3,
            name:"Iphone13",
            priceDisplay:"20.000.000",
            price:20000000,
            quantity:6,
            img:"./img/iphone3.jpg"
        },
        {
            id:4,
            name:"Iphone13 promax",
            priceDisplay:"25.580.000",
            price:25580000,
            quantity:6,
            img:"./img/iphone1.jpg"
        },
        {
            id:5,
            name:"Iphone14",
            priceDisplay:"36.190.000",
            price:36190000,
            quantity:8,
            img:"./img/iphone2.jpg"
        },
        {
            id:6,
            name:"Iphone14 promax",
            priceDisplay:"40.980.000",
            price:40980000,
            quantity:15,
            img:"./img/iphone3.jpg"
        },
];

function App() {
  const [productList, setProductList] = useState(initialProductList);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShoppingCart([]);
  }, []);

  const handleAddToCart = (id) => {
    const productToAdd = productList.find(product => product.id === id);
    if (productToAdd) {
      const existingItemIndex = shoppingCart.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...shoppingCart];
        updatedCart[existingItemIndex].quantity++;
        setShoppingCart(updatedCart);
      } else {
        setShoppingCart([...shoppingCart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  const handleReduceQuantity = (id) => {
    const updatedCart = shoppingCart.map(item => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setShoppingCart(updatedCart);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = shoppingCart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setShoppingCart(updatedCart);
  };

  const totalAmount = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container">
      <div className="card-plus">
        <button className="card-plus-notify" data-bs-toggle="modal" onClick={() => setShowModal(true)}>
          <i className="fa fa-cart-plus" aria-hidden="true" style={{ fontSize: '30px' }}></i>
          <p>Giỏ hàng</p>
          <p className="count-shoppingCard">{shoppingCart.length}</p>
        </button>
      </div>
      <div className="content-product">
        <div className="row">
          {productList.map(product => (
            <div key={product.id} className="col-4">
              <div className="card col-sm-3 col-lg-3 col-md-3 mb-2" style={{ width: '18rem', maxHeight:'470px' }}>
                <img className="card-img-top img-thumbnail" src={product.img} alt="Card cap" style={{maxHeight:'286px'}} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">Price : {product.priceDisplay} VNĐ</p>
                  <p className="card-quantity">Quantity : {product.quantity}</p>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>
                    <i className="fa fa-plus" aria-hidden="true"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal" id="md-shoppingcard-detail" tabIndex="-1" role="dialog" style={{display:'block'}}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thông tin giỏ hàng</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {shoppingCart.length === 0 ? (
                  <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                ) : (
                  <React.Fragment>
                    <table className="table table-bordered" id="tbl-shoppingcard-detail">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shoppingCart.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><img width="50px" height="50px" src={item.img} alt="Product" /></td>
                            <td>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>
                              <button className="btn btn-primary" onClick={() => handleReduceQuantity(item.id)}>-</button>
                              <input style={{ width: '50px', textAlign: 'center' }} value={item.quantity} readOnly />
                              <button className="btn btn-primary" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                            </td>
                            <td>{item.priceDisplay}</td>
                            <td>{(item.quantity * item.price).toLocaleString()} VNĐ</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="info-total-amount">Tổng tiền : {totalAmount.toLocaleString()} VNĐ</p>
                    <p className="info-notify-pay"></p>
                  </React.Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" id="btn-pay" onClick={() => { setShowModal(false); setShoppingCart([]); }}>
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
