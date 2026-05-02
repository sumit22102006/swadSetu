import React from 'react';
import { useField } from 'formik';

const FormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        {props.type === 'textarea' ? (
          <textarea
            {...field}
            {...props}
            className={`w-full p-3 border rounded-sm text-sm outline-none transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 min-h-[100px] resize-none ${
              isError 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 dark:border-gray-800 focus:border-[#f26b1d]'
            }`}
          />
        ) : (
          <input
            {...field}
            {...props}
            className={`w-full p-3 border rounded-sm text-sm outline-none transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 ${
              isError 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 dark:border-gray-800 focus:border-[#f26b1d]'
            }`}
          />
        )}
        
        {isError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 animate-in fade-in zoom-in duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        )}
      </div>
      
      {isError && (
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter mt-1 animate-in slide-in-from-top-1 duration-200">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormField;
