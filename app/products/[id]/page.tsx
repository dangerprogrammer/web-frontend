'use client';

import { Product } from "@/types";
import { use, useEffect, useState } from "react";
// import { GetStaticPaths, GetStaticProps } from "next";
// import { useRouter } from "next/router";

// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await fetch('http://localhost:3000/products');
//     const products: Product[] = await res.json();

//     const paths = products.map(({ id }) => ({
//         params: { id: `${id}` }
//     }));

//     return {
//         paths,
//         fallback: !1
//     };
// }

// export const getStaticProps: GetStaticProps = async ctx => {
//     const { id } = ctx.params!;
//     const res = await fetch(`http://localhost:3000/products/${id}`);
//     const product: Product = await res.json();

//     return {
//         props: {
//             product
//         }
//     };
// }

async function getProduct(id: string) {
    console.log(`Buscando pela URL: "${`http://localhost:3000/products?id=${id}`}"`);

    const res = await fetch(`http://localhost:3000/products?id=${id}`);

    return await res.json();
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const productId = use(params).id;
    const [product, setProduct] = useState<Product | null>(null);
    const [load, setLoad] = useState(!0);

    useEffect(() => {
        (async () => {
            const p = await getProduct(productId);

            setProduct(p);
            setLoad(!1);

            console.log(p);
        })();
    }, []);

    return (
        <div>Opa
            {!load ? ((product && product.id) ? <h1>{product.name}</h1> : <h1>SEM PRODUTO</h1>) : <h1>CARREGANDO PRODUTO</h1>}
        </div>
    );
}