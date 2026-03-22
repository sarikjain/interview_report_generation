import axios from "axios";

export const generateinterviewreport = async ({ jobdescription, selfdescription, resumefile }) => {

    const formData = new FormData();
    formData.append("jobdescription", jobdescription);
    formData.append("selfdescription", selfdescription);
    formData.append("resume", resumefile);

    const response = await axios.post(
        "http://localhost:3000/api/interview/",
        formData,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const getinterviewreportbyid = async (interviewId) => {
    const response = await axios.get(
        `http://localhost:3000/api/interview/report/${interviewId}`,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const getallinterviews = async () => {
    const response = await axios.get(
        "http://localhost:3000/api/interview/",
        {
            withCredentials: true
        }
    );

    return response.data;
};