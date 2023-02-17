import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Supplier {
    email: "";
    logo: "";
    address: {
        country: "";
        state: "";
        city: "";
        street: "";
        zipcode: "";
    }
}


const Suppliers: FC = () => {
    
    // the initial values for the form
    const initialValues: Supplier = {
        email: "",
        logo: "",
        address: {
          country: "",
          state: "",
          city: "",
          street: "",
          zipcode: "",
        },
    };

    // create the validation schema with Yup
    const validationSchema = Yup.object().shape({
        // for email
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Required"),
        
        // for logo of type jpg and png
        logo: Yup.mixed() 
            .test(
                'fileType', 
                'Unsupported file type', 
                value => value instanceof File && 
                    (value.type === 'image/jpeg' || 
                     value.type === 'image/png'))
            .required('Logo is required'),
    
        // for postal address
        address: Yup.object().shape({
            country: Yup.string().required('Country is required'),
            state: Yup.string().required('State is required'),
            city: Yup.string().required('City is required'),
            street: Yup.string().required('Street is required'),
            zipcode: Yup.string().required('Zipcode is required'),
        }),
    }), 

    // handling submission
    const handleSubmit = async (values: Supplier) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("logo", values.logo);
        formData.append("address", JSON.stringify(values.address));
    
        const response = await fetch("/api/suppliers", {
          method: "POST",
          body: formData,
        });
    
        if (response.ok) {
          console.log("Supplier created successfully");
        } else {
          console.error("Error creating supplier");
        }
      };



    return <div>test</div>
}

export default Suppliers;



 {
    const formik = useFormik ({
        initialValues: formData,
        onSubmit: async (values, { setStatus })
        }
    })
    
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
                {/* the header for the registration form*/}
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-medium text-xl">Rundoo</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Registration Form</div>
                </div>
                {/* the body for the form */}
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                    <form onSubmit={formik.handleSubmit} action="" className="space-y-6">
                        <div> {/* the email address */}
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Email</label>
                            <input
                             id="email"
                             name="email"
                             type="text"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.email}
                             className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error">{formik.errors.email}</div>
                            )}
                        </div>
                        <div> {/* the logo */}
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Logo</label>
                            <input
                             id="logo"
                             name="logo"
                             type="file"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.logo}
                             className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {formik.touched.logo && formik.errors.logo && (
                                <div className="error">{formik.errors.logo}</div>
                            )}
                        </div>
                        <div> {/* the address - the country */}
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Country</label>
                            <input
                             id="country"
                             name="country"
                             type="text"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.address.country}
                             className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {formik.touched.address && formik.errors.address && formik.errors.address.country && (
                                <div className="error">{formik.errors.address.country}</div>
                            )}
                        </div>
                        <div> {/* the address - the state */}
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">State</label>
                            <input
                             id="state"
                             name="state"
                             type="text"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.address.state}
                             className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {formik.touched.address && formik.errors.address && formik.errors.address.state && (
                                <div className="error">{formik.errors.address.state}</div>
                            )}
                        </div>
                        <div> {/* the address - the city */}
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">City</label>
                            <input
                             id="city"
                             name="city"
                             type="text"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.address.city}
                             className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {formik.touched.address && formik.errors.address && formik.errors.address.city && (
                                <div className="error">{formik.errors.address.city}</div>
                            )}
                        </div>
                        <div> {/* the address - the street */}
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">State</label>
                            <input
                             id="street"
                             name="street"
                             type="text"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.address.street}
                             className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {formik.touched.address && formik.errors.address && formik.errors.address.state && (
                                <div className="error">{formik.errors.address.state}</div>
                            )}
                        </div>
                        <div> {/* the address - the postalcode */}
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Zipcode</label>
                            <input
                             id="zipcode"
                             name="zipcode"
                             type="text"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.address.zipcode}
                             className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {formik.touched.address && formik.errors.address && formik.errors.address.zipcode && (
                                <div className="error">{formik.errors.address.zipcode}</div>
                            )}
                        </div>
                        {/* create the submit button */}
                        <div>
                            <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

