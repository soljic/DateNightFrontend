import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function ContactUsComponent() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    function onSubmitForm(values) {
        console.log(values);
        reset();
    }


    return (
        <div className="sm:px-6 h-screen w-screen flex justify-center items-center">
            <div className="mb-48 mr-52 w-full max-w-2xl rounded-xl bg-sp-fawn bg-opacity-5 p-8 shadow">
                <h2 className="text-center text-xl font-semibold mt-1 mb-12 pb-1">
                  Contact Us
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="grid grid-cols-1 gap-y-6">
                    <div>
                        <label htmlFor="name" className="sr-only">
                            Full name
                        </label>

                        <input {...register("name", { required: "This is required field" })}
                               className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                               placeholder="Full name"
                        />

                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }) =>  <span className="text-red-400 text-sm py-2">{message}</span>}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>

                        <input {...register("email", { required: "This is required filed", pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please insert correct email format"}, minLength:8, maxLength:120 })}
                               className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                               placeholder="Email"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) =>  <span className="text-red-400 text-sm py-2">{message}</span>}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="sr-only">
                            Message
                        </label>
                        <textarea
                            name="message"
                            rows="4"
                            {...register("message", { required: "This is required filed!"})}
                            className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                            placeholder="Message"
                          ></textarea>
                        <ErrorMessage
                            errors={errors}
                            name="message"
                            render={({ message }) =>  <span className="text-red-400 text-sm py-2">{message}</span>}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-black bg-sp-fawn hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactUsComponent;