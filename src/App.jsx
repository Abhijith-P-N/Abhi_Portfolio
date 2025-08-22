import React, { useEffect, useRef, useState } from 'react';
import Hero from './hero.png';

// Main App Component
export default function App() {
    const sectionsRef = useRef([]);
    const [formStatus, setFormStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // --- Project Data State ---
    // Moved projects to state to allow for dynamic updates from the API
    const [projects, setProjects] = useState([
        {
            title: "Secure E-commerce Site",
            description: "An e-commerce platform with a focus on secure payment processing and user data protection.",
            image: "https://placehold.co/600x400/1e1e1e/f94f28?text=Project+1",
            tags: ["React", "Node.js", "Security"],
            isGenerating: false // To track loading state for each card
        },
        {
            title: "Network Packet Analyzer",
            description: "A Python tool to capture and analyze network traffic, identifying potential security threats.",
            image: "https://placehold.co/600x400/1e1e1e/f94f28?text=Project+2",
            tags: ["Python", "Networking", "CLI"],
            isGenerating: false
        },
        {
            title: "Personal Blog Platform",
            description: "A full-stack blog application with secure authentication and content management features.",
            image: "https://placehold.co/600x400/1e1e1e/f94f28?text=Project+3",
            tags: ["Next.js", "Firebase", "Auth"],
            isGenerating: false
        }
    ]);

    // --- Gemini API Call Function ---
    const generateProjectDescription = async (projectIndex) => {
        const project = projects[projectIndex];
        
        // Set loading state for the specific project card
        setProjects(projects.map((p, i) => i === projectIndex ? { ...p, isGenerating: true } : p));

        const prompt = `You are a professional software engineering portfolio assistant. Write a concise, professional, and engaging project description (around 30-40 words) for a project titled '${project.title}' with the following technologies/concepts: ${project.tags.join(', ')}. Highlight how it showcases the developer's skills.`;

        try {
            const apiKey = ""; // API key will be injected by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const payload = {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
                const newDescription = result.candidates[0].content.parts[0].text;
                // Update the specific project's description in the state
                setProjects(projects.map((p, i) => i === projectIndex ? { ...p, description: newDescription, isGenerating: false } : p));
            } else {
                 throw new Error("Invalid response structure from API.");
            }

        } catch (error) {
            console.error("Error generating description:", error);
            // Reset loading state on error
            setProjects(projects.map((p, i) => i === projectIndex ? { ...p, isGenerating: false } : p));
        }
    };


    // --- Social Icons ---
    const SocialIcons = () => (
        <div className="flex justify-center md:justify-start gap-6 mt-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,15.6V7.8C2,4.6 4.6,2 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
            </a>
        </div>
    );

    // Page load and scroll animation effects
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 200);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        const currentRefs = sectionsRef.current;
        currentRefs.forEach((section) => { if (section) observer.observe(section); });
        return () => {
            clearTimeout(timer);
            currentRefs.forEach((section) => { if (section) observer.unobserve(section); });
        };
    }, []);

    const addToRefs = (el) => { if (el && !sectionsRef.current.includes(el)) { sectionsRef.current.push(el); } };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Sending...');
        setTimeout(() => {
            setFormStatus('Message sent successfully!');
            setTimeout(() => setFormStatus(''), 3000);
            e.target.reset();
        }, 1500);
    };

    const skills = ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "Python", "Cyber Security"];
    
    return (
        <div className={`font-sans bg-[#121212] text-[#E0E0E0] antialiased transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                html { scroll-behavior: smooth; }
                body { font-family: 'Poppins', sans-serif; }
                .accent-color { color: #f94f28; }
                .accent-bg { background-color: #f94f28; }
                .card { background-color: #1e1e1e; }
                .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .image-glow { box-shadow: 0 0 80px -10px #f94f28; }
                .spinner { border-color: transparent; border-top-color: #f94f28; }
            `}</style>

            <div className="relative z-10">
                <header className="absolute top-0 left-0 right-0 z-50">
                    <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                        <a href="#" className="text-2xl font-bold">Abhijith</a>
                        <div className="space-x-8 hidden md:flex">
                            <a href="#home" className="hover:text-[#f94f28] transition-colors">Home</a>
                            <a href="#about" className="hover:text-[#f94f28] transition-colors">About</a>
                            <a href="#projects" className="hover:text-[#f94f28] transition-colors">Projects</a>
                            <a href="#contact" className="hover:text-[#f94f28] transition-colors">Contact</a>
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-6">
                   <section id="home" className="min-h-screen flex justify-center items-center pt-24 md:pt-0">
  <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
    
    {/* Hero Image with Halo */}
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
      <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#f94f28] to-[#ff8c70] opacity-40 blur-3xl z-0"></div>
      <img
        src={Hero}
        alt="Jane Doe"
        className="rounded-full w-full h-full object-cover relative z-10 image-glow"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/320/1e1e1e/E0E0E0?text=Error";
        }}
      />
    </div>

    {/* Text Section */}
    <div>
      <p className="text-xl md:text-2xl mb-2">Hello,</p>
      <h1 className="text-4xl md:text-6xl font-bold mb-2">I'm ABhijith PN</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        <span className="accent-color">Full Stack Web Developer</span>
      </h2>

      {/* Buttons */}
      <div className="flex justify-center md:justify-start gap-4">
        <a
          href="#projects"
          className="accent-bg text-white font-semibold py-3 px-6 rounded-md hover:opacity-90"
        >
          Get a project
        </a>
        <a
          href="#"
          className="bg-[#1e1e1e] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#2a2a2a]"
        >
          My resume
        </a>
      </div>

      {/* Social Icons */}
      <SocialIcons />
    </div>
  </div>
</section>

                    
                    <section className="py-12 md:py-20">
                         <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-400">
                            {skills.map(skill => (<span key={skill} className="text-lg font-medium">{skill}</span>))}
                        </div>
                    </section>

                    <section id="about" ref={addToRefs} className="py-20 opacity-0">
                        <div className="grid md:grid-cols-5 gap-12 items-center">
                            <div className="md:col-span-3">
                                <h2 className="text-4xl font-bold mb-4">About Me</h2>
                                <div className="w-20 h-1 accent-bg mb-8"></div>
                                <p className="text-lg text-gray-400 leading-relaxed">I am a detail-oriented web developer and a computer science student specializing in cybersecurity. My passion lies in creating clean, efficient code and architecting secure systems. I enjoy the challenge of identifying vulnerabilities and implementing robust defenses, ensuring that applications are not only functional but also resilient.</p>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div className="card p-6 rounded-lg"><p className="text-4xl font-bold accent-color">120+</p><p className="text-gray-400">Completed Projects</p></div>
                                <div className="card p-6 rounded-lg"><p className="text-4xl font-bold accent-color">95%</p><p className="text-gray-400">Client Satisfaction</p></div>
                                <div className="card p-6 rounded-lg"><p className="text-4xl font-bold accent-color">10+</p><p className="text-gray-400">Years of Experience</p></div>
                            </div>
                        </div>
                    </section>

                    <section id="projects" ref={addToRefs} className="py-20 opacity-0">
                         <div className="text-center">
                            <h2 className="text-4xl font-bold mb-4">My Portfolio</h2>
                            <div className="w-20 h-1 accent-bg mx-auto mb-12"></div>
                         </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <div key={index} className="card rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                                    <div className="overflow-hidden relative">
                                        <img src={project.image} alt={project.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"/>
                                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                             <a href="#" className="accent-bg text-white font-semibold py-2 px-5 rounded-md">View Project</a>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.map(tag => <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>)}
                                        </div>
                                        <p className="text-gray-400 text-sm flex-grow">{project.description}</p>
                                        <button onClick={() => generateProjectDescription(index)} disabled={project.isGenerating} className="mt-4 text-sm accent-bg text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                            {project.isGenerating ? (
                                                <>
                                                    <div className="spinner w-4 h-4 border-2 rounded-full animate-spin mr-2"></div>
                                                    Generating...
                                                </>
                                            ) : (
                                                "✨ Generate Description"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="contact" ref={addToRefs} className="py-20 opacity-0">
                        <div className="max-w-3xl mx-auto">
                             <div className="text-center">
                                <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
                                <div className="w-20 h-1 accent-bg mx-auto mb-12"></div>
                             </div>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <input type="text" name="name" placeholder="Your Name" required className="w-full bg-[#1e1e1e] p-4 rounded-md border border-gray-700 focus:outline-none focus:border-[#f94f28] transition-colors"/>
                                <input type="email" name="email" placeholder="Your Email" required className="w-full bg-[#1e1e1e] p-4 rounded-md border border-gray-700 focus:outline-none focus:border-[#f94f28] transition-colors"/>
                                <textarea name="message" placeholder="Your Message" rows="5" required className="w-full bg-[#1e1e1e] p-4 rounded-md border border-gray-700 focus:outline-none focus:border-[#f94f28] transition-colors"></textarea>
                                <div className="text-center">
                                    <button type="submit" className="accent-bg text-white font-semibold py-3 px-8 rounded-md hover:opacity-90 transition-opacity text-lg">Send Message</button>
                                </div>
                            </form>
                            {formStatus && <p className="text-center mt-4 text-green-400">{formStatus}</p>}
                        </div>
                    </section>
                </main>

                <footer className="py-8 border-t border-gray-800 mt-20">
                    <div className="container mx-auto px-6 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Jane Doe. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
