import axios from "axios";
// import { useSelector } from "react-redux";


let baseUrl = "https://node-project-7sbi.onrender.com/api/product";
// let userToken = useSelector(st => st.user.currentUser.token);
// { Headers: { "x-access-token": `${userToken}` } }
export const getAllProducts = async (page, perPage, search) => {
    try {
        let data = axios.get(`${baseUrl}?page=${page}&perPage=${perPage}&search=${search}`);
        return data;
    }
    catch (err) {
        return `error: ${err.massage}`;
    }
}
export const getNumOfAllPages = () => {

    return axios.get(`${baseUrl}/num/pages`);
}
export const getProductById = async (product) => {
    let productId = product._id;
    try {
        let oneProduct = await axios.get(`${baseUrl}/${productId}`)
        return oneProduct;
    }
    catch (err) {
        return err;
    }
}
export const addProduct = async (product, userToken) => {
    let headers = { "x-access-token": `${userToken}` };
    console.log(userToken);
    try {
        let addedProduct = await axios.post(`${baseUrl}`, product, { headers })
        return addedProduct;
    }
    catch (err) {
        return err;
    }
}
export const deleteProductById = async (product, userToken) => {
    let productId = product._id;
    try {
        let deletedProduct = await axios.delete(
            `${baseUrl}/${productId}`,
            { Headers: { "x-access-token": `${userToken}` } }
        );
        return deletedProduct;
    }
    catch (err) { return err }
}
export const updateProductById = async (product) => {
    let productId = product._id;
    try {
        let updatedProduct = await axios.put(`${baseUrl}/${productId}`);
        return updatedProduct;
    }
    catch (err) { return err }
}