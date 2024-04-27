import { Progress } from "@/components/ui/progress";
import { setResume } from "@/store/actions/profileAction";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { responseData } from "../types/api";
import {
  EducationForm,
  ExperienceForm,
  PersonalDetailsForm,
  ProjectForm,
  SkillsForm,
} from "../types/resume";
import Education from "./Education";
import Experience from "./Experience";
import PersonalDetails from "./PersonalDetails";
import Project from "./Project";
import Skills from "./Skills";

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsForm>({
    email: "",
    fname: "",
    lname: "",
    website: "",
    phone: "",
    location: "",
  });

  const [educationData, setEducationData] = useState<EducationForm>({
    college: "",
    fromyear1: "",
    toyear1: "",
    qualification1: "",
    description1: "",
    school: "",
    fromyear2: "",
    toyear2: "",
    qualification2: "",
    description2: "",
  });

  const [projectData, setProjectData] = useState<ProjectForm>({
    title1: "",
    link1: "",
    projectDescription1: "",
    title2: "",
    link2: "",
    projectDescription2: "",
    title3: "",
    link3: "",
    projectDescription3: "",
  });

  const [experienceData, setExperienceData] = useState<ExperienceForm>({
    institute1: "",
    position1: "",
    duration1: "",
    experienceDescription1: "",
    institute2: "",
    position2: "",
    duration2: "",
    experienceDescription2: "",
  });

  const [skillsData, setSkillsData] = useState<SkillsForm>({
    skills: "",
    github: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  const token = useSelector((state: any) => state.auth.token);
  const usrId = useSelector((state: any) => state.auth.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (submit) {
      setLoading(true);
      async function fetchData() {
        const formData = {
          userId: usrId,
          // Profile Information
          firstname: personalDetails.fname,
          lastname: personalDetails.lname,
          email: personalDetails.email,
          phone: personalDetails.phone,
          website: personalDetails.website,

          // Education Information
          college: educationData.college,
          fromyear1: educationData.fromyear1,
          toyear1: educationData.toyear1,
          qualification1: educationData.qualification1,
          description1: educationData.description1,
          school: educationData.school,
          fromyear2: educationData.fromyear2,
          toyear2: educationData.toyear2,
          qualification2: educationData.qualification2,
          description2: educationData.description2,

          // Project Information
          title1: projectData.title1,
          link1: projectData.link1,
          projectDescription1: projectData.projectDescription1,
          title2: projectData.title2,
          link2: projectData.link2,
          projectDescription2: projectData.projectDescription2,
          title3: projectData.title3,
          link3: projectData.link3,
          projectDescription3: projectData.projectDescription3,

          // Experience Information
          institute1: experienceData.institute1,
          position1: experienceData.position1,
          duration1: experienceData.duration1,
          experienceDescription1: experienceData.experienceDescription1,
          institute2: experienceData.institute2,
          position2: experienceData.position2,
          duration2: experienceData.duration2,
          experienceDescription2: experienceData.experienceDescription2,

          // Extra Information
          skill1: skillsData.skills,
          github: skillsData.github,
          linkedin: skillsData.linkedin,
          twitter: skillsData.twitter,
          facebook: skillsData.facebook,
          instagram: skillsData.instagram,
        };

        try {
          const response: responseData = await axios.post(
            "http://localhost:7000/api/v1/user/resume",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          setLoading(false);
          dispatch(setResume(response.data.message));
          navigate("/resume/result");
        } catch (error) {
          console.log(error);
        }
      }

      fetchData();
    }
  }, [submit]);

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
    <>
      <div className="container mx-auto relative font-Geist">
        <p className="text-center mt-10 mb-5">Create Resume</p>
        <div className="flex flex-col justify-center items-center relative mb-10">
          <div className="absolute bottom-0 w-1/2 ">
            <Progress value={progress} />
          </div>
          <div className="border border-gray-300 rounded-lg p-10 w-1/2 relative">
            {loading && (
              <div className="bg-gray-100 w-full h-full absolute top-0 left-0 z-10 rounded-lg">
                <div className="flex w-full flex-col gap-2 h-full justify-center items-center">
                  <ReloadIcon className="animate-spin" />
                  <p>Please Wait</p>
                </div>
              </div>
            )}
            {formComponent}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateResume;
