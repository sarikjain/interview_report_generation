import { createContext, useState, useEffect } from "react";

export const interviewcontext = createContext();

export const InterviewProvider = ({ children }) => {
  const [report, setreport] = useState(null);
  const [reports, setreports] = useState([]);
  const [loading, setloading] = useState(true);

  // ✅ Load from localStorage on refresh
  useEffect(() => {
    const savedReport = localStorage.getItem("report");

    if (savedReport) {
      setreport(JSON.parse(savedReport));
    }

    setloading(false);
  }, []);

  // ✅ Save whenever report changes
  useEffect(() => {
    if (report) {
      localStorage.setItem("report", JSON.stringify(report));
    }
  }, [report]);

  return (
    <interviewcontext.Provider
      value={{
        report,
        setreport,
        reports,
        setreports,
        loading,
        setloading,
      }}
    >
      {children}
    </interviewcontext.Provider>
  );
};