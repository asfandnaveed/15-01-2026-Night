import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";





export default function ProductDetail() {


  const baseURL = 'http://localhost:3000';
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [isLoading , setIsLoading] = useState(true);

  const getProductDetail = async () => {

    try {
      const response = await fetch(`http://localhost:3000/api/product/detail/${id}`);
      const data = await response.json();
      setProductDetail(data);

    } catch (err) {

    }finally{
      setIsLoading(false);
    }

  };

  useEffect( ()=>{

    getProductDetail();

  } , [id]);


  if(isLoading){
    return(
      <h1>Loading</h1>
    );
  }


  return (
    <div className="container py-5">
      <div className="row g-5">

        {/* LEFT: IMAGE GALLERY */}
        <div className="col-lg-6 d-flex">
          {/* Thumbnails */}
          <div className="me-3 d-flex flex-column gap-3">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src="/uploads/cabage.png"
                className="border rounded p-1 bg-white"
                style={{ width: 70, height: 70, objectFit: "cover", cursor: "pointer" }}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-grow-1 border rounded p-4 bg-white text-center">
            <img
              src={baseURL+productDetail.product.image}
              alt="Chinese Cabbage"
              className="img-fluid"
              style={{ maxHeight: 420, objectFit: "contain" }}
            />
          </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="col-lg-6">

          {/* Title + Stock */}
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-0">{productDetail.product.name}</h2>
            <span className="badge bg-success-subtle text-success px-3 py-2">
              In Stock
            </span>
          </div>

          {/* Rating */}
          <div className="mt-2 d-flex align-items-center gap-2">
            <div className="text-warning fs-5">★★★★☆</div>
            <small className="text-muted">{productDetail.product.rating} ( Rating)</small>
            <span className="text-muted">•</span>
            <small className="text-muted">SKU: {productDetail.product.sku}</small>
          </div>

          {/* Price */}
          <div className="mt-3">
            <span className="text-muted text-decoration-line-through me-2">
              $8.00
            </span>
            <span className="text-success fw-bold fs-3">${productDetail.product.price}</span>
            <span className="badge bg-danger-subtle text-danger ms-2">
              25% OFF
            </span>
          </div>

          <hr />

          {/* Description */}
          <p className="text-muted">
            {productDetail.product.description}.
          </p>

          {/* Quantity + Actions */}
          <div className="d-flex align-items-center gap-3 mt-4">

            {/* Quantity */}
            <div className="input-group" style={{ width: 130 }}>
              <button className="btn btn-outline-secondary">−</button>
              <input
                type="text"
                className="form-control text-center"
                value="1"
                readOnly
              />
              <button className="btn btn-outline-secondary">+</button>
            </div>

            {/* Add to cart */}
            <button className="btn btn-success px-4 py-2 fw-semibold">
              Add to Cart
            </button>

            {/* Wishlist */}
            <button className="btn btn-outline-secondary">
              ♡
            </button>
          </div>

          <hr />

          {/* Extra Info */}
          <div className="mt-3 small text-muted">
            <p className="mb-1">
              <strong className="text-dark">Category:</strong> Vegetables
            </p>
            <p className="mb-1">
              <strong className="text-dark">Stock:</strong> {productDetail.product.stock} available
            </p>
            <p className="mb-0">
              <strong className="text-dark">Tags:</strong> Healthy, Green,
              Organic
            </p>
          </div>

          {/* Social Share */}
          <div className="mt-4 d-flex align-items-center gap-3">
            <span className="text-muted">Share:</span>
            <button className="btn btn-light border">f</button>
            <button className="btn btn-light border">t</button>
            <button className="btn btn-light border">p</button>
            <button className="btn btn-light border">i</button>
          </div>

        </div>
      </div>
    </div>
  );
}
