import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import signupBg from '../assets/signup-bg.png';
import { setCredentials } from '../store/slices/authSlice';
import { setLoading } from '../store/slices/uiSlice';
import api from '../services/api';
import FormField from '../components/FormField';
import { ChevronRight, ArrowLeft, Check } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import SEO from '../components/SEO';

const validationSchemas = [
  Yup.object({
    name: Yup.string().required('Full name is required').min(2, 'Name too short'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  }),
  Yup.object({
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  }),
  Yup.object({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  }),
];

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.ui);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const handleSignup = async (values) => {
    setError('');
    dispatch(setLoading(true));

    try {
      const { data } = await api.post('/users', { 
        name: values.name, 
        email: values.email, 
        phone: values.phone, 
        password: values.password 
      });
      dispatch(setCredentials(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.customMessage || 'Signup failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const nextStep = (validateForm, setTouched, currentValues) => {
    validateForm().then((errors) => {
      const stepFields = step === 1 ? ['name', 'email'] : ['phone'];
      const stepErrors = Object.keys(errors).filter(key => stepFields.includes(key));
      
      if (stepErrors.length === 0) {
        setStep(s => s + 1);
      } else {
        const touchedFields = {};
        stepFields.forEach(f => touchedFields[f] = true);
        setTouched(touchedFields);
      }
    });
  };

  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="flex min-h-screen w-full bg-[#fffaf7] dark:bg-gray-950 font-sans transition-colors duration-300">
      <SEO 
        title="Sign Up" 
        description="Join SwadSetu today and start your journey with local kitchen artisans. Healthy, home-cooked meals delivered to your doorstep."
        url="/signup"
      />
      {/* Left Side - Image */}
      <div 
        className="hidden md:flex flex-[1.2] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${signupBg})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/50 flex flex-col justify-between p-10 text-white">
          <div className="text-2xl font-bold">
            <Link to="/" className="text-white">swadSetu<span className="text-primary">.</span></Link>
          </div>
          <div className="text-[10px] tracking-[0.2em] opacity-80 uppercase">
            Modern Desi Kitchen © 2024
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-15 relative">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-[400px]">
          {/* Step Indicator */}
          <div className="flex gap-2 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex flex-col gap-2">
                <div className={`h-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800'}`}></div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${s === step ? 'text-gray-900 dark:text-gray-100' : 'text-gray-300 dark:text-gray-600'}`}>
                  {s === 1 ? 'Identity' : s === 2 ? 'Contact' : 'Security'}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold mb-2 text-secondary dark:text-white">
            {step === 1 ? 'Start your journey' : step === 2 ? 'Almost there' : 'One last step'}
          </h1>
          <p className="text-sm text-text-light dark:text-gray-400 mb-10">
            {step === 1 ? 'Tell us who you are.' : step === 2 ? 'How can we reach you?' : 'Protect your account.'}
          </p>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-sm text-sm mb-6 border border-red-200">
              {error}
            </div>
          )}
          
          <Formik
            initialValues={{ name: '', email: '', phone: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchemas[step - 1]}
            onSubmit={handleSignup}
          >
            {({ validateForm, setTouched, values }) => (
              <Form className="space-y-6">
                {step === 1 && (
                  <>
                    <FormField label="Full Name" name="name" type="text" placeholder="Enter your full name" />
                    <FormField label="Email Address" name="email" type="email" placeholder="name@example.com" />
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormField label="Phone Number" name="phone" type="tel" placeholder="10-digit number" />
                  </>
                )}

                {step === 3 && (
                  <>
                    <FormField label="Password" name="password" type="password" placeholder="********" />
                    <FormField label="Confirm Password" name="confirmPassword" type="password" placeholder="********" />
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  {step > 1 && (
                    <button 
                      type="button"
                      onClick={prevStep}
                      className="flex-[0.5] py-3.5 border border-gray-200 dark:border-gray-800 rounded-sm text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button 
                      type="button"
                      onClick={() => nextStep(validateForm, setTouched, values)}
                      className="flex-1 bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-3.5 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200 dark:shadow-none"
                    >
                      Next Step <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex-1 bg-[#f26b1d] text-white py-3.5 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-[#e05a10] transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-200 disabled:opacity-70"
                    >
                      {isLoading ? 'Creating Account...' : 'Complete Signup'} <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
          
          <div className="flex items-center my-10 text-gray-300 text-[11px] font-bold tracking-widest">
            <div className="flex-1 border-b border-gray-100"></div>
            <span className="px-3 uppercase">Already a member?</span>
            <div className="flex-1 border-b border-gray-100"></div>
          </div>
          
          <div className="text-center">
            <Link to="/login" className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline">
              Log in to your account
            </Link>
          </div>
          
          <footer className="mt-16 text-[10px] text-gray-400 leading-relaxed text-center font-medium">
            By joining, you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy</Link>.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
