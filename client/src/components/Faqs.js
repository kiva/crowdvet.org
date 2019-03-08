import React, { Component } from "react";
import Carousel from "./Carousel-mz";
import carousel from "./caroussel-1.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import idgen from "./idgen";
import "./learnAbout.css";
import missingMiddle from "./missing-middle.svg";
import financial from "./financial-maturity.svg";
import dseGlance from "./DSE-glance.svg";
import SignUpModal from "./SignUpModal";
import SubMenu from "./SubMenuLearn";
import tableConversion from './table-conversion.png';
import TopMenu from "./TopMenu";

class LearnAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topMenu: {
        profile: { active: false },
        vet: { active: false },
        faqs: { active: true }
      }
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.jQuery(document).ready(function() {
      window.jQuery(".collapsibleFaqs").collapsible();
    });
  }

  render() {
    return (
      <div>
        <TopMenu menu={this.state.topMenu} />
        <div className="container">{this.renderContent()}</div>
      </div>
    );
  }

  renderContent() {
    const startVetting = this.props.auth ? (
      <Link className="btn-flat start-vetting-btn" to={"/user"}>
        Start Vetting
      </Link>
    ) : (
      <Link className="btn-flat start-vetting-btn modal-trigger" to={"#modal1"}>
        Start Vetting
      </Link>
    );

    return (
      <div>
        <div className="row">
          <div className="col s12 center">
            <h4>FAQs</h4>
          </div>
        </div>
        <div className="row">
          <ul className="collapsibleFaqs" data-collapsible="accordion">
            <li>
              <div class="collapsible-header grey-background font-26 dark-grey ">
                What is crowdvetting?
              </div>
              <div class="collapsible-body">
                <span>
                  Crowdvetting was born from Kiva’s Direct-to-Social Enterprise
                  (DSE) program, which started in June 2016 as a pilot program
                  to provide working capital loans to social enterprises all
                  over the world. Kiva decided to harness the power of the crowd
                  by providing them the materials to conduct due diligence on
                  social enterprises. The crowd can vet more borrowers faster
                  than the Kiva staff can, making it easier for small and
                  medium-sized enterprises to access the capital they need
                  through Kiva.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                How do I evaluate an enterprise?
              </div>
              <div class="collapsible-body">
                <span>
                  During the vetting process you will be asked to evaluate the
                  enterprise based on impact, business model and overall opinion
                  using a 1 to 6 scale (1 being strongly disagree, 6 being
                  strongly agree). You can also add additional comments or
                  thoughts about the enterprise to help us better understand
                  your evaluation process.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                Do I need to have a certain background/experience to
                participate?
              </div>
              <div className="collapsible-body">
                <span>
                  There is no specific experience required. The ideal vetter
                  would be a graduate student who wants to learn about novel
                  social enterprises and practice reviewing real financial and
                  loan application materials, or a working professional eager to
                  contribute their skills.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                What time commitment is expected of participants?
              </div>
              <div className="collapsible-body">
                <span>
                  Participation is self-driven, with no strict time commitment.
                  Participants can vet any number of posted enterprises they
                  choose at any time. The vetting process takes ~1 hour per
                  enterprise.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                How are score and accuracy calculated?
              </div>
              <div className="collapsible-body">
                <span>
                  Each time a user vets an enterprise, their votes are compared
                  to Kiva’s votes. The absolute difference between each of these
                  is then used to calculate your score out of 10.
                </span>
                <table>
                  <thead>
                    <tr>
                      <th>
                      Evaluation Question
                      </th>
                      <th>User Votes</th>
                      <th>Kiva Votes</th>
                      <th>Abs</th>
                      <th>Sign</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Business Model</td>
                      <td>3</td>
                      <td>6</td>
                      <td>3</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>Sicial Impact</td>
                      <td>5</td>
                      <td>5</td>
                      <td>0</td>
                      <td>+</td>
                    </tr>
                    <tr>
                      <td>Recommendation</td>
                      <td>5</td>
                      <td>5</td>
                      <td>0</td>
                      <td>+</td>
                    </tr>
                  </tbody>
                </table>
                <p>User score according to the table below (1 - and 2 +) would be 7 with an accuracy rating of 50%.</p>
                <div className="center">
                <img  class="responsive-img"  src={tableConversion} alt="table conversion"/>
                </div>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                Who evaluates the enterprises at Kiva?
              </div>
              <div className="collapsible-body">
                <span>
                  The Kiva DSE program has a small, but dedicated team of staff
                  and interns who review the application materials and evaluate
                  the enterprises.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                What if I don’t want to give low votes to any enterprises?
              </div>
              <div className="collapsible-body">
                <span>
                  We understand the desire to help everyone, but Kiva cannot
                  approve every single application.
                  Some enterprises are not yet at a stage to receive a working
                  capital loan and approving them may do more harm than good.
                  Kiva will always consider reapplicants in the future when
                  their needs better fit the DSE program, and your honest votes
                  will help us fund the enterprises most ready for growth.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                How long are enterprises open for vetting on crowdvet.org?
              </div>
              <div className="collapsible-body">
                <span>
                  Enterprises will typically accept evaluations for 14 days.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                What happens after I complete an evaluation?
              </div>
              <div className="collapsible-body">
                <span>
                  After you complete an evaluation, you can continue to review
                  and reevaluate the enterprise until the crowdvetting period
                  ends.
                  <br /><br />
                  Once the enterprise is closed for vetting, Kiva’s staff will
                  post their votes and final decision.
                  Users will then receive
                  their individual score and accuracy rating on their profile.
                  If an enterprise is approved, it will be posted to the Kiva
                  website for funding within 1-2 weeks.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                Who makes the final decision to approve or reject an
                application?
              </div>
              <div className="collapsible-body">
                <span>
                  Kiva’s DSE and risk management teams evaluate the application
                  and crowdvet data after the evaluation period ends to make an
                  informed decision about whether or not to approve the loan.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                What happens if an enterprise I evaluated is approved, but does
                not fully fund on Kiva?
              </div>
              <div className="collapsible-body">
                <span>
                  Unfortunately, Kiva’s DSE program is an all-or-nothing
                  campaign and it is possible for an approved enterprise to not
                  raise the full amount during the 30 day crowdfunding period.
                  In this event, the amount raised will be refunded back to the
                  lenders.
                </span>
                <br /><br/>
                <span>
                  We know that it can be difficult to see some loans miss their
                  funding goal, which is why we keep working hard to reach new
                  lenders who can help create more positive impact.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                How long does it take from the time vetting closes to loan
                disbursement?
              </div>
              <div className="collapsible-body">
                <span>
                  From the time that user vetting closes on the crowdvet
                  website, it can take up to 60 days for the loan, if approved,
                  to be fully funded and then disbursed to the enterprise.
                </span>
              </div>
              <br />
            </li>
            <li>
              <div className="collapsible-header grey-background font-26 dark-grey">
                Will my score change if an enterprise I evaluated defaults on
                their loan?
              </div>
              <div className="collapsible-body">
                <span>
                  No. At this time, user scores will remain unchanged.
                </span>
              </div>
              <br />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(LearnAbout);
