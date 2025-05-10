import { Product } from '@/types';
import './item.scss';

export function ProductItem({ product, img }: { product: Product, img: string }) {
    console.log(img);

    return <li className='item-product'>
        <img src={img} alt={`Produto ${product.name}`} referrerPolicy="no-referrer" />
    </li>
}