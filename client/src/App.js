import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import UserProfile from "./components/Profile";
import ApplicationShow from "./components/ApplicationShow";
import ApplicationEvaluate from "./components/Evaluation";
import Admin from "./components/Admin";
import VetEnterprises from "./components/VetEnterprises";
import EvaluationResults from "./components/EvaluationResults";
import EvaluationResultsViz from "./components/EvaluationResultsViz";
import LineChart from "./components/Chart";
import LearnAbout from "./components/LearnAbout";
import * as actions from "./actions";
import HowWorks from "./components/HowWorks";
import Terms from "./components/Terms";
import FurtherReading from "./components/FurtherReading";
import ResetPassword from "./components/ResetPass"
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/users/evaluations/results/:id" component={EvaluationResults} />
          <Route exact path="/evaluations/results/:id" component={EvaluationResultsViz} />
          <Route exact path="/vet/enterprises" component={VetEnterprises} />
          <Route exact path="/user" component={UserProfile} />
          <Route exact path="/application/:id" component={ApplicationShow}
          />
          <Route path="/users/evaluations/:id" component={ApplicationEvaluate}
          />
          <Route exact path="/learn" component={LearnAbout} />
          <Route exact path="/how-works" component={HowWorks} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/further-reading" component={FurtherReading} />
          <Route exact path="/resetpass/:id" component={ResetPassword} />
          <Route path="/" component={Landing} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(App);
