import { PinBottomIcon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ResumePage = () => {
  const navigate = useNavigate();
  const usrId: string = useSelector((state: any) => state.auth.id);
  const token: string = useSelector((state: any) => state.auth.token);

  async function uploadResume(file: File) {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        `http://localhost:7000/api/v1/user/${usrId}/upload-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Upload successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  }

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";

    input.addEventListener("change", async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (["pdf", "doc", "docx"].includes(extension!)) {
          try {
            await uploadResume(file);
          } catch (error) {
            console.error("Error handling import:", error);
          }
        } else {
          alert("Please select a PDF, DOC, or DOCX file.");
        }
      }
    });
    input.click();
  };

  return (
    <div className="container mx-auto relative font-Geist">
      <div className="flex flex-col text-center mt-10">
        <h1 className="text-4xl font-semibold font-Raleway">Build Resume</h1>
        <p className="text-sm p-2">Start from scratch, or upload your resume</p>
      </div>
      <div className="flex justify-center my-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-40 h-52 relative rounded-md bg-black hover:cursor-pointer">
            <Link to="/resume/create">
              <div className="flex justify-center pt-16">
                <PlusIcon color="white" className="w-10 h-10" />
              </div>
              <div className="absolute bottom-1 bg-[#5454548e] border border-[#5a5a5a80] mx-2 rounded-xl">
                <p className="text-sm text-white text-center py-1">
                  Create a New Resume
                </p>
              </div>
            </Link>
          </div>
          <div
            className="w-40 h-52 relative rounded-md bg-black hover:cursor-pointer"
            onClick={handleImport}
          >
            <div className="flex justify-center pt-16">
              <PinBottomIcon color="white" className="w-10 h-10" />
            </div>
            <div className="absolute bottom-1 bg-[#5454548e] border border-[#5a5a5a80] mx-2 rounded-xl">
              <p className="text-sm text-white text-center py-1">
                Import an existing Resume
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
