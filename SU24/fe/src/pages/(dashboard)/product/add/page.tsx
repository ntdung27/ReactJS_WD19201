import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { addProduct } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { LoaderIcon, StepBackIcon } from "lucide-react";
import { Link } from "react-router-dom";

type FieldType = {
    name: string;
    price: number;
    description: string;
    discount?: number;
    countInStock?: number;
    featured?: boolean;
    categoryId?: string;
};

const ProductAddPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => instance.get(`/categories`),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (product: FieldType) => {
            try {
                const response = await addProduct(product);
                return response;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Thêm sản phẩm thành công",
            });
            form.resetFields();
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl">Thêm sản phẩm</h1>
                <Link to="/admin/products">
                    <Button>
                        <StepBackIcon /> Quay lại
                    </Button>
                </Link>
            </div>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={(formData) => mutate(formData)}
                disabled={isPending}
            >
                <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Tên sản phẩm không được để trống",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Danh mục"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: "Bắt buộc chọn",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label?.toString() ?? "")
                                .toLowerCase()
                                .localeCompare(
                                    (
                                        optionB?.label?.toString() ?? ""
                                    ).toLowerCase(),
                                )
                        }
                        options={categories?.data.map((category: any) => ({
                            value: category.id,
                            label: category.name,
                        }))}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Giá sản phẩm"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Giá sản phẩm không được để trống",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType> label="Mô tả sản phẩm" name="description">
                    <TextArea />
                </Form.Item>
                <Form.Item<FieldType> label="Khuyến mại" name="discount">
                    <Input />
                </Form.Item>
                <Form.Item<FieldType> label="Số lượng" name="countInStock">
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Sản phẩm nổi bật"
                    name="featured"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {isPending && <LoaderIcon className="animate-spin" />}
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductAddPage;
