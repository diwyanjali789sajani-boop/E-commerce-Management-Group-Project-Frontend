import React, {
    useState,
    useEffect,
    type ChangeEvent,
    type FormEvent
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/address.css";



interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

/* ================= COMPONENT ================= */

const AddressPage: React.FC = () => {
    const [address, setAddress] = useState<Address>({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    /* ================= EFFECT ================= */

    useEffect(() => {
        if (location.pathname === "/edit-address") {
            fetchUserInfo();
        }
    }, [location.pathname]);

    /* ================= API ================= */

    const fetchUserInfo = async (): Promise<void> => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            if (response?.user?.address) {
                setAddress(response.user.address);
            }
        } catch (err: unknown) {
            const error = err as ApiError;
            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to fetch user information"
            );
        }
    };

    

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            await ApiService.saveAddress(address);
            navigate("/profile");
        } catch (err: unknown) {
            const error = err as ApiError;
            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to save/update address"
            );
        }
    };


    return (
        <div className="address-page">
            <h2>
                {location.pathname === "/edit-address"
                    ? "Edit Address"
                    : "Add Address"}
            </h2>

            {error && (
                <p className="error-message">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                <label>
                    Street:
                    <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    State:
                    <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Zip Code:
                    <input
                        type="text"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">
                    {location.pathname === "/edit-address"
                        ? "Edit Address"
                        : "Save Address"}
                </button>
            </form>
        </div>
    );
};

export default AddressPage;
