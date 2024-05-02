import { createSlice } from "@reduxjs/toolkit";

const initial = {
    bag: [],
    numProductsInBag: 0,
    amountToPay: 0
}
export const orderSlice = createSlice({
    name: "order",
    initialState: initial,
    reducers: {
        addProductToBag: (state, action) => {
            let newProduct = action.payload;
            let newArr = JSON.parse(JSON.stringify(state.bag));
            let index = newArr.findIndex(item => item._id === newProduct._id);
            if (index === -1) {
                newArr.push(newProduct);
            }
            else {
                newArr[index].amount += 1
            }
            state.bag = [...newArr];
            state.numProductsInBag += 1;
            state.amountToPay += newProduct.price;
            localStorage.setItem('bag', JSON.stringify(state.bag));
            localStorage.setItem('numProductsInBag', JSON.stringify(state.numProductsInBag));
            localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
        },
        changeAmount: (state, action) => {
            const { index, amount } = action.payload;
            let newArr = JSON.parse(JSON.stringify(state.bag));
            newArr[index].amount += amount;
            state.numProductsInBag += amount;
            state.amountToPay += newArr[index].price * amount;
            if (newArr[index].amount === 0)
                newArr.splice(index, 1);
            state.bag = [...newArr];
            localStorage.setItem('bag', JSON.stringify(state.bag));
            localStorage.setItem('numProductsInBag', JSON.stringify(state.numProductsInBag));
            localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
        },
        deleteProductFromBag: (state, action) => {
            let index = action.payload;
            state.bag = JSON.parse(JSON.stringify(state.bag));
            state.numProductsInBag -= state.bag[index].amount;
            state.amountToPay -= state.bag[index].amount * state.bag[index].price;
            state.bag.splice(index, 1);
            localStorage.setItem('bag', JSON.stringify(state.bag));
            localStorage.setItem('numProductsInBag', JSON.stringify(state.numProductsInBag));
            localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
        },
        deleteBag: (state) => {
            state.bag = [];
            state.numProductsInBag = 0;
            state.amountToPay = 0;
            localStorage.setItem('bag', JSON.stringify(state.bag));
            localStorage.setItem('numProductsInBag', JSON.stringify(state.numProductsInBag));
            localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
        },
        getBagFromStorage: (state) => {
            state.bag = JSON.parse(localStorage.getItem('bag'));
            state.numProductsInBag = JSON.parse(localStorage.getItem('numProductsInBag'));
            state.amountToPay = JSON.parse(localStorage.getItem('amountToPay'));
        }
    }
})
export const { addProductToBag, changeAmount, deleteProductFromBag, getBagFromStorage } = orderSlice.actions;
export default orderSlice.reducer;





        // {
        //     productName: "הר סיני",
        //     imageUrl: "https://orhaganuzwinery.com/wp-content/uploads/2020/08/%D7%94%D7%A8_%D7%A1%D7%99%D7%A0%D7%99_12___13-18.d110a0.webp",
        //     price: 110,
        //     amount: 3
        // },
        // {
        //     productName: "יין הארזים",
        //     imageUrl: "https://liquor-store.co.il/wp-content/uploads/2022/04/%D7%99%D7%A8%D7%90%D7%95%D7%9F-%D7%A8%D7%95%D7%96%D7%94-%D7%9C%D7%90%D7%AA%D7%A8-2.png",
        //     price: 90,
        //     amount: 7
        // },
        // {
        //     // productName: "יין הארזים",
        //     // imageUrl: "https://liquor-store.co.il/wp-content/uploads/2022/04/%D7%99%D7%A8%D7%90%D7%95%D7%9F-%D7%A8%D7%95%D7%96%D7%94-%D7%9C%D7%90%D7%AA%D7%A8-2.png",
        //     // price: 90,
        //     // amount: 7
        //     productName: "הרי הגליל",
        //     description: "יין מתוק מוגז, תסיסה טבעית, מענבים משובחים שגדלו בכרמי הגליל",
        //     imageUrl: "https://liquor-store.co.il/wp-content/uploads/2020/12/mad.jpg",
        //     price: 100,
        //     amount: 11
        // }