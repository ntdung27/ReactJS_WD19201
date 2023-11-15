import { useQuery } from 'react-query'
import { getAll } from '../api/product'
import { ColumnDef } from '@tanstack/react-table'
import { IProduct } from '@/interfaces/Product'
import { DataTable } from './DataTable'
import { Button } from './ui/button'
import { formatPrice } from '@/lib/utils'
import { MoreHorizontal, Pencil } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const columns: ColumnDef<IProduct>[] = [
    {
        accessorKey: 'name',
        header: () => <span className='text-red-500'>Tên sản phẩm</span>
    },
    {
        accessorKey: 'price',
        header: 'Giá sản phẩm',
        cell: ({ row }) => {
            const formattedPrice = formatPrice(row.getValue('price') || 0)
            return <span dangerouslySetInnerHTML={{ __html: formattedPrice }} />
        }
    },
    {
        id: 'action',
        cell: ({ row: { original } }) => {
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>Open menu</span>
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <Button onClick={() => console.log(original.id)}>
                                <Pencil /> Xóa
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        }
    }
]

const List = () => {
    const { isLoading, isError, data } = useQuery({
        queryKey: 'PRODUCTS_KEY',
        queryFn: () => getAll()
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error....</div>
    return (
        <div>
            <h2>Danh sách</h2>
            <DataTable columns={columns} data={data} />
            {/* {products?.map((product: IProduct, index: number) => <ProductItem product={product} key={index} />)} */}
        </div>
    )
}

export default List
