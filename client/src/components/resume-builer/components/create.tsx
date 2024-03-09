import Education from "./Education";
import Project from "./Project";
import Experience from "./Experience";
import Skills from "./Skills";
import PersonalDetails from "./PersonalDetails";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  PersonalDetailsForm,
  ProjectForm,
  SkillsForm,
  EducationForm,
  ExperienceForm,
} from "../types/resume";
import axios, { AxiosResponse } from "axios";

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const [submit, setSubmit] = useState<boolean>(false);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsForm>({
    email: "",
    fname: "",
    lname: "",
    website: "",
    phone: "",
    location: "",
  });
  const [educationData, setEducationData] = useState<EducationForm>({
    cname: "",
    areaofstudy: "",
    typeofstudy: "",
    datefrom: "",
    dateto: "",
    score: "",
  });

  const [projectData, setProjectData] = useState<ProjectForm>({
    pname: "",
    link: "",
    date: "",
    description: "",
  });

  const [experienceData, setExperienceData] = useState<ExperienceForm>({
    companyName: "",
    location: "",
    duration: "",
    position: "",
    description: "",
  });

  const [skillsData, setSkillsData] = useState<SkillsForm>({
    skills: "",
  });

  async function handleSubmit() {
    const formData = {
      // Profile Information
      firstName: personalDetails.fname,
      lastName: personalDetails.lname,
      email: personalDetails.email,
      phone: personalDetails.phone,
      website: personalDetails.website,

      // Education Information
      college: educationData.cname,
      fromYear1: educationData.datefrom,
      toYear1: educationData.dateto,
      qualification1: educationData.areaofstudy,
      description1: educationData.score,

      // Project Information
      title1: projectData.pname,
      link1: projectData.link,
      projectDescription1: projectData.description,

      // Experience Information
      institute1: experienceData.companyName,
      position1: experienceData.position,
      duration1: experienceData.duration,
      experienceDescription1: experienceData.description,
      institute2: "",
      position2: "",
      duration2: "",
      experienceDescription2: "",

      // Extra Information
      skill1: skillsData.skills,
    };

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:7000/api/v1/user/resume",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const progress = (currentStep / 5) * 100;

  let formComponent;
  switch (currentStep) {
    case 1:
      formComponent = (
        <PersonalDetails
          formData={personalDetails}
          updateFormData={(data: PersonalDetailsForm) =>
            setPersonalDetails(data)
          }
          nextStep={nextStep}
        />
      );
      break;
    case 2:
      formComponent = (
        <Education
          formData={educationData}
          updateFormData={(data: EducationForm) => setEducationData(data)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
      break;
    case 3:
      formComponent = (
        <Project
          formData={projectData}
          updateFormData={(data: ProjectForm) => setProjectData(data)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
      break;
    case 4:
      formComponent = (
        <Experience
          formData={experienceData}
          updateFormData={(data: ExperienceForm) => setExperienceData(data)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
      break;
    case 5:
      formComponent = (
        <Skills
          formData={skillsData}
          updateFormData={(data: SkillsForm) => setSkillsData(data)}
          nextStep={nextStep}
          prevStep={prevStep}
          submit={() => {
            setSubmit(true);
          }}
        />
      );
      break;
    default:
      formComponent = null;
  }
  return (
    <div className="container mx-auto relative font-Geist">
      <p className="text-center mt-10 mb-5" onClick={handleSubmit}>
        Create Resume
      </p>
      <div className="flex flex-col justify-center items-center relative">
        <div className="absolute bottom-0 w-1/2 ">
          <Progress value={progress} />
        </div>
        <div className="border border-gray-300 rounded-lg p-10 w-1/2">
          {formComponent}
        </div>
      </div>
      {submit && (
        <button className="text-center w-full my-10">Resume Submitted</button>
      )}
    </div>
  );
};

export default CreateResume;
