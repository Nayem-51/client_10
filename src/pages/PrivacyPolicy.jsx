import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = 'Privacy Policy - Export Hub';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-base-100 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto container">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
                
                <div className="prose prose-lg max-w-none text-base-content/80">
                    <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to Export Hub. We respect your privacy and are committed to protecting your personal data. 
                        This privacy policy will inform you as to how we look after your personal data when you visit our website 
                        and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h3>2. The Data We Collect About You</h3>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                    </ul>

                    <h3>3. How We Use Your Personal Data</h3>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>

                    <h3>4. Data Security</h3>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
                        In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>

                    <h3>5. Your Legal Rights</h3>
                    <p>
                        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct, erase, restrict, transfer, or object to processing of your personal data.
                    </p>

                    <h3>6. Contact Details</h3>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at: <br/>
                        Email: privacy@exporthub.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
