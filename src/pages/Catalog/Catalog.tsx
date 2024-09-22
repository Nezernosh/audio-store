import React from 'react';
import { headphones, wireless } from '../../data/products';
import ProductList from '../../components/ProductList/ProductList';
import styles from './Catalog.module.css';

const Catalog: React.FC = () => (
    <main>
        <section className={styles.section}>
            <h2 className={styles["section-title"]}>Наушники</h2>
            <ProductList products={headphones} />
        </section>
        <section>
            <h2 className={styles["section-title"]}>Беспроводные наушники</h2>
            <ProductList products={wireless} />
        </section>
    </main>
);

export default Catalog;
