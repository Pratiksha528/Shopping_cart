import axios from 'axios';
import './Product.css';
import React, { useEffect, orderef, useState, useRef } from 'react'
import { Button, Form, Table } from 'react-bootstrap'


function Products() {
  let orderid = useRef("");

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [validations, setvalidations] = useState({
    nameMessage: "",
    emailMessage: "",
    mobilenoMessage: ""
});
const [order, setOrder] = useState({

  name: "",
  mobileno: "",
  email: "",
  address: "",
  pincode: "",
  city: "",
  products: [],
  amount: 0,
  status: "unpaid"

})


const loggedInorder = localStorage.getItem(order.name);
    const loggedInorderEmail = localStorage.getItem(order.email);
    const loggedInordermobileno = localStorage.getItem(order.mobileno);

    const [existingorder, setExistingorder] = useState({
      nameExistmessage: "",
      emailExistmessage: "",
      mobilenoExistmessage: ""
  });
 
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((result) => {

      let myProducts = result.data.map((product, i) => {
        return { ...product, quantity: 0 };
      })
      setProducts(myProducts);
    }, (err) => {
      console.log(err);
    })
  }, []);

  let options = {
    "key": "rzp_live_Ay9af2dQeUHBA6",
    "amount": "200",
    "name": "Shopping Cart description",
    "description": "Product Purchasing on 5hopping Cart",
    "image": "https://static.vecteezy.com/system/resources/previews/004/999/815/original/digital-wallet-logo-design-template-with-pixel-effect-logo-concept-of-credit-card-crypto-wallet-fast-online-payment-free-vector.jpg",
    "order id": "",
    "handler": function (response) {
      console.log(orderid.current);
      alert("Success");
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": "",
      "address": ""
    },
    "theme": {
      "color": "red"
    }
  };

  function increment(e, id) {
    e.preventDefault();
    let myProducts = products.map((product, i) => {
      if (product.id === id) {
        product.quantity += 1;
      }
      return product;
    });
    setProducts(myProducts);
  }

  function decrement(e, id) {
    e.preventDefault();
    let myProducts = products.map((product, i) => {
      if (product.id === id) {
        if (product.quantity > 0)
          product.quantity -= 1;
      }
      return product;
    });
    setProducts(myProducts);
  }


  useEffect(() => {
    let alltotal = 0;
    products.forEach(product => {
      alltotal += product.quantity * product.price;
    });
    setTotal(alltotal);

    let myProducts = products.filter((product, i) => {
      return product.quantity > 0;
    });

    setOrder({ ...order, products: myProducts, amount: alltotal });

  }, [products]);

  function handleChange(e) {
    e.preventDefault();

    setOrder({ ...order, [e.target.id]: e.target.value });
  }

  function placeOrder(e) {
    e.preventDefault();

    let validated = true;
    let nameMessage = "";
    let emailMessage = "";
    let mobilenoMessage = "";
    let nameExistmessage = "";
    let emailExistmessage = "";
    let mobilenoExistmessage = "";


    if (order.name.trim() === "") {
        nameMessage = "Please Enter name";
        validated = false;
    }
    if (loggedInorder) {
        nameExistmessage = "order With Same name exist";
        validated = false;
    }


    if (order.email.trim() === "") {
        emailMessage = "Please Enter Email";
        validated = false;
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(order.email)) {
        emailMessage = "Please Enter Valid Email";
        validated = false;
    };
    if (loggedInorderEmail) {
        emailExistmessage = "order With Same email exist , please use another email";
        validated = false;
    }

    if (order.mobileno.trim() === "") {
        mobilenoMessage = "Please Enter Mobileno";
        validated = false;
    }
    else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(order.mobileno)) {
        mobilenoMessage = "Please Enter Valid Mobile no";
        validated = false;
    }
    if (loggedInordermobileno) {
        mobilenoExistmessage = "order With Same mobileno exist , please use another mobileno";
        validated = false;
    }
    setvalidations({
        nameMessage: nameMessage,
        emailMessage: emailMessage,
        mobilenoMessage: mobilenoMessage

    });
    setExistingorder({
        nameExistmessage: nameExistmessage,
        emailExistmessage: emailExistmessage,
        mobilenoExistmessage: mobilenoExistmessage
    })





    console.log(order);
    localStorage.setItem("order", JSON.stringify(order));

    orderid.current = "1234";
    options.amount = 200;
    options.prefill.name = order.name;
    options.prefill.email = order.email;
    options.prefill.mobileno = "+91" + order.mobileno;
     var rzp1 = new window.Razorpay(options);
     rzp1.open();
     rzp1.on("payment.failed" , function (payment){
      alert("failed");
     }
     );



  }

  return (
    <div className=' col-lg-12 ' >

      <div className='container  '>
        <h1 className='text-center'>Products</h1>&nbsp;
        <Table striped bordered hover id='table'>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Handle</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><img src={product.image} alt="products.title" height={"90px"} /></td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                      <Button onClick={(e) => { increment(e, product.id) }} >+</Button><br />
                      <>{product.quantity}</><br />
                      <Button onClick={(e) => { decrement(e, product.id) }}>-</Button>
                    </td>
                    <td>{(product.price * product.quantity).toFixed(2)}</td>

                  </tr>
                )
              })

            }
            <tr >
              <td colSpan={5}><b>Grand Total : </b></td>

              <td className='text-end'>{total.toFixed(2)}</td>
            </tr>

          </tbody>
        </Table>&nbsp;

      </div><hr />

      <div className='container'>
        <h2 className='text-center'><u>Make Payment</u></h2><br />
        <Form className='row'>
          <Form.Group className="mb-3 col-lg-4" >
            <Form.Label>Name<span className='text-danger'>{validations.nameMessage}</span></Form.Label>
            <Form.Control type="text" id='name' placeholder="Enter name" onChange={(e) => { handleChange(e) }} />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-4" >
            <Form.Label className="mb-3 col-lg-4">Mobile No</Form.Label>
            <Form.Control type="number" id='mobileno' placeholder="Enter number" onChange={(e) => { handleChange(e) }} />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-4" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" id='email' placeholder="Enter email" onChange={(e) => { handleChange(e) }} />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-4" >
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" id='address' placeholder="Enter address" onChange={(e) => { handleChange(e) }} />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-4" >
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="number" id='pincode' placeholder="Enter pincode" onChange={(e) => { handleChange(e) }} />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-4" >
            <Form.Label>City</Form.Label>
            <Form.Control type="text" id='city' placeholder="Enter City" onChange={(e) => { handleChange(e) }} />
          </Form.Group>





          <div className='text-end'>
            <Button variant="primary" type="submit" className="mb-3 col-lg-2" onClick={(e) => { placeOrder(e) }} >
              Place Order
            </Button>
          </div>
        </Form>
      </div>
    </div>

  )


}

export default Products;