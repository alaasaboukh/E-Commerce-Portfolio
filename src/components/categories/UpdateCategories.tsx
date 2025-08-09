import { updateCategories } from "@/redux/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Category {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}
const UpdateCategories = ({ cat }: { cat: Category }) => {
    const [name, setname] = useState(cat.name);
    const [description, setdescription] = useState(cat.description);
    const [show, setshow] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <button onClick={() => setshow(true)}>update</button>
            {show && (
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="description"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            dispatch(
                                updateCategories({ token, id: cat._id, name, description })
                            );
                            setshow(false);
                        }}
                    >
                        save
                    </button>
                    <button onClick={() => setshow(false)}>cancle</button>
                </form>
            )}
        </div>
    );
};

export default UpdateCategories;
