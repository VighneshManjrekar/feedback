import { Component } from "react";
import Education from "./Education";
import Project from "./Project";
import Experience from "./Experience";
import Skills from "./Skills";
import PersonalDetails from "./PersonalDetails";
import { Progress } from "@/components/ui/progress";

type Props = {};

type State = {
  currentStep: number;
};

export default class Create extends Component<Props, State> {
  state: State = {
    currentStep: 1,
  };

  nextStep = () => {
    this.setState((prevState) => ({
      currentStep: prevState.currentStep + 1,
    }));
  };

  prevStep = () => {
    this.setState((prevState) => ({
      currentStep: prevState.currentStep - 1,
    }));
  };

  render() {
    const { currentStep } = this.state;
    const totalSteps = 5;

    const progress = (currentStep / totalSteps) * 100;

    let formComponent;
    switch (currentStep) {
      case 1:
        formComponent = <PersonalDetails nextStep={this.nextStep} />;
        break;
      case 2:
        formComponent = (
          <Education nextStep={this.nextStep} prevStep={this.prevStep} />
        );
        break;
      case 3:
        formComponent = (
          <Project nextStep={this.nextStep} prevStep={this.prevStep} />
        );
        break;
      case 4:
        formComponent = (
          <Experience nextStep={this.nextStep} prevStep={this.prevStep} />
        );
        break;
      case 5:
        formComponent = (
          <Skills nextStep={this.nextStep} prevStep={this.prevStep} />
        );
        break;
      default:
        formComponent = null;
    }
    return (
      <div className="container mx-auto relative font-Geist">
        <p className="text-center">Resume</p>
        <div className="flex flex-col justify-center items-center">
          <div className="border border-red-200 rounded-lg p-10 my-14 w-1/2">
            {formComponent}
          </div>
          <div className="w-1/2">
            <Progress value={progress} />
          </div>
        </div>
      </div>
    );
  }
}
