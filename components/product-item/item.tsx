import { Product } from '@/types';
import './item.scss';
import { capitalize } from '@/scripts';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export function ProductItem({ product }: { product: Product }) {
    return <Link className='item-product' href={`/products/${product.id}`}>
        <div className="image-container">
            <img className='product-image' src={`http://localhost:3000${product.images[0]}`} alt={`Produto ${product.name}`} referrerPolicy="no-referrer" />
            <img className='product-image shadow' src={`http://localhost:3000${product.images[0]}`} alt={`Produto ${product.name}`} referrerPolicy="no-referrer" />
        </div>
        <section className='product-info'>
            <h1 className='product-title'>{product.name}</h1>
            <p className='product-desc'>{product.desc}</p>
            <small className='row'>
                <span>{product.location}</span>
                <span>{product.points} pontos</span>
            </small>
            <span className={`category ${product.category}`}>{capitalize(product.category)}</span>
        </section>
    </Link>
}