import React, { Component } from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer" style={{fontSize:".875rem"}}>
      <div className="container">
        <div className="row">
          <div className="col l3 s12">
            <p className="grey-text text-lighten-4">Borrow</p>
            <p>Loans for entrepreneurs doing amazing things.</p>
            <p>
              <a className="green-footer"href="https://www.kiva.org/borrow">Apply now</a>
            </p>
            <p className="grey-text text-lighten-4">Explore</p>
            <p>
              <ul className="siteFooter-links">
                <li>
                  <a className="green-footer"href="https://www.kiva.org/gifts" >
                    Gifts
                  </a>
                </li>
                <li>
                  <a className="green-footer"href="https://www.kiva.org/live" >
                    Happening now
                  </a>
                </li>
                <li>
                  <a className="green-footer"href="https://www.kiva.org/sitemap" >
                    Site map
                  </a>
                </li>
                <li>
                  <a className="green-footer"href="http://build.kiva.org" >
                    Developer API
                  </a>
                </li>
                <li>
                  <a className="green-footer"
                    href="https://www.kiva.org/legal/privacy"

                  >
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a className="green-footer"href="https://www.kiva.org/legal/terms" >
                    Terms of use
                  </a>
                </li>
              </ul>
            </p>
          </div>
          <div className="col l3 s12">
            <p className="grey-text text-lighten-4">Get to know us.</p>
            <ul>
              <li>
                <a className="green-footer"href="https://www.kiva.org/about" >
                  About us
                </a>
              </li>
              <li>
                <a className="green-footer"
                  href="https://www.kiva.org/about/how"

                >
                  How Kiva works
                </a>
              </li>
              <li>
                <a className="green-footer"
                  href="https://www.kiva.org/about/how#faq-hkw-section"

                >
                  FAQs
                </a>
              </li>
              <li>
                <a className="green-footer"
                  href="https://www.kiva.org/about/where-kiva-works"

                >
                  Where Kiva works
                </a>
              </li>
              <li>
                <a className="green-footer"href="https://www.kiva.org/blog" >
                  Blog
                </a>
              </li>
              <li>
                <a className="green-footer"
                  href="https://www.kiva.org/partner-with-us"

                >
                  Partner with us
                </a>
              </li>
              <li>
                <a className="green-footer"
                  href="https://www.kiva.org/help/contact-us"

                >
                  Contact us
                </a>
              </li>
              <li>
                <a className="green-footer"href="https://www.kiva.org/help">
                  Help
                </a>
              </li>
            </ul>
            <p>Community</p>
            <ul >
              <li>
                <a className="green-footer"href="https://www.kiva.org/teams">
                  Lending teams
                </a>
              </li>
              <li>
                <a className="green-footer"
                  href="https://www.kiva.org/kivau/intro"
                >
                  Students and educators
                </a>
              </li>
            </ul>
          </div>
          <div className="col l6 s12">
            <div >
              <div>
                <div>
                  Kiva is a 501(c)3 U.S. nonprofit fueled by passionate people.
                  Founded in 2005, and based in San Francisco, with offices in
                  Nairobi and staff around the globe.{" "}
                  <p><a className="green-footer"
                    href="https://www.kiva.org/donate/supportus"

                  >
                    Donate to our operating expenses.
                  </a>
                  </p>
                </div>
              </div>

              <div >
                <p>Work with us</p>
                <ul className="siteFooter-links links-list">
                  <li>
                    <a className="green-footer"
                      href="https://www.kiva.org/work-with-us/careers"

                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a className="green-footer"
                      href="https://www.kiva.org/work-with-us/internvolunteers"

                    >
                      Volunteer internships
                    </a>
                  </li>
                  <li>
                    <a className="green-footer"
                      href="https://www.kiva.org/work-with-us/fellows"

                    >
                      Kiva fellows
                    </a>
                  </li>
                  <li>
                    <a className="green-footer"
                      href="https://www.kiva.org/work-with-us/reviewers"

                    >
                      Review and translation
                    </a>
                  </li>
                  <li>
                    <a className="green-footer"
                      href="https://www.kiva.org/trustees"

                    >
                      Trustees
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div >
                  Lending through Kiva involves risk of principal loss. Kiva
                  does not guarantee repayment or offer a financial return on
                  your loan.
                </div>
                <p >
                  © 2019 Kiva. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-copyright"></div>
    </footer>
  );
};

export default Footer;
