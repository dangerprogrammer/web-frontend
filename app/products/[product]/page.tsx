import { Product } from "@/types";
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

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`http://localhost:3000/products?id=${id}`);

    return res.json();
}

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await getProduct(id);

    return (
        <div>Opa
            <h1>{product.name}</h1>
            <p>{product.desc}</p>
        </div>
    );
}