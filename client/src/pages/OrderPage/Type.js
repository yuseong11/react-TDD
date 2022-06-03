import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import Options from './Options';
import Products from "./Products";
import ErrorBanner from '../../components/ErrorBanner';
import { OrderContext } from '../../contexts/OrderContext';

const Type = ({ orderType }) => {
const [items, setItems] = useState([]);
const [error, setError] = useState(false);
const [orderDatas, updateItemCount] = useContext(OrderContext);

useEffect(() => {
  loadItems(orderType);
}, [orderType]);

const loadItems = async (orderType) => {
	try {
		let response = await axios.get(`http://localhost:5000/${orderType}`)
		console.log(response.data)
		setItems(response.data)
	} catch (error) {
		console.log(error)
		setError(true);
	}
};

if (error) {
	return <ErrorBanner message="에러가 발생했습니다." />;
}

const ItemComponents = orderType === "products" ? Products : Options;

const optionItems = items.map((item) => (
  <ItemComponents
    key={item.name}
    name={item.name}
    imagePath={item.imagePath}
    updateItemCount={(itemName, newItemCount) =>
      updateItemCount(itemName, newItemCount, orderType)
    }
  />
));

	return (
    <>
      <h2>주문 종류</h2>
      <div >
        <p>하나의 가격</p>
        <p>총 가격: {orderDatas.totals[orderType]} </p>
      </div>
      <div className="flex flex-wrap">{optionItems}</div>
    </>
  );
}

export default Type