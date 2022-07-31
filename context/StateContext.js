/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
	// are we currently showing the cart or not?
	const [showCart, setShowCart] = useState(false);
	// what do we have in our cart? this sets that, default value is nothing
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	const onAdd = (product, quantity) => {
		// checks if product being added is already in the cart
		const checkProductInCart = cartItems.find(
			(item) => item._id === product.id
		);
		// if the product is already in the cart, we won't have to add that item again
		// we will simply ++ the quantity of that item.
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities + quantity
		);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});
			setCartItems(updatedCartItems);
		} // if the product doesn't exist in the cart yet then:
		else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter(
			(item) => item._id !== product._id
		);

		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
		);
		setCartItems(newCartItems);
	};

	

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);

		const newCartItems = cartItems.filter((item, i) => item._id !== id);
		if (value === 'inc') {
			setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity + 1 } : item));
			setTotalPrice(
				(prevTotalPrice) => prevTotalPrice + foundProduct.price
			);
			setTotalQuantities(
				(prevTotalQuantities) => prevTotalQuantities + 1
			);
		} else if (value === 'dec') {
			if (foundProduct.quantity > 1) {
				setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity - 1 } : item));
				setTotalPrice(
					(prevTotalPrice) => prevTotalPrice - foundProduct.price
				);
				setTotalQuantities(
					(prevTotalQuantities) => prevTotalQuantities - 1
				);
			}
		}
	};

	//  a dynamic quantity update function that we can pass to our product details page
	// incQty increases count by 1
	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	};
	// decQty decreases count by 1
	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;

			return prevQty - 1;
		});
	};

	return (
		// passing all of our state fields into the context provider which we will then wrap our layout with.
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				onRemove,
				toggleCartItemQuantity,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
