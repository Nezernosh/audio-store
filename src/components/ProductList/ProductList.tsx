import React from 'react';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

interface Props {
    products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => (
    <div className={styles["product-list"]}>
        {products.map(product => (
            <ProductCard key={product.title} product={product} />
        ))}
    </div>
);

export default ProductList;
