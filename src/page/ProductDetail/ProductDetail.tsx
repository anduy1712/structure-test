import { useQuery } from "react-query";
import { fetchProductKey } from "src/util/queryKeys";
import productApi from "src/api/product";
import { ProductType } from "src/types/product.type";
import "./ProductDetail.scss";

interface Props {
  id: number;
  onBackHome: () => void;
}

const ProductDetail = ({ id, onBackHome }: Props) => {
  const { data: productDetail } = useQuery<ProductType>(
    `${fetchProductKey}-${id}`,
    () => productApi.getProduct(id),
    { staleTime: 5000 }
  );

  console.log("detail", productDetail);
  return (
    <div className="product-detail">
      <h1 className="product-detail-title">{productDetail?.title}</h1>
      <p className="product-detail-desc">{productDetail?.description}</p>
      <p className="product-detail-price">{productDetail?.price}</p>
      <button onClick={onBackHome}>Back</button>
    </div>
  );
};

export default ProductDetail;
