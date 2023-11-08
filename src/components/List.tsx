import { useContext, useEffect } from 'react'
import { ProductContext } from '../context/Product'
import { IProduct } from '../interfaces/Product'

const List = () => {
    const { state, dispatch } = useContext(ProductContext)
    useEffect(() => {
        ;(async () => {
            try {
                const data = await (await fetch(`http://localhost:3000/products`)).json()
                dispatch({ type: 'GET_PRODUCTS', payload: data })
            } catch (error) {
                console.log('[GET_PRODUCTS_ERROR]', error)
            } finally {
            }
        })()
    }, [dispatch])
    return (
        <div>
            <h2>Danh sách</h2>
            {state.products?.map((product: IProduct, index: number) => (
                <div key={index}>
                    {product.name}
                    <button onClick={() => dispatch({ type: 'GET_PRODUCT', payload: product.id! })}>Sửa</button>
                    <button onClick={() => dispatch({ type: 'DELETE_PRODUCT', payload: product.id! })}>Xóa</button>
                </div>
            ))}
        </div>
    )
}

export default List
