import React, { Component } from "react";
import Carousel from "./Carousel-mz";
import carousel from './caroussel-1.png';
import { Link } from "react-router-dom";
import idgen from "./idgen";
import "./learnAbout.css";
import missingMiddle from "./missing-middle.svg";
import financial from "./financial-maturity.svg";
import dseGlance from "./DSE-glance.svg";

class Terms extends Component {

  render() {
    return (
      <div className="container">
        <p>Thank you for deciding to volunteer your services to Kiva Microfunds (“Kiva”).
        By creating an account on crowdvet.org, you confirm your acceptance of the terms of this agreement (“Agreement”). We extend our appreciation for your volunteer contributions to Kiva!</p>
        <p><strong>1. Volunteer Services.</strong> I agree that my participation in all activities at and for Kiva are not in exchange for any consideration (e.g., pay, benefits, the promise of future employment). I acknowledge that, in exchange for my service as a volunteer at Kiva, I have neither been promised any consideration nor do I expect to receive any consideration. I understand that as a volunteer, I will not be entitled to any employee benefits. I understand that Kiva will not provide any accident or medical insurance, and is therefore not responsible for any accident or medical expenses that I incur in the course of volunteering. I also understand that I am not covered by workers’ compensation laws in connection with my volunteer affiliation.
        </p>
        <p><strong>2. Volunteer Relationship.</strong> I agree that, as a volunteer, I will not be a Kiva employee. I understand and agree that Kiva and I both have the right to end my volunteer relationship with Kiva at any time, for any reason, and without advance notice.  </p>
        <p><strong>3. Kiva Policies.</strong> I agree to abide by all applicable policies as a volunteer at Kiva.</p>
        <p><strong>4. Confidentiality.</strong> I understand that during the course of my work as a volunteer, I may have access to or receive “Confidential Information” of Kiva. “Confidential Information” means written (in any media), verbal or observed non-public information that Kiva designates as being confidential, or any other information which, under the given circumstances, would reasonably be deemed to be confidential. Confidential Information includes, but is not limited to, network and computer passwords, security information and procedures, financial and business information, and personal information of others. As a volunteer, (i) you may not disclose, directly or indirectly, any Confidential Information to any third party, unless expressly authorized by your volunteer supervisor in connection with your volunteer services, (ii) you may not use, copy or otherwise exploit Confidential Information, except for authorized purposes of your volunteer work with Kiva and (iii) you must take all reasonably necessary precautions to protect the confidentiality of the Confidential Information.</p>
        <p><strong>5. Release of Liability.</strong> As consideration for being permitted to participate as a volunteer at Kiva, I hereby release and discharge Kiva and its board of directors, officers, employees, volunteers and representatives from and against any and all liability arising from my participation in the volunteer work. I agree this release shall be legally binding upon myself, my heirs, successors, assigns, and legal representatives, it being my intention to fully assume all risk of the volunteer work.</p>
        <p><strong>6. Kiva Work Product/Property.</strong> I acknowledge and agree that all work that I do in the course of my volunteer service for Kiva will become the intellectual property of Kiva. I will retain no right to ownership, nor do I expect any kind of payment or compensation for such work. I agree and acknowledge that Kiva will exclusively own all rights worldwide, and will be entitled to the unrestricted use of the work for any purpose.</p>
        <p><strong>7. Kiva Equipment.</strong> I understand and agree that any equipment or materials that Kiva may provide for my use as a volunteer are the property of Kiva, may only be used for volunteer work related purposes (and not for personal or other purposes), and must be returned to Kiva at the conclusion of my volunteer services. I agree to take all reasonably necessary precautions to safeguard the Kiva equipment and materials from damage or loss.</p>
        <p>I agree that this Agreement sets forth the entire agreement and understanding regarding the terms of my volunteer service with Kiva and supersedes any prior representations or agreements, whether written or oral. I understand this Agreement is governed by California law, and can only be amended in writing. I am at least 18 years old and have signed this Agreement voluntarily and of my own free will.</p>
      </div>

    )
  }
}

export default Terms;
