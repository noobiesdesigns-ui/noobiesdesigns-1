
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, ArrowRight, Check, Loader2 } from 'lucide-react';
import { SectionProps } from '../../types';

export const Contact: React.FC<SectionProps> = ({ x }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'Logo Design'
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormStatus("sending");

  const data = new FormData();
  data.append("access_key", "196fb724-af47-4514-9dc6-ad391d764649");
  data.append("name", formData.name);
  data.append("email", formData.email);
  data.append("company", formData.company);
  data.append("service", formData.service);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data
  });

  const result = await res.json();

  if (result.success) {
    setFormStatus("success");
    setFormData({
      name: "",
      email: "",
      company: "",
      service: services[0],
    });
  } else {
    alert("Something went wrong. Please try again.");
    setFormStatus("idle");
  }
};



  const services = ['Logo Design', 'UX/UI Design', 'Branding Identity', 'Web & App Design', 'Other'];

  const socialLinks = [
    { Icon: Instagram, url: 'https://www.instagram.com/noobies_design/' },
    { Icon: Linkedin, url: '#' },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-white text-black relative overflow-hidden px-4 md:px-0">
      
      {/* Background Container for Split Text Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <motion.div 
            className="flex w-full items-center justify-center gap-4 md:gap-12"
            initial="hidden"
            whileInView="visible"
            // Trigger earlier: when 30% visible
            viewport={{ amount: 0.3 }}
         >
             <motion.h1 
                variants={{
                    hidden: { x: 0 },
                    visible: { x: -100 } 
                }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[9vw] md:text-[10vw] font-bold leading-none tracking-tighter opacity-10 md:opacity-100 whitespace-nowrap"
             >
                LETS
             </motion.h1>
             <motion.h1 
                variants={{
                    hidden: { x: 0 },
                    visible: { x: 100 } 
                }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[9vw] md:text-[10vw] font-bold leading-none tracking-tighter opacity-10 md:opacity-100 whitespace-nowrap"
             >
                TALK
             </motion.h1>
         </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {formStatus === 'success' ? (
             // FULL SECTION BLUR OVERLAY FOR SUCCESS
             <motion.div 
                key="success-overlay"
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
             >
                 <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 shadow-2xl rounded-2xl mx-4 max-w-sm w-full"
                 >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500">
                        <Check size={40} strokeWidth={3} />
                    </div>
                    <h2 className="font-display text-3xl font-bold mb-2">Message Sent!</h2>
                    <p className="text-gray-500 font-light mb-8">
                        Thanks for reaching out, {formData.name}. We'll get back to you shortly at {formData.email}.
                    </p>
                    <button 
                        onClick={() => setFormStatus('idle')}
                        className="text-sm font-mono uppercase tracking-widest text-black border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors"
                    >
                        Send Another
                    </button>
                 </motion.div>
             </motion.div>
        ) : (
            // FORM CONTAINER - Glassmorphism Effect
            <motion.div 
                key="form-container"
                className="z-20 w-full max-w-md md:max-w-xl min-h-[500px] flex flex-col items-center justify-center bg-white/30 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                 {/* Mobile Header */}
                 <h2 className="md:hidden font-display text-4xl font-bold mb-6 text-center">LETS TALK</h2>

                 <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="group">
                            <label className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 mb-1 md:mb-2 group-focus-within:text-accent transition-colors">Name</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full border-b border-gray-400 py-2 bg-transparent outline-none focus:border-black font-display text-lg md:text-xl transition-colors placeholder-gray-400"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 mb-1 md:mb-2 group-focus-within:text-accent transition-colors">Company</label>
                            <input 
                                type="text" 
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                className="w-full border-b border-gray-400 py-2 bg-transparent outline-none focus:border-black font-display text-lg md:text-xl transition-colors placeholder-gray-400"
                                placeholder="Acme Corp"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 mb-1 md:mb-2 group-focus-within:text-accent transition-colors">Email</label>
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full border-b border-gray-400 py-2 bg-transparent outline-none focus:border-black font-display text-lg md:text-xl transition-colors placeholder-gray-400"
                            placeholder="jane@example.com"
                        />
                    </div>

                    <div className="group">
                        <label className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 mb-1 md:mb-2 group-focus-within:text-accent transition-colors">Service Needed</label>
                        <div className="relative">
                            <select 
                                value={formData.service}
                                onChange={(e) => setFormData({...formData, service: e.target.value})}
                                className="w-full border-b border-gray-400 py-2 bg-transparent outline-none focus:border-black font-display text-lg md:text-xl appearance-none cursor-pointer hover:text-accent transition-colors"
                            >
                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <ArrowRight size={16} className="rotate-90" />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="mt-6 md:mt-8 w-full bg-black text-white py-3 md:py-4 font-display font-bold uppercase tracking-widest hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                    >
                        {formStatus === 'sending' ? (
                            <>
                                <Loader2 size={18} className="animate-spin" /> Sending...
                            </>
                        ) : (
                            <>
                                Send Request <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                 </form>

                 <div className="flex justify-center gap-8 mt-8 md:mt-12">
                    {socialLinks.map(({ Icon, url }, idx) => (
                        <a 
                            key={idx} 
                            href={url} 
                            target={url.startsWith('http') ? "_blank" : undefined}
                            rel={url.startsWith('http') ? "noopener noreferrer" : undefined}
                            className="text-gray-400 hover:scale-110 hover:text-black transition-all duration-300"
                        >
                            <Icon size={24} strokeWidth={1.5} />
                        </a>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
        
      <footer className="absolute bottom-8 right-8 text-right hidden md:block">
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-gray-400">
                &copy; 2025 Noobies Design
            </span>
      </footer>
    </section>
  );
};
