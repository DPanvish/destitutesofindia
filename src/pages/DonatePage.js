import React, { useState, useEffect } from 'react';
import { Heart, CreditCard, QrCode, Building2, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Donate Page Component
 * 
 * Provides donation functionality and information about how contributions
 * help the platform. Includes multiple donation methods and amount
 * selection with processing feedback.
 * 
 * Features:
 * - Hero section with donation call-to-action
 * - Information about how donations help the platform
 * - Multiple donation amount options (predefined and custom)
 * - Donation processing simulation
 * - Success feedback and confirmation
 * - Multiple payment methods (credit card, UPI, bank transfer)
 * - Responsive design with modern animations
 * 
 * Donation Options:
 * - Predefined amounts: ₹100, ₹250, ₹500, ₹1000, ₹2500, ₹5000
 * - Custom amount input
 * - Payment methods: Credit Card, UPI, Bank Transfer
 * 
 * Impact Areas:
 * - Platform maintenance and server costs
 * - Technology development and feature improvements
 * - Community outreach and awareness campaigns
 * - Partnership development with NGOs and government bodies
 */
const DonatePage = () => {
  // ===== STATE MANAGEMENT =====
  const [selectedAmount, setSelectedAmount] = useState(500);  // Currently selected donation amount
  const [customAmount, setCustomAmount] = useState('');       // Custom amount input value
  const [isProcessing, setIsProcessing] = useState(false);    // Donation processing state
  const [isSuccess, setIsSuccess] = useState(false);          // Donation success state


  // ===== CONSTANTS =====
  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];  // Available donation amounts in INR
  
  // ===== RAZORPAY INTEGRATION =====
  
  /**
   * Loads Razorpay script dynamically
   */
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          console.log('Razorpay already loaded');
          resolve();
          return;
        }
        
        console.log('Loading Razorpay script...');
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          toast.error('Payment gateway not available');
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  /**
   * Creates Razorpay order and initiates payment
   */
  const createRazorpayOrder = async (amount) => {
    // Try backend first if configured
    const orderApi = process.env.REACT_APP_RAZORPAY_ORDER_API;
    console.log('orderApi: ', orderApi);
    if (orderApi) {
      try {
        const res = await fetch(orderApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        });
        if (!res.ok) throw new Error('Order API failed');
        const data = await res.json();
        console.log('Created order from backend:', data);
        return data;
      } catch (err) {
        console.warn('Order API unavailable:', err);
      }
    }
    return null;
  };

  /**
   * Handles Razorpay payment processing
   */
  const handleRazorpayPayment = async (amount) => {
    try {
      setIsProcessing(true);
      
      // Ensure Razorpay script is loaded
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Razorpay'));
          document.body.appendChild(script);
        }).catch((err) => {
          console.error(err);
          toast.error('Payment gateway not available');
          setIsProcessing(false);
          return;
        });
      }

      const key = process.env.REACT_APP_RAZORPAY_TEST_KEY;
      console.log('key: ', key);
      if (!key) {
        toast.error('Razorpay key missing. Set REACT_APP_RAZORPAY_TEST_KEY');
        setIsProcessing(false);
        return;
      }
      
      const order = await createRazorpayOrder(amount);
      const options = {
        key,
        amount: amount * 100,
        currency: 'INR',
        name: 'Destitutes of India',
        description: 'Donation for Community Support',
        ...(order?.id && { order_id: order.id }),
        handler: function (response) {
          console.log('Payment successful:', response);
          toast.success('Payment successful! Thank you for your donation.');
          setIsSuccess(true);
          setIsProcessing(false);
          verifyPayment(response);
        },
        onError: function (error) {
          console.error('Razorpay error:', error);
          toast.error('Payment failed: ' + (error?.error?.description || 'Unknown error'));
          setIsProcessing(false);
        },
        prefill: {
          name: 'Donor',
          email: 'donor@example.com',
          contact: ''
        },
        notes: {
          address: 'Community Support Donation'
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          }
        }
      };

      console.log('Razorpay options:', options);
      console.log('Amount in paise:', amount * 100);

      // Initialize Razorpay
      const rzp = new window.Razorpay(options);

      // Register failure event for richer errors
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed details:', response);
        toast.error(response?.error?.description || 'Payment failed');
        setIsProcessing(false);
      });
      
      // Add error handling for rzp.open()
      try {
        rzp.open();
      } catch (openError) {
        console.error('Error opening Razorpay:', openError);
        toast.error('Failed to open payment gateway');
        setIsProcessing(false);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  /**
   * Verifies payment with backend
   */
  const verifyPayment = async (response) => {
    try {
      console.log('Payment verification data:', response);
      // TODO: Replace with your backend verification endpoint
      // For now, just log the verification data
      console.log('Payment verified successfully (mock)');
    } catch (error) {
      console.error('Payment verification failed:', error);
    }
  };

  // ===== EVENT HANDLERS =====
  
  /**
   * Handles selection of predefined donation amounts
   * Clears custom amount when a predefined amount is selected
   * 
   * @param {number} amount - Selected donation amount
   */
  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);  // Update selected amount
    setCustomAmount('');        // Clear custom amount input
  };

  /**
   * Handles custom amount input changes
   * Updates selected amount when custom value is entered
   * 
   * @param {Event} e - Input change event
   */
  const handleCustomAmount = (e) => {
    const value = e.target.value;
    const numValue = parseInt(value) || 0;
    
    // Validate maximum limit
    if (numValue > 100000) {
      toast.error('Maximum donation amount is ₹1,00,000');
      return;
    }
    
    setCustomAmount(value);  // Update custom amount state
    if (value) {
      setSelectedAmount(numValue);  // Update selected amount if valid
    }
  };

  /**
   * Handles donation submission process
   * Initiates Razorpay payment
   */
  const handleDonate = async () => {
    if (finalAmount <= 0) {
      toast.error('Please select a valid amount');
      return;
    }

    await handleRazorpayPayment(finalAmount);
  };

  // ===== UTILITY VARIABLES =====
  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;  // Calculate final donation amount

  // ===== RENDER =====
  
  return (
    <div className="min-h-screen">
      {/* Hero section with donation call-to-action */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute w-20 h-20 bg-white rounded-full top-10 left-10 opacity-10 animate-float"></div>
        <div className="absolute w-16 h-16 bg-white rounded-full top-20 right-20 opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-12 h-12 bg-white rounded-full bottom-10 left-1/4 opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Support Our <span className="text-gradient">Mission</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90">
              Your donation helps us maintain the platform and expand our reach to help more people in need.
            </p>
          </div>
        </div>
      </section>

      {/* Main content section with donation options and information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Information about how donations help the platform */}
            <div>
              <h2 className="mb-8 text-3xl font-bold text-gray-900">
                How Your Donation Helps
              </h2>
              
              <div className="space-y-6">
                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl group-hover:scale-110">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Platform Maintenance
                      </h3>
                      <p className="text-gray-600">
                        Keep our servers running, maintain the website, and ensure the platform 
                        remains accessible to everyone who needs it.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl group-hover:scale-110">
                      <QrCode className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Technology Development
                      </h3>
                      <p className="text-gray-600">
                        Improve our mapping technology, enhance user experience, and develop 
                        new features to better serve the community.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl group-hover:scale-110">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        NGO Partnerships
                      </h3>
                      <p className="text-gray-600">
                        Establish partnerships with NGOs and government agencies to ensure 
                        the data we collect leads to real action and support.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl group-hover:scale-110">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Community Outreach
                      </h3>
                      <p className="text-gray-600">
                        Conduct awareness campaigns, training sessions, and community 
                        engagement programs to maximize our impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div>
              <h2 className="mb-8 text-3xl font-bold text-gray-900">
                Make a Donation
              </h2>
              
              {isSuccess ? (
                <div className="text-center card">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Thank You for Your Donation!
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Your contribution of ₹{finalAmount.toLocaleString()} will help us continue our mission. 
                    You'll receive a confirmation email shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-primary"
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : (
                <div className="space-y-6 card">
                  {/* Amount Selection */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Select Amount
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-4 md:grid-cols-3">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            selectedAmount === amount && !customAmount
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          ₹{amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="customAmount" className="form-label">Custom Amount</label>
                      <input
                        type="number"
                        id="customAmount"
                        value={customAmount}
                        onChange={handleCustomAmount}
                        className="input-field"
                        placeholder="Enter amount in ₹"
                        min="1"
                        max="100000"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Maximum donation amount: ₹1,00,000
                      </p>
                    </div>
                  </div>



                  {/* Donation Summary */}
                  <div className="p-4 glass-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Donation Amount:</span>
                      <span className="font-semibold text-gray-900">₹{finalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Processing Fee:</span>
                      <span className="font-semibold text-gray-900">₹0</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-primary-600">₹{finalAmount.toLocaleString()}</span>
                    </div>
                    
                    {/* Test Mode Indicator */}
                    <div className="p-2 mt-3 border border-yellow-200 rounded-lg bg-yellow-50">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs font-medium text-yellow-700">Test Mode</span>
                      </div>
                      <p className="mt-1 text-xs text-yellow-600">
                        This is a test payment. No real money will be charged.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDonate}
                    disabled={isProcessing || finalAmount <= 0}
                    className="flex items-center justify-center w-full space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        <span>Donate ₹{finalAmount.toLocaleString()}</span>
                      </>
                    )}
                  </button>

                  <div className="space-y-4">
                    <p className="text-xs text-center text-gray-500">
                      Your donation is tax-deductible. You'll receive a receipt for your records.
                    </p>
                    
                    {/* Security Badges */}
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3 text-green-600" />
                        <span>SSL Secured</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3 text-blue-600" />
                        <span>PCI Compliant</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3 text-purple-600" />
                        <span>Razorpay Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
