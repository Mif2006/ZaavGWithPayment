"use client"

import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-react';
// import ProfilePage from '../pages/ProfilePage';
import Wishlist from './Wishlist';
import Timeline from './Timeline';
import { useCart } from '@/lib/context/CartContext';
import { userData, purchaseData, wishlistData } from '@/constants/mockdata';

interface DashboardProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode, setDarkMode }) => {
  const totalSpent = purchaseData.reduce((total, item) => total + item.price, 0);
  const [activeTab, setActiveTab] = React.useState<'purchases' | 'wishlist' | 'profile'>('profile');
  const { state: cartState, dispatch: cartDispatch } = useCart();
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  return (
    <div className="bg-white dark:bg-dark-bg overflow-x-hidden transition-colors duration-300">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 xl:px-4 py-4 md:py-6 overflow-x-hidden">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6 bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 ${
                activeTab === 'profile'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                  : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
              } rounded-lg transition-colors text-sm`}
            >
              <User size={16} />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => setActiveTab('purchases')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 ${
                activeTab === 'purchases' 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300' 
                  : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
              } rounded-lg transition-colors text-sm`}
            >
              <ShoppingBag size={16} />
              <span>Purchases</span>
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 ${
                activeTab === 'wishlist'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                  : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
              } rounded-lg transition-colors text-sm`}
            >
              <Heart size={16} />
              <span>Wishlist</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Desktop Sidebar */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-6 h-fit hidden lg:block sticky top-16 flex-shrink-0 mt-1 transition-colors duration-300 mr-6"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full overflow-hidden mb-4 ring-2 ring-purple-300 dark:ring-purple-500">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt={userData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-jewelry-dark dark:text-dark-text">{userData.name}</h2>
              <p className="text-gray-500 dark:text-dark-muted text-sm">{userData.email}</p>
              <div className="mt-2 px-3 py-1 bg-purple-gradient rounded-full">
                <p className="text-xs text-white font-medium">Premium Member</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 ${
                  activeTab === 'profile'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                    : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
                } rounded-lg transition-colors`}
              >
                <User size={18} className="text-purple-500 dark:text-purple-400" />
                <span>Profile</span>
              </button>
              <button 
                onClick={() => setActiveTab('purchases')}
                className={`w-full flex items-center space-x-3 px-4 py-3 ${
                  activeTab === 'purchases'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                    : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
                } rounded-lg transition-colors`}
              >
                <ShoppingBag size={18} />
                <span>Purchases</span>
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center space-x-3 px-4 py-3 ${
                  activeTab === 'wishlist'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                    : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
                } rounded-lg transition-colors`}
              >
                <Heart size={18} className="text-purple-500 dark:text-purple-400" />
                <span>Wishlist</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                <Settings size={18} className="text-purple-500 dark:text-purple-400" />
                <span>Settings</span>
              </button>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-dark-accent">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 dark:text-dark-muted hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors">
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-x-hidden lg:px-0">
            {/* User Stats */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
            >
              <div className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-dark-muted text-xs md:text-sm mb-1">Member Since</p>
                    <h3 className="text-xl md:text-2xl font-medium text-jewelry-dark dark:text-dark-text">
                      {format(new Date(userData.joinedDate), 'MMM d, yyyy')}
                    </h3>
                  </div>
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <User size={16} className="text-purple-500 dark:text-purple-300" />
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-muted mt-2 md:mt-4">
                  Loyal member for {new Date().getFullYear() - new Date(userData.joinedDate).getFullYear()} years
                </p>
              </div>
              
              <div className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-dark-muted text-xs md:text-sm mb-1">Items Purchased</p>
                    <h3 className="text-xl md:text-2xl font-medium text-jewelry-dark dark:text-dark-text">
                      {purchaseData.length}
                    </h3>
                  </div>
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <ShoppingBag size={16} className="text-purple-500 dark:text-purple-300" />
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-muted mt-2 md:mt-4">
                  Last purchase on {format(new Date(purchaseData[0].date), 'MMM d, yyyy')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 sm:col-span-2 lg:col-span-1 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-dark-muted text-xs md:text-sm mb-1">Total Spent</p>
                    <h3 className="text-xl md:text-2xl font-medium text-jewelry-dark dark:text-dark-text">
                      ${totalSpent.toLocaleString()}
                    </h3>
                  </div>
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <span className="text-purple-500 dark:text-purple-300 font-serif text-base md:text-lg">$</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-muted mt-2 md:mt-4">
                  Avg. ${Math.round(totalSpent / purchaseData.length).toLocaleString()} per item
                </p>
              </div>
            </motion.div>
            
            {/* Content Section */}
            {activeTab === 'profile' ? (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* <ProfilePage setActiveTab={setActiveTab} /> */}
              </motion.div>
            ) : activeTab === 'purchases' ? (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 mb-8 overflow-hidden transition-colors duration-300 relative"
              >
                <div className="flex justify-between items-center mb-4 md:mb-6 relative z-10">
                  <h2 className="text-lg md:text-xl font-serif text-jewelry-dark dark:text-dark-text">Purchase Timeline</h2>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-dark-muted">
                    Showing {purchaseData.length} items
                  </div>
                </div>
                
                <Timeline purchases={purchaseData} darkMode={darkMode} />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 mb-8 overflow-hidden transition-colors duration-300"
              >
                <div className="flex justify-between items-center mb-6 relative">
                  <h2 className="text-lg md:text-xl font-serif text-jewelry-dark dark:text-dark-text">My Wishlist</h2>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-dark-muted">
                    {wishlistData.length} items
                  </div>
                </div>
                
                <Wishlist items={wishlistData} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;