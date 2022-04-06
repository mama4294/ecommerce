import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
    return(
        <div className="category-preview-container">
        <h2>
            <Link className="title" to={title}>{title.toUpperCase()} </Link>
        </h2>
        <div className="preview">
        {
            products.filter((row, index) => index < 4).map(item => (
                    <ProductCard key={item.id} product={item}/>
        ))}
        </div>
        </div>
    )
}

export default CategoryPreview;