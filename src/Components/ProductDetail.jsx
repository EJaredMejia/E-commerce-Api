import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsLoading } from "../store/slices/isLoading.slice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = product.productImgs?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  console.log(product);

  useEffect(() => {
    dispatch(setIsLoading(true));
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
      .then((res) => setProduct(res.data.data.product))
      .finally(() => dispatch(setIsLoading(false)));
  }, [id]);

  console.log(product.productImgs);
  return (
    <div className="relative top-20 text-gray-600 mx-auto w-11/12">
      <div className="flex items-center gap-3 text-sm">
        <h3>Home</h3>
        <i className="fa-solid fa-circle text-red-500 text-xs"></i>
        <b>{product.title}</b>
      </div>
      <ul className="relative top-[3rem] gap-1 flex items-center justify-center">
        <li>
          <i
            onClick={() => {    
              if (currentPage !== 1) {
                  setCurrentPage(currentPage - 1)
              }else{
                setCurrentPage(product.productImgs.length)
              }
            }}
            className="fa-solid fa-arrow-left text-white bg-red-500 rounded-full p-3"
          ></i>
        </li>
        {currentImages?.map((img) => (
          <li key={img}>
            <img
              className="w-[15rem] h-[15rem] object-contain"
              src={img}
            ></img>
          </li>
        ))}
        <li>
          <i
            onClick={() => {
                if (currentPage !== product.productImgs.length) {
                    setCurrentPage(currentPage + 1)
                }else{
                    setCurrentPage(1);
                }
              }}
            className="fa-solid fa-arrow-right text-white bg-red-500 rounded-full p-3"
          ></i>
        </li>
      </ul>
    </div>
  );
};

export default ProductDetail;
