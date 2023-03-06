import React, { useEffect, useState } from 'react';

import Helmet from '../Helmet';
import { Link } from 'react-router-dom';
import CartView from '../CartView';
import { useSelector } from 'react-redux';
import { selectRemainingOrderProducts } from '../../redux/selector';
import numberWithCommas from '../../utils/numberWithCommas';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';

function Cart() {
  let [subTotalPrice, setSubTotalPrice] = useState(0);
  const listOrderProduct = useSelector(selectRemainingOrderProducts);

  console.log(listOrderProduct);

  useEffect(() => {
    setSubTotalPrice(() => {
      let total = 0;
      for (let product of listOrderProduct) {
        total += product.priceTotal;
      }
      return Number(total).toFixed(1);
    });
  }, [listOrderProduct]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Helmet title="Cart">
      <div className="row cart mt-5 mb-5">
        <div className="col-md-12 col-lg-8 cart__list-product">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name product</th>
                <th scope="col">Color</th>
                <th scope="col">Size</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {listOrderProduct.map((item, index) => (
                <CartView
                  key={index}
                  id={item.id}
                  index={index}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  color={item.color}
                  size={item.size}
                  quantity={item.quantity}
                  priceTotal={item.priceTotal}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-12 col-lg-4 cart__bill">
          <div className="cart__bill__content">
            <p>Bạn đang có {listOrderProduct.length} sản phẩm trong giỏ hàng</p>
            <div className="cart__bill__content__sum">
              <p>Tổng Thanh Toán</p>
              <p className="cart__bill__content__sum__price">
                {numberWithCommas(subTotalPrice)}
              </p>
            </div>
            <div className="cart__bill__content__order mb-3">
              <Button onClick={handleShow}> Order</Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Đỉa chỉ nhận hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col>
                          <Form.Label>Họ và tên người nhận</Form.Label>
                          <Form.Control type="text" />
                        </Col>
                        <Col>
                          <Form.Label>Số điện thoại</Form.Label>
                          <Form.Control />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Label>Hình thức thanh toán</Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option>Chọn</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Ghi chú</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="cart__bill__content__order">
              <Link to="/products">
                <button>KEEP BUYING</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Cart;
