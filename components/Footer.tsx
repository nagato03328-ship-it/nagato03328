
import React from 'react';

interface FooterProps {
  onPrivacyPolicy?: () => void;
  onSuccessStories?: () => void;
  onContact?: () => void;
  onCareers?: () => void;
  onTerms?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyPolicy, onSuccessStories, onContact, onCareers, onTerms }) => {
  return (
    <footer className="bg-white dark:bg-[#080D1D] text-gray-600 dark:text-gray-300 py-12 border-t border-gray-100 dark:border-transparent transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-gray-100 dark:border-gray-700 pb-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <a href="#" className="flex items-center justify-center md:justify-start text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              IdeaConnect
            </a>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto md:mx-0 mb-4">
              The pre-market validation platform for creators. Test ideas, get real signals, and launch with confidence.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.791-1.574 2.164-2.721-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.46 0-6.276 2.766-6.276 6.191 0 .487.055.955.162 1.404-5.22-.259-9.879-2.781-13.004-6.617-.534.918-.846 1.989-.846 3.136 0 2.145 1.137 4.041 2.873 5.143-.265-.008-.518-.08-.732-.206v.078c0 2.992 2.13 5.49 4.939 6.05-.515.141-1.05.216-1.604.216-.391 0-.769-.039-1.134-.108.783 2.422 3.05 4.204 5.768 4.253-2.094 1.627-4.745 2.598-7.614 2.598-.492 0-.977-.028-1.455-.084 2.716 1.758 5.923 2.785 9.39 2.785 11.264 0 17.433-9.176 17.433-17.072 0-.26-.008-.517-.02-.777.944-.683 1.756-1.536 2.404-2.502z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.529-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.703 7 2.678v6.557z"/></svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
              <li>
                <button 
                  onClick={onSuccessStories}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-200"
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-200">About</a></li>
              <li>
                <button 
                  onClick={onCareers}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-200"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={onContact}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
              <li>
                <button 
                  onClick={onPrivacyPolicy}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={onTerms}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} IdeaConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
