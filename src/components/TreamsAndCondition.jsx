import { ShoppingBag, Sun } from 'lucide-react'
import React from 'react'

const TreamsAndCondition = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}

            {/* Main Content */}
            <main className="container mx-auto px-4 pt-28 pb-16">
                <div className="max-w-4xl mx-auto text-gray-700 dark:text-gray-200">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                            Terms and Conditions
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Please read these terms carefully before using our services
                        </p>
                    </div>

                    <div className="space-y-8">
                        <section className="p-8 rounded-xl bg-white hover:shadow-xl dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:ring-1 dark:ring-purple-500/20 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center text-purple-600 dark:text-purple-400">
                                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-sm">1</span>
                                Introduction
                            </h2>
                            <p className="leading-relaxed">
                                Welcome to FashionStore. By accessing and using our website, you accept and agree to be bound by the terms
                                and conditions outlined below. These terms apply to all visitors, users, and customers of our online store.
                            </p>
                        </section>

                        <section className="p-8 rounded-xl bg-white hover:shadow-xl dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:ring-1 dark:ring-purple-500/20 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center text-purple-600 dark:text-purple-400">
                                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-sm">2</span>
                                Account Registration
                            </h2>
                            <p className="leading-relaxed">
                                To make purchases on our website, you may need to create an account. You are responsible for maintaining
                                the confidentiality of your account information and for all activities that occur under your account.
                            </p>
                        </section>

                        <section className="p-8 rounded-xl bg-white hover:shadow-xl dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:ring-1 dark:ring-purple-500/20 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center text-purple-600 dark:text-purple-400">
                                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-sm">3</span>
                                Products and Pricing
                            </h2>
                            <p className="leading-relaxed mb-6">
                                All product prices are listed in the applicable currency and are subject to change without notice. We
                                reserve the right to modify or discontinue products at any time without prior notice.
                            </p>
                            <ul className="space-y-3 ml-6">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 mr-3"></div>
                                    Prices are subject to change without notice
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 mr-3"></div>
                                    All prices include applicable taxes
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 mr-3"></div>
                                    Shipping costs are calculated at checkout
                                </li>
                            </ul>
                        </section>

                      
                        <section className="p-8 rounded-xl bg-white hover:shadow-xl dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:ring-1 dark:ring-purple-500/20 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center text-purple-600 dark:text-purple-400">
                                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-sm">4</span>
                                Privacy and Security
                            </h2>
                            <p className="leading-relaxed">
                                Your privacy is important to us. We collect and process your personal data in accordance with our Privacy
                                Policy. All payment information is encrypted and securely processed.
                            </p>
                        </section>
                    </div>

                    
                </div>
            </main>

           
        </div>
    )
}

export default TreamsAndCondition
