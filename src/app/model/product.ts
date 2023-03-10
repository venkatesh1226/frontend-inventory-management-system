export interface Product { 
    productId?: number,
    productName: string,
    quantity: number,
    description: string,
    factoryId: number,
    picLink:string,
    orderCount?:Number
}