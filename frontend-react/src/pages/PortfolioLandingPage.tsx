import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import profilePhoto from "../assets/girl1.jpg";
import voyag1 from "../assets/image.png";
import voyag2 from "../assets/image1.png";
import voyag3 from "../assets/image2.png";
import "../styles/portfolio.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";


// Custom inline theme colors
const palette = {
  primary: "#4d2375ff",
  accent: "#b734b5ff",
  backgroundLight: "#f9f9fb",
  backgroundDark: "#121212",
  textDark: "#212529",
  textLight: "#f8f9fa",
};

const PortfolioLanding: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");
  }, [theme]);


  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/contact", form, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.data.message || "✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" }); // clear form
    } catch (err: unknown) {
      console.error(err);
      setStatus("❌ Failed to send message. Please try again.");
    }
  };


  return (
    <div className={theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}>
      {/* NAVBAR */}
      <nav
        className={`navbar navbar-expand-lg fixed-top shadow-sm ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
      >
        <div className="container">
          <a className="navbar-brand fw-bold" href="#hero">
            Telmah Kinyuy Tantoh
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav me-3">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#skills">Skills</a></li>
              <li className="nav-item"><a className="nav-link" href="#projects">Projects</a></li>
              <li className="nav-item"><a className="nav-link" href="#certifications">Certifications</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="#voyag">VOYAG</a></li>
            </ul>
            <button
              onClick={toggleTheme}
              className="btn btn-sm"
              style={{
                borderColor: theme === "dark" ? palette.textLight : palette.accent,
                color: theme === "dark" ? palette.textLight : palette.accent,
                borderWidth: "2px",
              }}
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="d-flex flex-column justify-content-center align-items-center text-center vh-100" style={{ paddingTop: "70px" }}>
        <motion.img
          src={profilePhoto}
          alt="Telmah Kinyuy Tantoh"
          className="rounded-circle shadow-lg mb-4 border border-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ width: "200px", height: "200px", objectFit: "cover", borderColor: palette.accent }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fw-bold display-5 mb-3"
          style={{ color: palette.primary }}
        >
          Hi, I’m <span style={{ color: palette.accent }}>Telmah Kinyuy Tantoh</span> 👋
        </motion.h1>
        <p className="lead text-muted mb-4">Aspiring Software Engineer | IT Support Specialist | CAF Primary Reserve Member | VOYAG Founder</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          {/* View Projects */}
          <a
            href="#projects"
            className="btn btn-primary btn-lg"
            style={{ backgroundColor: palette.primary, borderColor: palette.primary }}
          >
            View Projects
          </a>

          {/* View Resume */}
          <a
            href="http://127.0.0.1:5000/api/resume?mode=view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-secondary btn-lg"
            style={{ color: palette.accent, borderColor: palette.accent }}
          >
            View Resume
          </a>

          {/* Download Resume */}
          <a
            href="http://127.0.0.1:5000/api/resume?mode=download"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            style={{ backgroundColor: palette.primary, borderColor: palette.primary }}
          >
            Download Resume
          </a>
        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="py-5 border-top border-bottom">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{ color: palette.primary }}>About Me</h2>
          <p className="fs-5 text-muted mx-auto" style={{ maxWidth: "750px" }}>
            I’m a Computer Science student at the University of Guelph and a graduate of the ALX Software Engineering program.
            My goal is to bridge my technical skills with real-world IT and software development experience. I’m passionate about backend systems, DevOps, and AI-driven applications — especially through my project, <strong>CareerMap</strong>.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-5" style={{ color: palette.primary }}>Skills & Tools</h2>
          <div className="row g-3 justify-content-center">
            {[
              "Python", "Java", "JavaScript", "TypeScript", "React", "Flask",
              "PostgreSQL", "AWS", "Docker", "Git/GitHub", "Linux (WSL)", "IT Support",
            ].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="col-6 col-md-3 col-lg-2"
              >
                <div
                  className={`card shadow-sm border-0 p-3 h-100 ${
                    theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"
                  }`}
                  style={{
                    borderTop: `3px solid ${palette.accent}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <div className="card-body d-flex align-items-center justify-content-center fw-semibold">
                    {skill}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* PROJECTS SECTION */}
    <section
      id="projects"
      className="py-5 border-top border-bottom"
      style={{ backgroundColor: palette.backgroundLight }}
    >
      <div className="container">
        <h2
          className="fw-bold text-center mb-5"
          style={{ color: palette.primary }}
        >
          Projects
        </h2>

        {/* === Animated Project Row === */}
        <motion.div
          className="row justify-content-center g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {/* === CareerMap Project === */}
          <motion.div
            className="col-md-6 col-lg-5"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className={`card h-100 shadow-lg border-0 ${
                theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"
              }`}
            >
              <div className="card-body">
                <h3 className="card-title fw-bold mb-3">CareerMap</h3>
                <p className="card-text text-muted">
                  A Flask + React web app that generates AI-based career roadmaps
                  and stores user resumes securely in AWS S3. Includes JWT
                  authentication, job scraping, and personalized milestone
                  generation.
                </p>
                <div className="d-flex gap-3 mt-3">
                  <a
                    href="https://github.com/telmahkinyuy/careerMap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: palette.primary,
                      borderColor: palette.primary,
                    }}
                  >
                    GitHub
                  </a>
                  <a
                    href="/demo/careerMap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary"
                    style={{
                      color: palette.accent,
                      borderColor: palette.accent,
                    }}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* === Placeholder Project Block === */}
          <motion.div
            className="col-md-6 col-lg-5"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className={`card h-100 shadow-lg border-0 ${
                theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"
              }`}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h3 className="card-title fw-bold mb-3">ToDo Web App</h3>
                  <p className="card-text text-muted">
                    This project block is reserved for your upcoming app — such as a
                    ToDo List or productivity tool. You can update the title,
                    description, technologies, and links later.
                  </p>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: palette.primary,
                      borderColor: palette.primary,
                    }}
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary"
                    style={{
                      color: palette.accent,
                      borderColor: palette.accent,
                    }}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>



        {/* CERTIFICATIONS */}
        <section id="certifications" className="py-5 text-center">
          <div className="container">
            <h2 className="fw-bold mb-4" style={{ color: palette.primary }}>Certifications</h2>
            <div className="row justify-content-center g-4">
              {[
                { name: "Google IT Support Professional", issuer: "Google / Coursera", link: "#" },
                { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", link: "#" },
                { name: "CompTIA A+", issuer: "CompTIA", link: "#" },
              ].map((cert, index) => (
                <div className="col-md-4" key={index}>
                  <div className={`card border-0 shadow-sm h-100 ${theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"}`}>
                    <div className="card-body">
                      <h5 className="fw-bold">{cert.name}</h5>
                      <p className="text-muted">{cert.issuer}</p>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: palette.accent }}>
                        View Credential →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* CONTACT */}
      <section id="contact" className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{ color: palette.primary }}>Contact Me</h2>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <form
                onSubmit={handleSubmit}
                method="POST"
                action="http://127.0.0.1:5000/api/contact"
                className={`text-start shadow p-4 rounded ${theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"}`}
              >
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="form-control"
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5" style={{ backgroundColor: palette.primary, borderColor: palette.primary }}>
                    Send Message
                  </button>
                </div>
                {status && (
                  <div className="alert alert-info mt-3 text-center" role="alert">
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* VOYAG SECTION */}
      <section id="voyag" className="py-5 bg-light border-top">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{ color: palette.primary }}>VOYAG</h2>
          <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
            VOYAG is a digital platform built to inspire and empower young professionals to navigate career and personal growth journeys.
          </p>

          {/* GALLERY */}
         <div className="row voyag-gallery g-3 mt-4">
            <div className="col-md-4"><img src={voyag1} alt="VOYAG event 1" className="img-fluid rounded shadow-sm" /></div>
            <div className="col-md-4"><img src={voyag2} alt="VOYAG community" className="img-fluid rounded shadow-sm" /></div>
            <div className="col-md-4"><img src={voyag3} alt="VOYAG workshop" className="img-fluid rounded shadow-sm" /></div>
         </div>


          {/* External site */}
          <div className="mt-4">
            <a href="https://www.voyag.ca" target="_blank" rel="noopener noreferrer" className="btn btn-lg text-white" style={{ backgroundColor: palette.primary }}>
              Visit VOYAG →
            </a>
          </div>

          {/* Social media */}
          <div className="social-links mt-4">
            <a href="https://www.linkedin.com/in/tantoh-telmah-058054202/" target="_blank" rel="noopener noreferrer" style={{ color: palette.accent, fontSize: "1.8rem", margin: "0 12px" }}>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" style={{ color: palette.accent, fontSize: "1.8rem", margin: "0 12px" }}>
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${theme === "dark" ? "bg-black text-light" : "bg-dark text-white"} text-center py-4`}>
        <p className="mb-0">© {new Date().getFullYear()} <strong>Telmah Kinyuy Tantoh</strong> — All rights reserved.</p>
        <small className="text-secondary">Built with React + Bootstrap + Flask</small>
        <div className="mb-3">
          <a href="https://linkedin.com/in/telmahkinyuy" className="mx-2" target="_blank"><i className="bi bi-linkedin fs-4" style={{ color: palette.primary }}></i></a>
          <a href="https://github.com/telmahkinyuy" className="mx-2" target="_blank"><i className="bi bi-github fs-4" style={{ color: palette.primary }}></i></a>
          <a href="https://twitter.com/yourhandle" className="mx-2" target="_blank"><i className="bi bi-twitter fs-4" style={{ color: palette.primary }}></i></a>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioLanding;
