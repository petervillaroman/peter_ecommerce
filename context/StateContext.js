import React, { createContext, useContext, useEffect, useState} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {

    // are we currently showing the cart or not? 
    const [showCart, setShowCart] = useState(false);
    // what do we have in our cart? this sets that, default value is nothing
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, settotalQuantities] = useState();
    const [qty, setQty] = useState(1);
    
    //  a dynamic quantity update function that we can pass to our product details page
    // incQty increases count by 1
    const incQty = () => {
        setQty ((prevQty) => prevQty + 1);
    }
    // decQty decreases count by 1
    const decQty = () => {
        setQty ((prevQty) => {
            if(prevQty -1 < 1) return 1;

            return prevQty -1;
        });
    }

    return (
        // passing all of our state fields into the context provider which we will then wrap our layout with. 
        <Context.Provider
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);