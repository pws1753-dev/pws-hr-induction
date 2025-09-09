
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Layout/Navbar';

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-4 sm:p-6 lg:p-8 w-full"
    >
        {children}
    </motion.div>
);

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto">
                <PageWrapper>
                    {children}
                </PageWrapper>
            </main>
        </div>
    );
};

export default MainLayout;
