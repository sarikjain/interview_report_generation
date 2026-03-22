import React from 'react'
import "../pages/style.scss"
import { useinterview } from '../hooks/ai.hooks';
import { useState,useRef } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {


  const {loading,generatereport}=useinterview()
  const [jobdescription, setjobdescription] = useState("")
  const [selfdescription, setselfdescription] = useState("")
  const resumeinput = useRef()
  const navigate=useNavigate()
  const handlegeneratereport = async (e) => {
  e.preventDefault();

  try {

    const resumefile = resumeinput.current.files[0];
    if (!resumefile) {
  alert("Upload resume");
  return;
}

    const data = await generatereport({
      jobdescription,
      selfdescription,
      resumefile
    });

    console.log("DATA:", data); // 🔥 IMPORTANT

    if (!data) {
      alert("API failed — check backend");
      return;
    }

  if (data?.interviewreport?._id) {
  navigate(`/interview/${data.interviewreport._id}`);
}

  } catch (err) {
    console.log("ERROR:", err);
    alert("Something went wrong");
  }
};
  return (
    <main>
      <div id="main">
        <div className="container">
          
          <div className="logo">AI Interview Prep</div>

          <form onSubmit={handlegeneratereport}>
            <div className="inputgroup">
              <label className="label">Self Description</label>
              <textarea onChange={(e)=>{setselfdescription(e.target.value)}} placeholder="Tell about yourself..."></textarea>
            </div>

            <div className="inputgroup">
              <label className="label">Job Description</label>
              <textarea onChange={(e)=>{setjobdescription(e.target.value)}} placeholder="Paste job description..."></textarea>
            </div>

            <div className="inputgroup">
              <label className="label">Upload Resume</label>
              <input ref={resumeinput}type="file" className="file-input" />
              <span className="helper">PDF only, max 2MB</span>
            </div>

            <button  className="button" type="submit">
              Generate Report
            </button>

          </form>

        </div>
      </div>
    </main>
  );
};

export default Home;