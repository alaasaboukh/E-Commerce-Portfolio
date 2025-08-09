import { addProductImage, createProduct } from "@/redux/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
    const { token, role } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        categoryId: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageFile || !token) return alert("الصورة أو التوكن مفقود");

        const formData = new FormData();
        formData.append("images", imageFile);

        const result = await dispatch(addProductImage({ token, formData }));
        if (!addProductImage.fulfilled.match(result)) {
            return alert("فشل رفع الصورة");
        }

        const imageUrls = result.payload; // نوع آمن ومفحوص

        const finalPayload = {
            ...productData,
            price: parseFloat(productData.price),
            discountPrice: parseFloat(productData.discountPrice),
            stock: parseInt(productData.stock),
            images: imageUrls,
        };

        dispatch(createProduct({ token, productData: finalPayload }));
    };
    return (
        <div>
            {role === "admin" && (
                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    <input
                        name="name"
                        type="text"
                        placeholder="اسم المنتج"
                        onChange={handleChange}
                    />
                    <input
                        name="description"
                        type="text"
                        placeholder="الوصف"
                        onChange={handleChange}
                    />
                    <input
                        name="price"
                        type="number"
                        placeholder="السعر"
                        onChange={handleChange}
                    />
                    <input
                        name="discountPrice"
                        type="number"
                        placeholder="سعر الخصم"
                        onChange={handleChange}
                    />
                    <input
                        name="stock"
                        type="number"
                        placeholder="المخزون"
                        onChange={handleChange}
                    />
                    <input
                        name="categoryId"
                        type="text"
                        placeholder="ID التصنيف"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        إضافة المنتج
                    </button>
                </form>
            )}
        </div>
    );
};

export default Form;
