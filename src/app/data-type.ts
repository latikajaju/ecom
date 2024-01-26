export interface Product{
    image:string,
    price:number,
    title:string,
    description: string,
    id: number
}

export interface CartItem {
    product: Product,
    qty : number
}