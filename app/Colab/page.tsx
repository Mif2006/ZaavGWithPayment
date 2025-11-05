"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

const CollaborationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    preferredCommunication: "whatsapp",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <section
      className="relative w-full h-[120vh] bg-cover bg-center flex items-center justify-center mt-[15%]"
      style={{ backgroundImage: "url(/purple2.jpeg)" }}
    >
      {/* Title Section */}
      {/* <div className="absolute pt-[200px] top-15 left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4 justify-center">
          <X className="text-purple-400 w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text">
            Сотрудничество
          </h1>
         
        </div>
        <p className="text-gray-100 text-base md:text-lg max-w-2xl mx-auto px-4">
          Мы с нашими представителями из России, США, Польши, Чехии, Франции и Украины растем и развиваемся каждый день, даря нашим клиентам не только красивые украшения высокого качества, но и море положительных эмоций и улыбок.
        </p>
      </div> */}

      <div className="relative w-full h-full flex items-center justify-center mt-32">
        {/* Form Section */}
        <div className="absolute w-full max-w-lg bg-black/40 backdrop-blur-xl rounded-xl py-10 px-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-white">Имя</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Ваше имя"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-white">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Ваш email"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-white">Телефон</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Ваш телефон"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="city" className="text-white">Город</label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-3 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Ваш город"
                required
              />
            </div>

            {/* Preferred Communication (radio buttons instead of dropdown) */}
            <div className="flex flex-col space-y-2">
              <label className="text-white">Предпочитаемый способ связи</label>
              <div className="flex space-x-4">
                {["whatsapp", "telegram", "viber"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="preferredCommunication"
                      value={option}
                      checked={formData.preferredCommunication === option}
                      onChange={handleChange}
                      className="w-5 h-5 text-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-white capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md text-white font-semibold hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CollaborationPage;
