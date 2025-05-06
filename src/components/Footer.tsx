"use client";

import Link from "next/link";
import { FaFacebook, FaLinkedin, FaReddit, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    // <footer className="dark:bg-[#212121] border-t border-gray-400 dark:border-gray-500 dark:text-white py-5">
    //   <div className="container mx-auto text-center">
    //     <p className="text-gray-700 dark:text-gray-300 ">&copy; 2025 MustcoWeb. All rights reserved.</p>
    //   </div>
    // </footer>
    <footer className="relative z-10 border-t border-gray-3 py-8">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col flex-wrap items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
          {/* <!-- Copyright --> */}
          <div>
            <p className="text-custom-sm">
              © 2025 MuscoWeb. All rights reserved
            </p>
          </div>

          {/* <!-- Links --> */}
          <div>
            <ul className="flex flex-wrap items-center gap-2.5">
              <li>
                <Link
                  className="group flex text-custom-sm leading-none duration-200 ease-in hover:text-dark"
                  href="/privacy-policy"
                >
                  <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <span className="flex h-[3px] w-[3px] rounded-full bg-gray-800 dark:bg-gray-200"></span>
              </li>
              <li>
                <Link
                  className="group flex text-custom-sm leading-none duration-200 ease-in hover:text-dark"
                  href="/privacy-policy"
                >
                  <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Terms
                  </span>
                </Link>
              </li>
              <li>
                <span className="flex h-[3px] w-[3px] rounded-full bg-gray-800 dark:bg-gray-200"></span>
              </li>
              <li>
                <Link
                  className="group flex text-custom-sm leading-none duration-200 ease-in hover:text-dark"
                  href="/contact"
                >
                  <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* <!-- Social Media --> */}
          <div>
            <div className="flex items-center gap-3">
              <p className="text-custom-sm font-medium text-dark">Follow Us:</p>
              <div className="flex items-center gap-1.5">
                {/* <!-- Facebook --> */}
                <a
                  href="#"
                  aria-label="social media link"
                  className="flex h-7.5 w-7.5 items-center justify-center rounded-full hover:bg-gray-2 hover:text-dark lg:transition-all lg:duration-300 lg:ease-linear"
                >
                  <FaFacebook />
                </a>
                {/* <!-- X (Twitter) --> */}
                <a
                  href="#"
                  aria-label="social media link"
                  className="flex h-7.5 w-7.5 items-center justify-center rounded-full hover:bg-gray-2 hover:text-dark lg:transition-all lg:duration-300 lg:ease-linear"
                >
                  <FaTwitter />
                </a>
                {/* <!-- LinkedIn --> */}
                <a
                  href="#"
                  aria-label="social media link"
                  className="flex h-7.5 w-7.5 items-center justify-center rounded-full hover:bg-gray-2 hover:text-dark lg:transition-all lg:duration-300 lg:ease-linear"
                >
                  <FaLinkedin />
                </a>
                {/* <!-- Reddit --> */}
                <a
                  href="#"
                  aria-label="social media link"
                  className="flex h-7.5 w-7.5 items-center justify-center rounded-full hover:bg-gray-2 hover:text-dark lg:transition-all lg:duration-300 lg:ease-linear"
                >
                  <FaReddit />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
