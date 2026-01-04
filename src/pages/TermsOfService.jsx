import React, { useEffect } from 'react';

const TermsOfService = () => {
    useEffect(() => {
        document.title = 'Terms of Service - Export Hub';
         window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-base-100 min-h-screen py-12 px-4">
             <div className="max-w-4xl mx-auto container">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms of Service</h1>
                
                <div className="prose prose-lg max-w-none text-base-content/80">
                     <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                    <h3>1. Agreement to Terms</h3>
                    <p>
                        By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. 
                        If you do not agree with these terms, you are prohibited from using or accessing this site.
                    </p>

                    <h3>2. Use License</h3>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Export Hub's website for personal, 
                        non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul>
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on Export Hub's website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>

                    <h3>3. Disclaimer</h3>
                    <p>
                        The materials on Export Hub's website are provided on an 'as is' basis. Export Hub makes no warranties, expressed or implied, 
                        and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
                        fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h3>4. Limitations</h3>
                    <p>
                        In no event shall Export Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
                        or due to business interruption) arising out of the use or inability to use the materials on Export Hub's website.
                    </p>

                    <h3>5. Governing Law</h3>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of the country and you irrevocably submit to the 
                        exclusive jurisdiction of the courts in that State or location.
                    </p>
                    
                    <h3>6. Changes to Terms</h3>
                    <p>
                        We reserve the right to modify these terms at any time. We will provide notice of significant changes to these terms by posting a notice on our website.
                        Your continued use of the website after such changes constitutes your acceptance of the new Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
