const pdfParse = require("pdf-parse");

const generateinterviewreport=require("../services/ai.service")
const interviewreportmodel=require("../models/interviewreport.model")


async function generatereport(req, res) {
  try {
    console.log("🚀 API HIT");

    const resumefile = req.file;
    console.log("FILE:", resumefile);

    if (!resumefile) {
      return res.status(400).json({ message: "Resume file missing" });
    }

    const pdf = await pdfParse(resumefile.buffer);
    console.log("PDF DONE");

    const resumecontent = pdf.text;

    const { selfdescription, jobdescription } = req.body;
    console.log("BODY:", req.body);

    const interviewreportbyai = await generateinterviewreport({
      resume: resumecontent,
      selfdescription,
      jobdescription
    });
    console.log("AI RESULT FULL:", JSON.stringify(interviewreportbyai, null, 2));

    console.log("AI RESULT:", interviewreportbyai);

    const interviewreport = await interviewreportmodel.create({
      user: req.user._id,
      resume: resumecontent,
      selfdescription,
      jobdescription,
      ...interviewreportbyai
    });

    console.log("DB SAVED");

    res.status(201).json({
      message: "interview report generated successfully",
      interviewreport
    });

  } catch (err) {
    console.log("🔥 FULL ERROR:", err); // 👈 MOST IMPORTANT
    res.status(500).json({ message: "Internal server error" });
  }
}




// async function generatereport(req, res) {
//   try {
//     console.log("🚀 API HIT");

//     const pdf = await pdfParse(req.file.buffer);

//     return res.json({
//       length: pdf.text.length
//     });

//   } catch (err) {
//     console.log("🔥 PDF ERROR:", err); // 👈 IMPORTANT
//     return res.status(500).json({
//       message: err.message
//     });
//   }
// }
// getreportbyid
async function getinterviewreportbyid(req, res) {
  const { interviewid } = req.params
  const interviewreport = await interviewreportmodel.findOne({
    _id: interviewid,
    user: req.user._id  // ✅ change from req.user.id to req.user._id
  })
  if (!interviewreport) {
    return res.status(404).json({ message: 'interview report not found' })
  }
  res.status(200).json({
    message: "interview report fetched succesfully",
    interviewreport
  })
}

// getallinterviews
async function getallinterviews(req, res) {
  const interviewreports = await interviewreportmodel
    .find({ user: req.user._id })  // ✅ change from req.user.id to req.user._id
    .sort({ createdAt: -1 })
    .select("-resume -selfdescription -jobdescription -technicalquestions -behaviourialquestions -skillsgap -preparationplan")
  
  res.status(200).json({
    message: "Interview reports fetched succesfully",
    interviewreports
  })
}


module.exports={generatereport,getinterviewreportbyid,getallinterviews}