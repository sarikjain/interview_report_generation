import { getallinterviews, getinterviewreportbyid, generateinterviewreport } from "../ai.api";
import { useContext } from "react";
import { interviewcontext } from "../ai.context";

export const useinterview = () => {
  const context = useContext(interviewcontext);

  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }

  const { report, setreport, loading, setloading, reports, setreports } = context;

  const generatereport = async ({ jobdescription, selfdescription, resumefile }) => {
    setloading(true);
    try {
      const response = await generateinterviewreport({ jobdescription, selfdescription, resumefile });
      setreport(response.interviewreport); 
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const getreportbyid = async (interviewid) => {
    setloading(true);
    try {
      const response = await getinterviewreportbyid(interviewid);
      setreport(response.interviewreport); 
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const getallreports = async () => {
    setloading(true);
    try {
      const response = await getallinterviews();
      setreports(response.interviewreports); 
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  return {
    report,
    loading,
    reports,
    generatereport,
    getreportbyid,
    getallreports
  };
};