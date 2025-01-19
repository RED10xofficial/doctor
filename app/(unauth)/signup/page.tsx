'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Info } from 'lucide-react';
import Image from 'next/image';

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch('password');

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-sky-400 to-sky-200 py-16 relative">
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-white rounded-xl shadow-lg grid grid-cols-2 ">
          <div className="flex items-center justify-center  rounded-l-xl">
            <Image 
              src="/register.png" 
              alt="Medical Illustration"
              className="w-full max-w-md rounded-lg"
              width={500}
              height={500}
            />
          </div>
          
          <div className='p-8 bg-sky-50'>
            <h2 className="text-primaryText text-2xl font-semibold mb-6 text-center">
              Create an Account
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-2">
                  Password
                  <Info 
                    className="inline-block ml-2 w-4 h-4 cursor-pointer text-gray-500"
                    onMouseEnter={() => setShowPasswordInfo(true)}
                    onMouseLeave={() => setShowPasswordInfo(false)}
                  />
                </label>
                {showPasswordInfo && (
                  <div className="absolute right-0 top-0 bg-white p-3 rounded-lg shadow-lg border z-10 text-sm">
                    Password must contain:
                    <ul className="list-disc pl-4 text-gray-600">
                      <li>Minimum 8 characters</li>
                      <li>One uppercase letter</li>
                      <li>One number</li>
                      <li>One special character</li>
                    </ul>
                  </div>
                )}
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                      message: 'Password must meet all requirements'
                    }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-sky-400"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors duration-300"
              >
                Sign Up
              </button>
            </form>
            <a href="/login" className="text-sky-600 text-sm mt-2 block text-center">Already have an account? Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}