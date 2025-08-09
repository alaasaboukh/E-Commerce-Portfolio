import MotionWrapper from "../library/MotionWrapper";
import { useTranslations } from "next-intl";

type AddressFormData = {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
};

type FormProps = {
    formData: AddressFormData;
    setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
};

const FormOrder: React.FC<FormProps> = ({ formData, setFormData }) => {
    const t = useTranslations("Orders");

    const inputFields = [
        { id: "fullName", label: "fullName" },
        { id: "street", label: "street" },
        { id: "city", label: "city" },
        { id: "postalCode", label: "postalCode" },
        { id: "country", label: "country" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <MotionWrapper>
            <form>
                {inputFields.map(({ id, label }) => (
                    <div key={id} className="mb-5">
                        <label htmlFor={id} className="block mb-2 text-gray-600 text-sm">
                            {t(label)}
                        </label>
                        <input
                            type="text"
                            id={id}
                            name={id}
                            value={formData[id as keyof typeof formData] || ""}
                            onChange={handleChange}
                            aria-required="true"
                            aria-label={t(label)}
                            aria-describedby={`${id}-description`}
                            className="w-full p-2 rounded bg-[#f5f5f5] outline-none"
                        />
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="w-3.5 h-3.5 accent-[var(--color-secondary)] cursor-pointer"
                        name="Save"
                        id="Save"
                    />
                    <label htmlFor="Save" className="text-sm cursor-pointer">
                        {t("saveInfo")}
                    </label>
                </div>
            </form>
        </MotionWrapper>
    );
};

export default FormOrder;
