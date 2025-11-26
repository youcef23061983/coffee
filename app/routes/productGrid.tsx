interface Product {
  id: string | number;
  product_type: "coffee" | "equipment" | string;
  image_url: string;
  name: string;
  brand_name?: string;
  description?: string;
  roast_level?: string;
  origin_country?: string;
  flavor_profile?: string[];
  category?: string;
  skill_level?: string;
  price: number;
  in_stock: boolean;
}

interface ProductGridProps {
  products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className={`product-card ${product.product_type}`}
        >
          <img src={product.image_url} alt={product.name} loading="lazy" />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="brand">{product.brand_name}</p>
            <p className="description">{product.description}</p>

            {/* Coffee-specific info */}
            {product.product_type === "coffee" && (
              <div className="coffee-details">
                <span className="roast-level">{product.roast_level}</span>
                <span className="origin">{product.origin_country}</span>
                <div className="flavors">
                  {product.flavor_profile?.map((flavor) => (
                    <span key={flavor} className="flavor-tag">
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment-specific info */}
            {product.product_type === "equipment" && (
              <div className="equipment-details">
                <span className="category">{product.category}</span>
                <span className="skill-level">{product.skill_level}</span>
              </div>
            )}

            <div className="price-stock">
              <span className="price">${product.price}</span>
              <span
                className={`stock ${product.in_stock ? "in-stock" : "out-of-stock"}`}
              >
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
