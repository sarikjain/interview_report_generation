import React, { useEffect, useState } from "react";
import "./Interview.scss";
import { useinterview } from "../hooks/ai.hooks";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/interview.scss"

const ScoreRing = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="score-ring-wrapper">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          className="ring-progress"
        />
      </svg>
      <div className="score-center">
        <span className="score-number" style={{ color }}>{score}</span>
        <span className="score-label">/ 100</span>
      </div>
    </div>
  );
};

const AccordionItem = ({ index, question, intention, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item ${open ? "open" : ""}`}>
      <button className="accordion-trigger" onClick={() => setOpen(!open)}>
        <span className="acc-index">Q{index + 1}</span>
        <span className="acc-question">{question}</span>
        <span className="acc-chevron">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="accordion-body">
          <div className="acc-block intent">
            <span className="acc-tag">Intent</span>
            <p>{intention}</p>
          </div>
          <div className="acc-block ans">
            <span className="acc-tag">How to Answer</span>
            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const SeverityBadge = ({ severity }) => (
  <span className={`badge badge--${severity}`}>{severity}</span>
);

const Interview = () => {
  const { report, loading, getreportbyid, reports, getallreports } = useinterview();
  const { interviewId} = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("technical");

useEffect(() => {
  if (interviewId) getreportbyid(interviewId);
  getallreports().then(() => console.log("REPORTS STATE:", reports));
}, [interviewId]);

  if (loading) return (
    <div className="iv-loading">
      <div className="iv-spinner" />
      <p>Generating your report...</p>
    </div>
  );

  if (!report) return <div className="iv-empty">No report available</div>;

  const tabs = [
    { key: "technical", label: "Technical", count: report.technicalquestions?.length },
    { key: "behavioural", label: "Behavioural", count: report.behaviourialquestions?.length },
    { key: "skills", label: "Skill Gaps", count: report.skillsgap?.length },
    { key: "plan", label: "Prep Plan", count: report.preparationplan?.length },
  ];

  return (
    <div className="iv-page">

      {/* Header */}
      <div className="iv-header">
        <div className="iv-header__left">
          <div className="iv-chip">Interview Report</div>
          <h1 className="iv-title">{report.title}</h1>
        </div>
        <ScoreRing score={report.matchscore} />
      </div>

      {/* Tab Nav */}
      <div className="iv-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`iv-tab ${activeTab === t.key ? "iv-tab--active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
            <span className="iv-tab__count">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="iv-content">

        {activeTab === "technical" && (
          <div className="iv-section">
            {report.technicalquestions?.filter(Boolean).map((q, i) => (
              <AccordionItem key={i} index={i} {...q} />
            ))}
          </div>
        )}

        {activeTab === "behavioural" && (
          <div className="iv-section">
            {report.behaviourialquestions?.filter(Boolean).map((q, i) => (
              <AccordionItem key={i} index={i} {...q} />
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="iv-section">
            {report.skillsgap?.filter(Boolean).map((s, i) => (
              <div key={i} className="skill-row">
                <span className="skill-name">{s.skill}</span>
                <SeverityBadge severity={s.severity} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "plan" && (
          <div className="iv-section plan-grid">
            {report.preparationplan?.filter(Boolean).map((p, i) => (
              <div key={i} className="plan-card">
                <div className="plan-day">Day {p.day}</div>
                <div className="plan-focus">{p.focus}</div>
                <p className="plan-tasks">{p.tasks}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Past Reports */}
      {reports && reports.length > 0 && (
        <div className="iv-past">
          <h2 className="iv-past__title">Your Past Reports</h2>
          <div className="iv-past__grid">
            {reports.map((r) => (
              <div
                key={r._id}
                className={`past-card ${r._id === interviewId ? "past-card--active" : ""}`}
                onClick={() => navigate(`/interview/${r._id}`)}
              >
                <div className="past-card__title">{r.title || "Interview Report"}</div>
                <div className="past-card__score">
                  <span className="past-score-dot" />
                  {r.matchscore ?? "—"} / 100
                </div>
                <div className="past-card__date">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  }) : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Interview;
