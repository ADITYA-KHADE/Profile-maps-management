import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-sm mb-2">
          Developed by <span className="font-semibold">Aditya Khade</span>
        </p>
        <a
          href="https://github.com/ADITYA-KHADE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-400 hover:text-blue-600"
        >
          <GitHubIcon fontSize="large" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
