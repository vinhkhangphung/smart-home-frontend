import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-400">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p>&copy; 2024 Your Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
