import { useQuery, useQueryClient } from "react-query";
import Grid from "src/components/Grid";
import productApi from "src/api/product";
import { fetchProductsKey } from "src/util/queryKeys";
import { ProductType } from "src/types/product.type";
import ProductDetail from "src/page/ProductDetail";
import "./Home.scss";
import { useCallback, useState } from "react";

const ProductItem = ({ data, onShowDetail }: any) => {
  return (
    <>
      {data.map((item: any, index: number) => {
        return (
          <Grid key={index} column sm={12} md={4} lg={4}>
            <div className="product" onClick={() => onShowDetail(item.id)}>
              <div
                className="product-img"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              {item.title}
            </div>
          </Grid>
        );
      })}
    </>
  );
};

const Home = () => {
  const [isShowDetail, setIsShowDetail] = useState(-1);
  const [valueFilter, setValueFilter] = useState("");
  const [productData, setProductData] = useState<ProductType[]>([]);
  const queryClient = useQueryClient();
  const { isLoading, data = [] } = useQuery<ProductType[]>(
    fetchProductsKey,
    productApi.getProducts,
    {
      onSuccess: (data) => {
        data.forEach((item) =>
          queryClient.setQueryData(`${fetchProductsKey}-${item.id}`, item)
        );
        setProductData(data);
      }
    }
  );

  const handleShowDetail = useCallback((id: number) => setIsShowDetail(id), []);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <Grid container>
        <Grid row justifyContent="center">
          <Grid column sm={12} md={12} lg={12}>
            <div className="input-custom">
              <input
                onChange={(e) => {
                  const cloneData = data.filter((item) =>
                    item.title.includes(e.target.value)
                  );
                  setProductData(cloneData);
                  setValueFilter(e.target.value);
                }}
                placeholder="filter products"
                type="text"
                value={valueFilter}
              />
            </div>
          </Grid>
          {isShowDetail === -1 && (
            <ProductItem data={productData} onShowDetail={handleShowDetail} />
          )}
        </Grid>
      </Grid>
      {isShowDetail !== -1 && (
        <ProductDetail
          id={isShowDetail}
          onBackHome={() => setIsShowDetail(-1)}
        />
      )}
    </>
  );
};

export default Home;
