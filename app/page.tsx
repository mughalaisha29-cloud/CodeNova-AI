'use client';

import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  X,
  BrainCircuit,
  Code,
  Send,
  Plus,
  Mic,
  Paperclip,
  Image as ImageIcon,
  File,
  ArrowLeft,
  ChevronRight,
  Info,
  BookOpen
} from 'lucide-react';

type MainTab = 'home' | 'languages' | 'about' | 'contact' | 'signup' | 'login' | 'workspace' | 'forgot-password';
type LevelName = 'low' | 'beginner' | 'intermediate';

type View =
  | 'dashboard'
  | 'languages-hub'
  | 'Html'
  | 'CSS'
  | 'Java Script'
  | 'Python'
  | 'PHP'
  | 'SQL'
  | 'C'
  | 'C++'
  | 'C#'
  | '.NET'
  | 'Java'
  | 'ALGOL'
  | 'COBOL'
  | 'Fortran'
  | 'Visual Basic'
  | 'Smalltalk'
  | 'Ruby'
  | 'Perl'
  | 'Pascal'
  | 'Lisp'
  | 'BASIC'
  | 'APL'
  | 'VBScript'
  | 'PowerShell'
  | 'AutoIt'
  | 'R'
  | 'XML'
  | 'XHTML'
  | 'Scala'
  | 'Node.js'
  | 'Machine-Learning'
  | 'LLM'
  | 'ai-studio'
  | 'settings';

const nav: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'languages-hub', label: 'Languages & Programs Hub', icon: BookOpen },
  { id: 'Html', label: 'HTML', icon: FileText },
  { id: 'CSS', label: 'CSS', icon: FileText },
  { id: 'Java Script', label: 'Java Script', icon: FileText },
  { id: 'Python', label: 'Python', icon: FileText },
  { id: 'PHP', label: 'PHP', icon: FileText },
  { id: 'SQL', label: 'SQL', icon: FileText },
  { id: 'Node.js', label: 'Node.js', icon: FileText },
  { id: 'Ruby', label: 'Ruby', icon: FileText },
  { id: 'Machine-Learning', label: 'Machine-Learning', icon: BrainCircuit },
  { id: 'LLM', label: 'LLM', icon: BrainCircuit },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface ProgramDetail {
  id: number;
  name: string;
  shortUse: string;
  fullDetailParagraph: string;
}

interface LanguageSubCategory {
  id: string;
  name: string;
  description: string;
  programs: ProgramDetail[];
}

interface LanguageCategory {
  id: string;
  title: string;
  description: string;
  languages: LanguageSubCategory[];
}

interface LevelProgram {
  id: number;
  title: string;
  usage: string;
  code: string;
  output: string;
}

interface LanguageLevels {
  school: LevelProgram[];
  college: LevelProgram[];
  university: LevelProgram[];
}

const generateHighDemandPrograms = (langName: string): ProgramDetail[] => {
  const topics = [
    'Memory Allocation & Pointer Operations',
    'Multi-threaded Concurrency Execution',
    'Custom Data Structure - Binary Search Tree',
    'Socket Network Communication & Server Binding',
    'File I/O Stream Encryption & Decryption',
    'Asynchronous Event Loop Handling',
    'JSON / Database Serialization Parser',
    'REST API Endpoint Handler',
    'AES-256 Bit Security Cipher Implementation',
    'Matrix Multiplication & Parallel Processing',
    'Graph Shortest Path Algorithm (Dijkstra)',
    'Real-time Chat Protocol Engine',
    'HTTP Request & Header Processor',
    'Automated Cache Management System',
    'Heap Garbage Collection Simulation',
    'Process Scheduler & Task Queue',
    'Regular Expression Parsing Engine',
    'Lexical Tokenizer & Syntax Checker',
    'SQL Query Result Set Formatter',
    'Image Pixel Processing Matrix',
    'High Performance Sorting (QuickSort)',
    'Dynamic Array Resizing Architecture',
    'Stack OverFlow Protection Layer',
    'Custom B-Tree Database Indexer',
    'Distributed Node Message Passing',
    'System Signal Interrupt Listener',
    'Command Line Argument Parser',
    'Binary File Compressor (Huffman)',
    'Thread-safe Mutex Synchronization',
    'AI Model Matrix Tensor Multiplier'
  ];

  return topics.map((topic, idx) => ({
    id: idx + 1,
    name: `${langName} ${topic}`,
    shortUse: `Used in professional ${langName} enterprise systems for ${topic.toLowerCase()}.`,
    fullDetailParagraph: `This high-demand ${langName} program provides production-level infrastructure for ${topic.toLowerCase()}. It is optimized for low-overhead execution, enterprise memory safety, and seamless integration into large software systems.`
  }));
};

const CATEGORIES_DATA: LanguageCategory[] = [
  {
    id: 'compiled',
    title: '1. Compiled Languages',
    description: 'A compiled language is a programming language in which we use a compiler to compile and execute our code. The compilers are generally translators that generate machine level code from our written source code.',
    languages: [
      { id: 'c', name: 'C Language', description: 'Procedural systems programming language.', programs: generateHighDemandPrograms('C') },
      { id: 'cpp', name: 'C++', description: 'High performance Object Oriented language.', programs: generateHighDemandPrograms('C++') },
      { id: 'csharp', name: 'C# (.NET)', description: 'Modern object-oriented language by Microsoft.', programs: generateHighDemandPrograms('C#') },
      { id: 'java', name: 'Java', description: 'Enterprise platform-independent runtime language.', programs: generateHighDemandPrograms('Java') },
      { id: 'algol', name: 'ALGOL', description: 'Algorithmic computer language foundation.', programs: generateHighDemandPrograms('ALGOL') },
      { id: 'cobol', name: 'Cobol', description: 'Business & finance system language.', programs: generateHighDemandPrograms('Cobol') },
      { id: 'fortran', name: 'Fortran', description: 'Numeric and scientific computation language.', programs: generateHighDemandPrograms('Fortran') },
      { id: 'vb', name: 'Visual Basic', description: 'Event-driven software development language.', programs: generateHighDemandPrograms('Visual Basic') },
      { id: 'smalltalk', name: 'Smalltalk', description: 'Pure reflective object-oriented language.', programs: generateHighDemandPrograms('Smalltalk') }
    ]
  },
  {
    id: 'interpreted',
    title: '2. Interpreted Languages',
    description: 'An interpreted language is a programming language in which without compiling a program into machine-language instructions we can execute instructions directly and freely line by line.',
    languages: [
      { id: 'python', name: 'Python', description: 'High-level interpreted data science & scripting language.', programs: generateHighDemandPrograms('Python') },
      { id: 'ruby', name: 'Ruby', description: 'Dynamic scripting language focused on simplicity.', programs: generateHighDemandPrograms('Ruby') },
      { id: 'perl', name: 'Perl', description: 'Text processing and system admin scripting language.', programs: generateHighDemandPrograms('Perl') },
      { id: 'pascal', name: 'Pascal', description: 'Structured teaching and application language.', programs: generateHighDemandPrograms('Pascal') },
      { id: 'lisp', name: 'Lisp', description: 'Symbolic data processing functional language.', programs: generateHighDemandPrograms('Lisp') },
      { id: 'basic', name: 'BASIC', description: 'General-purpose beginner programming language.', programs: generateHighDemandPrograms('BASIC') },
      { id: 'apl', name: 'APL', description: 'Array-oriented mathematical notation language.', programs: generateHighDemandPrograms('APL') }
    ]
  },
  {
    id: 'scripting',
    title: '3. Scripting Languages',
    description: 'Scripting languages are programming languages that control an application. Scripts can be executed independently over any other application for automation.',
    languages: [
      { id: 'php', name: 'PHP', description: 'Server-side web scripting language.', programs: generateHighDemandPrograms('PHP') },
      { id: 'vbscript', name: 'VBScript', description: 'Active scripting language developed by Microsoft.', programs: generateHighDemandPrograms('VBScript') },
      { id: 'powershell', name: 'Windows PowerShell', description: 'Task automation and configuration management.', programs: generateHighDemandPrograms('PowerShell') },
      { id: 'autoit', name: 'AutoIt', description: 'Freeware scripting language for Windows GUI automation.', programs: generateHighDemandPrograms('AutoIt') },
      { id: 'r', name: 'R', description: 'Statistical computing and graphics language.', programs: generateHighDemandPrograms('R') }
    ]
  },
  {
    id: 'markup',
    title: '4. Markup Languages',
    description: 'A markup language is an artificial language used for annotating a document so that it is syntactically distinguishable from text to define visual presentation.',
    languages: [
      { id: 'html', name: 'HTML5', description: 'Standard markup language for documents designed to be displayed in a web browser.', programs: generateHighDemandPrograms('HTML5') },
      { id: 'xml', name: 'XML', description: 'Extensible Markup Language for storing and transporting data.', programs: generateHighDemandPrograms('XML') },
      { id: 'xhtml', name: 'XHTML', description: 'Strict XML-conforming version of HTML.', programs: generateHighDemandPrograms('XHTML') }
    ]
  },
  {
    id: 'oop',
    title: '5. Object-Oriented Languages',
    description: 'Object-oriented programming (OOP) is based on the concept of "objects", binding related data and functions to structure software programs.',
    languages: [
      { id: 'scala', name: 'Scala', description: 'Combines object-oriented and functional programming.', programs: generateHighDemandPrograms('Scala') },
      { id: 'cpp_oop', name: 'C++', description: 'Object-oriented system engineering language.', programs: generateHighDemandPrograms('C++ OOP') },
      { id: 'java_oop', name: 'Java', description: 'Class-based object oriented platform.', programs: generateHighDemandPrograms('Java OOP') }
    ]
  }
];

const generateLevelPrograms = (langPrefix: string, levelName: string): LevelProgram[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `${levelName} Program #${i + 1}`,
    usage: `Standard ${levelName.toLowerCase()} use case for ${langPrefix.toLowerCase()} exercise #${i + 1}.`,
    code: `<div class="program-${i + 1}">\n  <h3>${langPrefix} ${levelName} Sample #${i + 1}</h3>\n</div>`,
    output: `<div style="padding:10px; background:#1e293b; border:1px solid #334155; border-radius:6px; color:#38bdf8; font-family:monospace; font-size:12.5px;"><strong>[${levelName}]</strong> Executed ${langPrefix} Program #${i + 1} successfully!</div>`
  }));
};

const multiLevelData: Record<string, LanguageLevels> = {
  Html: {
    school: generateLevelPrograms('HTML', 'School Level (Low)'),
    college: generateLevelPrograms('HTML', 'College Level (Beginning)'),
    university: generateLevelPrograms('HTML', 'University Level (Advanced)')
  },
  CSS: {
    school: generateLevelPrograms('CSS', 'School Level (Low)'),
    college: generateLevelPrograms('CSS', 'College Level (Beginning)'),
    university: generateLevelPrograms('CSS', 'University Level (Advanced)')
  },
  'Java Script': {
    school: generateLevelPrograms('JS', 'School Level (Low)'),
    college: generateLevelPrograms('JS', 'College Level (Beginning)'),
    university: generateLevelPrograms('JS', 'University Level (Advanced)')
  },
  Python: {
    school: generateLevelPrograms('Python', 'School Level (Low)'),
    college: generateLevelPrograms('Python', 'College Level (Beginning)'),
    university: generateLevelPrograms('Python', 'University Level (Advanced)')
  },
  PHP: {
    school: generateLevelPrograms('PHP', 'School Level (Low)'),
    college: generateLevelPrograms('PHP', 'College Level (Beginning)'),
    university: generateLevelPrograms('PHP', 'University Level (Advanced)')
  },
  SQL: {
    school: generateLevelPrograms('SQL', 'School Level (Low)'),
    college: generateLevelPrograms('SQL', 'College Level (Beginning)'),
    university: generateLevelPrograms('SQL', 'University Level (Advanced)')
  }
};

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mainTab, setMainTab] = useState<MainTab>('home');
  const [view, setView] = useState<View>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);

  const [forgotEmail, setForgotEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');

  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [notice, setNotice] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<LanguageCategory | null>(null);
  const [selectedSubLanguage, setSelectedSubLanguage] = useState<LanguageSubCategory | null>(null);
  const [activeDetailProgram, setActiveDetailProgram] = useState<ProgramDetail | null>(null);

  const [activeLevelTab, setActiveLevelTab] = useState<'school' | 'college' | 'university'>('school');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProgId, setActiveProgId] = useState<number | null>(null);
  const [ranOutputs, setRanOutputs] = useState<Record<string, boolean>>({});

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; fileAttachment?: string }>>([
    { sender: 'ai', text: 'Hello Aisha! Welcome to Learnova AI Program Engine. How can I help you build or debug your code today?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('learnova_session');
    if (savedSession === 'true') {
      setIsLoggedIn(true);
      setMainTab('workspace');
    }
  }, []);

  const handlePublicNav = (tab: MainTab) => {
    setMainTab(tab);
    setNotice('');
    setShowResetForm(false);
    setSelectedCategory(null);
    setSelectedSubLanguage(null);
  };

  const performWorkspaceLogin = (userName: string) => {
    localStorage.setItem('learnova_session', 'true');
    localStorage.setItem('learnova_registered', 'true');
    setIsLoggedIn(true);
    setMainTab('workspace');
    setSignupName(userName);
    setNotice('');
  };

  function handleSignUpSubmit(e: FormEvent) {
    e.preventDefault();
    setNotice('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim() || !signupConfirmPassword.trim()) {
      setNotice('error:Please complete your form before proceeding.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setNotice('error:Passwords do not match.');
      return;
    }

    localStorage.setItem('learnova_registered', 'true');
    setNotice('success:Account created successfully! Kindly Log In now.');

    setTimeout(() => {
      handlePublicNav('login');
      setNotice('info:Account created! You can now log in.');
    }, 2000);
  }

  function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    setNotice('');

    const isRegistered = localStorage.getItem('learnova_registered');
    if (!isRegistered) {
      setNotice('error:Account not found. Kindly create account first.');
      return;
    }

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setNotice('error:Please complete your form before proceeding.');
      return;
    }

    if (loginPassword !== signupPassword && loginPassword !== 'aisha123') {
      const nextAttempts = loginAttempts + 1;
      setLoginAttempts(nextAttempts);

      if (nextAttempts >= 4) {
        setNotice('error:Too many incorrect attempts. Kindly try again after 12 hours.');
      } else {
        setNotice(`error:Wrong password! Attempt ${nextAttempts} of 3.`);
      }
      return;
    }

    performWorkspaceLogin(signupName || 'Aisha');
  }

  function handleForgotEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setNotice('');
    if (!forgotEmail.trim()) {
      setNotice('error:Please enter your Gmail address.');
      return;
    }
    setNotice('info:Gmail verified! Redirecting to reset password...');
    setTimeout(() => {
      setNotice('');
      setShowResetForm(true);
    }, 1500);
  }

  function handleResetPasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setNotice('');
    if (!resetPassword.trim() || !resetConfirmPassword.trim()) {
      setNotice('error:Please complete your form.');
      return;
    }
    if (resetPassword !== resetConfirmPassword) {
      setNotice('error:Passwords do not match.');
      return;
    }

    setNotice('success:Password updated successfully! Kindly login again.');
    setShowResetForm(false);
    setTimeout(() => {
      handlePublicNav('login');
    }, 2000);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('learnova_session');
    handlePublicNav('home');
  };

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPlusMenuOpen(false);
    }
  }

  function handleSendMessage(e?: FormEvent) {
    e?.preventDefault();
    if (!inputMsg.trim() && !selectedFile) return;

    const attachedName = selectedFile ? selectedFile.name : undefined;
    const userMessage = inputMsg;

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMessage || `Attachment: ${attachedName}`, fileAttachment: attachedName }
    ]);

    setInputMsg('');
    setSelectedFile(null);

    setTimeout(() => {
      const aiReply = `✨ **Learnova AI Response:**\nI have analyzed your request regarding ${selectedFile ? selectedFile.name : 'your code'}. Everything looks clean and structured!`;
      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 700);
  }

  const renderNotice = () => {
    if (!notice) return null;
    const isError = notice.startsWith('error:');
    const isSuccess = notice.startsWith('success:');
    const msg = notice.replace(/^(error:|success:|info:)/, '');
    let color = '#38bdf8';
    if (isError) color = '#ef4444';
    if (isSuccess) color = '#10b981';

    return (
      <div style={{ color, fontSize: '12.5px', marginBottom: '15px', textAlign: 'center', lineHeight: '1.4' }}>
        {msg}
      </div>
    );
  };

  const renderLanguagesSection = () => {
    if (selectedCategory && selectedSubLanguage) {
      return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
          <button
            onClick={() => setSelectedSubLanguage(null)}
            style={{ background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '25px' }}
          >
            <ArrowLeft size={16} /> Back to {selectedCategory.title}
          </button>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '18px', padding: '30px', marginBottom: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#ec4899', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '6px' }}>LANGUAGE MODULE</div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>{selectedSubLanguage.name} Programs (30 High Demand)</h1>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>{selectedSubLanguage.description}</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {selectedSubLanguage.programs.map((prog) => (
              <div key={prog.id} style={{ width: '320px', background: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>{prog.name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5', marginBottom: '15px' }}>{prog.shortUse}</p>
                </div>

                <button
                  onClick={() => setActiveDetailProgram(prog)}
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #ec4899)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Info size={15} /> View Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedCategory) {
      return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{ background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '25px' }}
          >
            <ArrowLeft size={16} /> Back to All Categories
          </button>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '35px', marginBottom: '35px', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}>
            <h1 style={{ fontSize: '34px', fontWeight: 'bold', color: '#fff', marginBottom: '15px' }}>{selectedCategory.title}</h1>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.8' }}>{selectedCategory.description}</p>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>Languages Included in this Category:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {selectedCategory.languages.map((lang) => (
              <div
                key={lang.id}
                onClick={() => setSelectedSubLanguage(lang)}
                style={{ width: '320px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '25px', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{lang.name}</h3>
                    <ChevronRight size={18} color="#ec4899" />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: '1.5' }}>{lang.description}</p>
                </div>
                <div style={{ marginTop: '20px', fontSize: '12.5px', color: '#38bdf8', fontWeight: 600 }}>
                  Explore 30 High Demand Programs →
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Programming Language Categories</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>Select a programming category to explore detailed descriptions and high-demand program lists.</p>
        </div>

        {/* 2-2-1 LAYOUT WITH LARGE CARDS MATCHING PICTURE */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          {CATEGORIES_DATA.map((cat, index) => {
            const isLastCard = index === 4;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  width: isLastCard ? '520px' : '48%',
                  minWidth: '350px',
                  height: '210px',
                  background: '#1e293b',
                  border: '1.5px solid #334155',
                  borderRadius: '20px',
                  padding: '28px 32px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>{cat.title}</h2>
                  <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{cat.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '15px' }}>
                  <span style={{ fontSize: '13px', color: '#ec4899', fontWeight: 'bold' }}>{cat.languages.length} Languages Available</span>
                  <span style={{ fontSize: '13.5px', color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>Open Category <ChevronRight size={16} /></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMultiLevelPrograms = (langKey: string, langTitle: string) => {
    const langData = multiLevelData[langKey] || multiLevelData['Html'];
    const currentList = langData[activeLevelTab];

    return (
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#ec4899', fontWeight: 'bold' }}>CURRICULUM LEVEL SYSTEM</div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff' }}>{langTitle} Programs (50 per Level)</h1>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Select academic level to explore 50 complete exercises with live output.</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', background: '#1e293b', padding: '6px', borderRadius: '12px', width: 'fit-content' }}>
            <button
              onClick={() => { setActiveLevelTab('school'); setActiveProgId(null); }}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: activeLevelTab === 'school' ? '#4f46e5' : 'transparent', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              School Level (Low)
            </button>
            <button
              onClick={() => { setActiveLevelTab('college'); setActiveProgId(null); }}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: activeLevelTab === 'college' ? '#4f46e5' : 'transparent', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              College Level (Beginning)
            </button>
            <button
              onClick={() => { setActiveLevelTab('university'); setActiveProgId(null); }}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: activeLevelTab === 'university' ? '#4f46e5' : 'transparent', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              University Level (Advanced)
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '15px' }}>
          {currentList.map((prog) => {
            const uniqueKey = `${activeLevelTab}-${prog.id}`;
            return (
              <div key={prog.id} style={{ border: '1px solid #334155', borderRadius: '14px', padding: '18px', background: '#1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: 600, color: '#f8fafc' }}>{prog.title}</h3>
                    <button
                      onClick={() => setActiveProgId(activeProgId === prog.id ? null : prog.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#4f46e5', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, flexShrink: 0 }}
                    >
                      <Code size={13} /> {activeProgId === prog.id ? 'Hide' : 'Run'}
                    </button>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '12.5px', marginBottom: '10px' }}><b>Usage:</b> {prog.usage}</p>
                </div>
                {activeProgId === prog.id && (
                  <div style={{ marginTop: '10px', background: '#0f172a', borderRadius: '8px', padding: '12px' }}>
                    <pre style={{ margin: 0, overflowX: 'auto', fontSize: '12px', fontFamily: 'monospace', padding: '8px', background: '#1e293b', borderRadius: '6px' }}><code>{prog.code}</code></pre>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <button
                        onClick={() => setRanOutputs({ ...ranOutputs, [uniqueKey]: true })}
                        style={{ background: '#10b981', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                      >
                        Run Code
                      </button>
                    </div>
                    {ranOutputs[uniqueKey] && (
                      <div style={{ marginTop: '10px', border: '1px solid #334155', borderRadius: '6px', background: '#fff', color: '#000', padding: '10px' }}>
                        <div dangerouslySetInnerHTML={{ __html: prog.output }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className={`app ${theme}`} style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {activeDetailProgram && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '580px', background: '#0f172a', border: '1.5px solid #334155', borderRadius: '22px', padding: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.9)', position: 'relative' }}>
            <button
              onClick={() => setActiveDetailProgram(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: '#1e293b', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: '12px', color: '#ec4899', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>PROGRAM SPECIFICATION DETAIL</div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '15px' }}>{activeDetailProgram.name}</h2>
            
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '18px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              <p style={{ margin: 0 }}>{activeDetailProgram.fullDetailParagraph}</p>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '16px', color: '#38bdf8', fontSize: '13px', lineHeight: '1.6' }}>
              <strong>💡 Execution Notice:</strong> You can test and compile this program code using our <strong>Learnova AI Robot Engine</strong> or inside your workspace. Just submit your logic query to the AI Robot and it will generate and run the live verified output for you!
            </div>
          </div>
        </div>
      )}

      {/* PUBLIC NAVBAR */}
      {!isLoggedIn && (
        <header style={{ height: '70px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', background: 'rgba(9, 13, 22, 0.95)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => handlePublicNav('home')}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)', overflow: 'hidden' }}>
              <img src="/logo.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Learnova AI" />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Code<span style={{ color: '#ec4899' }}>Nova</span></span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <button onClick={() => handlePublicNav('home')} style={{ background: 'none', border: 'none', color: mainTab === 'home' ? '#ec4899' : '#cbd5e1', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>Home</button>
            <button onClick={() => handlePublicNav('languages')} style={{ background: 'none', border: 'none', color: mainTab === 'languages' ? '#ec4899' : '#cbd5e1', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>Programming Languages</button>
            <button onClick={() => handlePublicNav('about')} style={{ background: 'none', border: 'none', color: mainTab === 'about' ? '#ec4899' : '#cbd5e1', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>About Us</button>
            <button onClick={() => handlePublicNav('contact')} style={{ background: 'none', border: 'none', color: mainTab === 'contact' ? '#ec4899' : '#cbd5e1', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>Contact Us</button>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => handlePublicNav('login')} style={{ background: 'transparent', border: '1px solid #334155', color: '#fff', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Log In</button>
            <button onClick={() => handlePublicNav('signup')} style={{ background: 'linear-gradient(135deg, #ec4899, #4f46e5)', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)' }}>Sign Up</button>
          </div>
        </header>
      )}

      {/* BODY CONTENT WRAPPER */}
      <div style={{ flex: 1 }}>
        {!isLoggedIn && mainTab === 'home' && (
          <div style={{ 
            width: '100%', 
            minHeight: '85vh', 
            position: 'relative',
            overflow: 'hidden',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center', 
            padding: '40px 20px'
          }}>
            {/* Background Video Layer */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Dark Overlay Layer for Original Colors & Contrast */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(rgba(9, 13, 22, 0.65), rgba(9, 13, 22, 0.85))',
              zIndex: 1
            }} />

            {/* Hero Text & Button Content */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '850px' }}>
              <h1 style={{ 
                fontSize: 'clamp(32px, 6vw, 56px)', 
                fontWeight: '900', 
                color: '#ffffff', 
                textShadow: '0 10px 30px rgba(0,0,0,0.8)', 
                marginBottom: '25px',
                lineHeight: '1.2'
              }}>
                Master Programming & Debug Real Code
              </h1>
              
              <button 
                onClick={() => handlePublicNav('signup')} 
                style={{ 
                  background: 'linear-gradient(135deg, #ec4899, #38bdf8)', 
                  border: 'none', 
                  color: '#fff', 
                  padding: '16px 42px', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold', 
                  fontSize: '17px', 
                  boxShadow: '0 10px 30px rgba(236, 72, 153, 0.6)' 
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {!isLoggedIn && mainTab === 'signup' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)', padding: '30px 20px' }}>
            <div style={{ width: '420px', background: '#0f172a', padding: '35px 30px', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 20px 45px rgba(0,0,0,0.6)' }}>
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>Get Started</h2>
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>Create free account to access coding suite.</p>
              </div>
              
              <form onSubmit={handleSignUpSubmit}>
                <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="Full Name" style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '12px' }} />
                <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="Gmail Address" style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '12px' }} />
                <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '12px' }} />
                <input type="password" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} placeholder="Confirm Password" style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '15px' }} />
                
                {renderNotice()}

                <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #ec4899, #4f46e5)', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Register & Continue</button>
              </form>
            </div>
          </div>
        )}

        {!isLoggedIn && mainTab === 'login' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)', padding: '30px 20px' }}>
            <div style={{ width: '380px', background: '#0f172a', padding: '35px', borderRadius: '20px', border: '1px solid #1e293b', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>Welcome Back</h2>
              
              <form onSubmit={handleLoginSubmit}>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Gmail Address" style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '12px' }} />
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" disabled={loginAttempts >= 4} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '10px', opacity: loginAttempts >= 4 ? 0.5 : 1 }} />
                
                <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                  <button type="button" onClick={() => handlePublicNav('forgot-password')} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '12px' }}>Forgot Password?</button>
                </div>

                {renderNotice()}

                <button type="submit" disabled={loginAttempts >= 4} style={{ width: '100%', background: loginAttempts >= 4 ? '#334155' : '#4f46e5', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: loginAttempts >= 4 ? 'not-allowed' : 'pointer', fontSize: '14px' }}>{loginAttempts >= 4 ? 'Locked Out' : 'Log In'}</button>
              </form>
            </div>
          </div>
        )}

        {!isLoggedIn && mainTab === 'forgot-password' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)', padding: '20px' }}>
            <div style={{ width: '380px', background: '#0f172a', padding: '35px', borderRadius: '20px', border: '1px solid #1e293b', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}>
              {!showResetForm ? (
                <form onSubmit={handleForgotEmailSubmit}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Identify Gmail</h2>
                    <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>Enter your Gmail to verify your account.</p>
                    <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="Gmail Address @" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '15px' }} />
                    {renderNotice()}
                    <button type="submit" style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Verify Gmail ID</button>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordSubmit}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>Reset Password</h2>
                    <input type="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} placeholder="New Password" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '12px' }} />
                    <input type="password" value={resetConfirmPassword} onChange={(e) => setResetConfirmPassword(e.target.value)} placeholder="Confirm New Password" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13.5px', marginBottom: '15px' }} />
                    {renderNotice()}
                    <button type="submit" style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Update Password</button>
                </form>
              )}
            </div>
          </div>
        )}

               {!isLoggedIn && mainTab === 'languages' && renderLanguagesSection()}

        {!isLoggedIn && mainTab === 'about' && (
          <section
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '50px 24px 60px',
              maxWidth: '1200px',
              margin: '0 auto',
              color: '#cbd5e1',
              lineHeight: '1.8',
            }}
          >
            <h1
              style={{
                textAlign: 'center',
                color: '#ffffff',
                fontSize: 'clamp(30px, 4vw, 42px)',
                marginBottom: '12px',
              }}
            >
              About Us
            </h1>

            <p
              style={{
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '15px',
                maxWidth: '750px',
                margin: '0 auto 36px',
              }}
            >
              Discover our mission, learning environment, and commitment to
              making programming easier and more accessible for everyone.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '22px',
                alignItems: 'stretch',
              }}
            >
              {[
                {
                  title: '1. Introduction to Learnova AI',
                  text: 'Learnova AI is a virtual coding laboratory designed to make programming simple, visual, and interactive for students and developers. It provides a modern learning environment where users can explore programming concepts, practise coding, and improve their technical skills. The platform brings educational resources and AI assistance together to support learning. Beginners can explore fundamental concepts through explanations and practical examples. Users can learn at their own pace and gradually develop their abilities. Our goal is to make coding approachable, engaging, and enjoyable for learners with different levels of experience.',
                },
                {
                  title: '2. Our Mission',
                  text: 'The mission of Learnova AI is to make programming education accessible, effective, and enjoyable for learners. We believe students should have opportunities to develop digital skills and explore technology. Our platform focuses on simplifying difficult concepts through organised learning resources and practical coding exercises. We aim to make the first steps of programming less confusing for beginners. We encourage curiosity, creativity, and independent problem-solving. Through regular practice, learners can build confidence and improve their technical knowledge. Our mission is to support students as they work toward their educational and professional goals.',
                },
                {
                  title: '3. Interactive Coding Environment',
                  text: 'Learnova AI offers a digital learning environment where users can explore programming concepts and practise writing code. Instead of relying only on theoretical information, learners can study examples and experiment with different ideas. This practical approach helps students understand programming logic and syntax. Users can examine code, identify mistakes, and learn how solutions are structured. Breaking complex topics into smaller steps can make learning easier. The platform aims to provide a comfortable workspace for learners with different skill levels. With consistent practice, users can gradually turn their knowledge into practical programming skills.',
                },
                {
                  title: '4. AI-Powered Learning Assistance',
                  text: 'Artificial intelligence is an important part of the Learnova AI learning experience. The platform includes an AI assistance interface intended to help users explore programming questions and understand possible solutions. AI tools can explain code, clarify difficult concepts, and suggest ways to approach common programming problems when connected to a suitable AI service. Learners can use explanations to understand why a solution works instead of simply copying code. Different approaches can also help users expand their understanding. AI assistance is designed to support independent learning. Our goal is to make technical information easier to explore and understand.',
                },
                {
                  title: '5. Learning Programming Languages',
                  text: 'Learnova AI helps learners explore programming languages and web technologies. HTML, CSS, JavaScript, Python, and other languages provide useful foundations for creating websites, applications, and software solutions. Each technology has its own features and purposes. Learners can begin with fundamental concepts before exploring more advanced topics. Structured examples can help users understand syntax, logic, and common programming patterns. Regular practice makes it easier to recognise how different languages work. Our platform encourages students to explore technologies that match their interests and learning goals.',
                },
                {
                  title: '6. Building Problem-Solving Skills',
                  text: 'Problem-solving is one of the most important skills in programming. Developers must analyse a situation, identify a challenge, and organise a logical solution. Learnova AI encourages learners to approach problems step by step. Dividing a complicated task into smaller parts can make it easier to understand and solve. Students can practise examining code and comparing different approaches. Mistakes are a natural part of learning and can provide valuable lessons. With regular practice, learners can strengthen logical reasoning, analytical thinking, patience, and confidence. These abilities are useful in programming and many other areas of life.',
                },
                {
                  title: '7. Resources for Students and Developers',
                  text: 'Learnova AI brings programming information and learning resources together in one convenient environment. These resources can include explanations, code examples, exercises, and introductions to important technical concepts. Students can use them to review classroom topics and practise their skills. Developers can explore examples and refresh their understanding of different technologies. Well-organised material makes it easier to find information relevant to a learning goal. Practical examples help connect theoretical concepts with real programming tasks. Our aim is to encourage continuous improvement and make learning resources easier to explore.',
                },
                {
                  title: '8. Creativity and Innovation',
                  text: 'Creativity and innovation are important parts of programming. Coding allows learners to turn their ideas into websites, applications, interactive tools, and other digital projects. Learnova AI encourages students to explore possibilities and develop their own approaches to solving problems. Practical projects can help learners apply concepts they have studied. Experimenting with different solutions also builds confidence and curiosity. Rather than memorising syntax alone, learners can focus on understanding how technology can be used to create something useful. Every project offers an opportunity to practise, discover new ideas, and develop technical abilities.',
                },
                {
                  title: '9. Preparing for Future Opportunities',
                  text: 'Technology continues to influence education, business, communication, and everyday life. Learning programming can help students explore opportunities in web development, software engineering, application development, and other technology-related fields. Learnova AI aims to help learners establish a foundation in programming and digital skills. Practical exercises can encourage critical thinking, patience, and attention to detail. These abilities can be useful in academic and professional environments. Learners can continue developing their knowledge as technologies change. Our goal is to help users become more confident and better prepared to explore future learning and career opportunities.',
                },
                {
                  title: '10. Our Vision for the Future',
                  text: 'Our vision is to develop Learnova AI into an engaging virtual coding laboratory that supports programming education. We aim to bring educational resources, practical learning, and AI assistance together in one environment. We want beginners to feel comfortable taking their first steps while experienced learners continue exploring new concepts. Effective learning should encourage questions, creativity, experimentation, and practical understanding. We hope to keep improving the platform with useful learning features and organised resources. As technology evolves, we want to help learners adapt and grow. Ultimately, our goal is to encourage the next generation of programmers, innovators, and technology enthusiasts.',
                },
              ].map((item, index) => (
                <article
                  key={index}
                  style={{
                    boxSizing: 'border-box',
                    height: '100%',
                    padding: '24px',
                    background: 'linear-gradient(145deg, #111c32, #0f172a)',
                    border: '1px solid #263650',
                    borderRadius: '18px',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.18)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <h2
                    style={{
                      color: '#a5b4fc',
                      fontSize: '19px',
                      lineHeight: '1.5',
                      margin: '0 0 14px',
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      fontSize: '14px',
                      color: '#cbd5e1',
                      margin: 0,
                      lineHeight: '1.9',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {!isLoggedIn && mainTab === 'contact' && (
          <section
            style={{
              width: '100%',
              minHeight: 'calc(100vh - 140px)',
              boxSizing: 'border-box',
              padding: '40px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                boxSizing: 'border-box',
                background: '#0f172a',
                padding: 'clamp(28px, 5vw, 44px)',
                borderRadius: '22px',
                border: '1px solid #1e293b',
                boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#fff',
                  marginBottom: '8px',
                  textAlign: 'center',
                }}
              >
                Contact Us
              </h2>

              <form
               onSubmit={async (e) => {
  e.preventDefault();

  try {
    await emailjs.send(
      'service_gzpzmdk',
      'template_joolpyf',
      {
        name: 'Code Nova Website Visitor',
        from_email: contactEmail,
        message: contactMsg,
      },
      'i-JgCGC6i6gpGEAlE'
    );

    setNotice('success:Message sent successfully!');
    setContactEmail('');
    setContactMsg('');
  } catch (error) {
    console.error('Email sending failed:', error);
    setNotice('error:Message could not be sent. Please try again.');
  }
}}
              >
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Gmail Address @"
                  required
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontSize: '13.5px',
                    marginBottom: '15px',
                  }}
                />

                <textarea
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Type your query here..."
                  required
                  rows={4}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#fff',
                    fontSize: '13.5px',
                    resize: 'vertical',
                    marginBottom: '15px',
                  }}
                />

                {renderNotice()}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#4f46e5',
                    color: '#fff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Send Gmail Inquiry
                </button>
              </form>
            </div>
          </section>
        )}
        {/* LOGGED IN ADVANCED WORKSPACE */}
        {isLoggedIn && (
          <div className="workspace" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`} style={{ width: '260px', background: '#0b0f19', color: '#f8fafc', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>
              <div className="sidebar-head" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)', overflow: 'hidden' }}>
                    <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  learnova<span className="brand-ai" style={{ color: '#ec4899' }}>AI</span>
                </div>
                <button className="icon-btn mobile-only" onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={18} /></button>
              </div>
              <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 15px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {nav.map((n) => (
                  <button
                    key={n.id}
                    className={`nav-item ${view === n.id ? 'active' : ''}`}
                    onClick={() => { setView(n.id); setMenuOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', borderRadius: '6px', border: 'none', background: view === n.id ? '#4f46e5' : 'transparent', color: '#f8fafc', cursor: 'pointer', fontSize: '13px', fontWeight: 500, textAlign: 'left'
                    }}
                  >
                    <n.icon size={16} />
                    <span>{n.label}</span>
                  </button>
                ))}
              </nav>
              <div style={{ padding: '15px' }}>
                <button className="nav-item" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', borderRadius: '6px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '13px' }}>
                  <LogOut size={16} /><span>Log out</span>
                </button>
              </div>
            </aside>

            <section className="main-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0d14' }}>
              <header className="topbar" style={{ height: '60px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: '#0f172a' }}>
                <div className="top-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button className="icon-btn mobile-only" onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    <Menu size={19} />
                  </button>
                  <span style={{ fontSize: '13.5px', color: '#cbd5e1' }}>Workspace Activated - Welcome, {signupName || 'Aisha'}</span>
                </div>
                
                <div className="top-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button className="theme-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{ background: '#1e293b', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#fff' }}>
                    {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                    <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
                  </button>
                </div>
              </header>

              <div className="page-content" style={{ flex: 1, overflowY: 'auto', padding: '25px', position: 'relative' }}>
                {view === 'dashboard' && (
                  <div style={{ width: '100%' }}>
                    <div
                      className="welcome-banner"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(11, 15, 25, 0.75), rgba(15, 23, 42, 0.9)), url("/hero-bg.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: '#fff',
                        padding: '50px 45px',
                        borderRadius: '20px',
                        boxShadow: '0 20px 45px rgba(236, 72, 153, 0.2)',
                        width: '100%',
                        minHeight: '340px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: '1px solid rgba(236, 72, 153, 0.35)'
                      }}
                    >
                      <div style={{ fontSize: '13px', letterSpacing: '1.5px', color: '#ec4899', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>
                        ⚡ AI Coding Suite
                      </div>
                      <h1 style={{ fontSize: '40px', fontWeight: 'extrabold', marginBottom: '14px', lineHeight: '1.2' }}>
                        Welcome back, {signupName || 'Aisha'} <span style={{ color: '#38bdf8' }}>✦</span>
                      </h1>
                      <p style={{ color: '#cbd5e1', fontSize: '16px', maxWidth: '750px', lineHeight: '1.6', margin: 0 }}>
                        Explore complete multi-level academic programs across HTML, CSS, JavaScript, Python, PHP, and SQL. Click the floating AI Robot anytime to open full-page AI Code Generator!
                      </p>
                    </div>
                  </div>
                )}

                {view === 'languages-hub' && (
                  <div style={{ color: '#fff' }}>
                    <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>Languages & Programs Hub</h1>
                    <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Select any language from the left sidebar to view its School, College, and University level programs.</p>
                  </div>
                )}

                {view === 'ai-studio' && (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div 
                      style={{
                        width: '100%',
                        maxWidth: '920px',
                        height: '86vh',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1a0b2e 100%)',
                        color: '#f8fafc',
                        position: 'relative',
                        borderRadius: '24px',
                        border: '1.5px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ padding: '16px 22px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <button 
                            onClick={() => setView('dashboard')} 
                            style={{ 
                              background: '#1e293b', 
                              border: '1px solid #334155', 
                              color: '#fff', 
                              padding: '6px 14px', 
                              borderRadius: '8px', 
                              cursor: 'pointer', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px', 
                              fontSize: '13px',
                              fontWeight: 500
                            }}
                          >
                            <ArrowLeft size={16} /> Back
                          </button>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #38bdf8, #ec4899)',
                              padding: '2px',
                              boxShadow: '0 0 15px rgba(56, 189, 248, 0.6)',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img src="/ai-robot.png" alt="AI Robot" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <div>
                              <h1 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#fff' }}>
                                AI Program Engine & Code Generator
                              </h1>
                              <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Generate live programs & fix bugs instantly</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 25px 90px 25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {chatMessages.map((msg, idx) => (
                          <div key={idx} style={{
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '75%',
                            padding: '14px 18px',
                            borderRadius: '16px',
                            fontSize: '13.5px',
                            lineHeight: '1.5',
                            background: msg.sender === 'user' ? 'linear-gradient(135deg, #4f46e5, #9333ea)' : 'rgba(15, 23, 42, 0.85)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.1)'
                          }}>
                            {msg.fileAttachment && (
                              <div style={{ fontSize: '11px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '6px', marginBottom: '6px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                <Paperclip size={12} /> {msg.fileAttachment}
                              </div>
                            )}
                            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                          </div>
                        ))}
                      </div>

                      {selectedFile && (
                        <div style={{ padding: '6px 25px', background: '#0f172a', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#38bdf8', zIndex: 10 }}>
                          <Paperclip size={14} /> Selected File: <b>{selectedFile.name}</b>
                          <button onClick={() => setSelectedFile(null)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: 'auto' }}><X size={14} /></button>
                        </div>
                      )}

                      <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{ display: 'none' }} />

                      <form onSubmit={handleSendMessage} style={{ position: 'absolute', bottom: 15, left: 15, right: 15, padding: '12px 20px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', backdropFilter: 'blur(10px)', zIndex: 20 }}>
                        {plusMenuOpen && (
                          <div style={{ position: 'absolute', bottom: '70px', left: '20px', background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 30 }}>
                            <button type="button" onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', color: '#fff', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                              <File size={15} color="#38bdf8" /> Documents / PDF
                            </button>
                            <button type="button" onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', color: '#fff', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                              <ImageIcon size={15} color="#ec4899" /> Photos & Images
                            </button>
                          </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#090d16', padding: '8px 12px', borderRadius: '12px', border: '1px solid #334155' }}>
                          <button type="button" onClick={() => setPlusMenuOpen(!plusMenuOpen)} style={{ background: '#1e293b', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Plus size={18} />
                          </button>

                          <input
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                            placeholder="Ask AI Code Generator or paste code..."
                            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '13.5px' }}
                          />

                          <button type="button" onClick={() => setIsRecording(!isRecording)} style={{ background: isRecording ? '#ef4444' : 'transparent', border: 'none', color: '#cbd5e1', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                            <Mic size={18} color={isRecording ? '#fff' : '#cbd5e1'} />
                          </button>

                          <button type="submit" style={{ background: 'linear-gradient(135deg, #ec4899, #4f46e5)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                            <Send size={15} /> Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {view === 'Html' && renderMultiLevelPrograms('Html', 'HTML')}
                {view === 'CSS' && renderMultiLevelPrograms('CSS', 'CSS')}
                {view === 'Java Script' && renderMultiLevelPrograms('Java Script', 'JavaScript')}
                {view === 'Python' && renderMultiLevelPrograms('Python', 'Python')}
                {view === 'PHP' && renderMultiLevelPrograms('PHP', 'PHP')}
                {view === 'SQL' && renderMultiLevelPrograms('SQL', 'SQL')}

                {/* FLOATING AI ROBOT BUTTON IN WORKSPACE */}
                <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 1000 }}>
                  <button
                    onClick={() => setView('ai-studio')}
                    style={{
                      width: '85px',
                      height: '85px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ec4899, #38bdf8)',
                      border: '3px solid #fff',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 12px 35px rgba(236, 72, 153, 0.7)'
                    }}
                    title="Open AI Studio"
                  >
                    <img src="/ai-robot.png" alt="AI Robot" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {!isLoggedIn && ( 
        <footer style={{ background: '#0b0f19', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}> 
          <p>© 2026 Learnova AI. All rights reserved.</p> 
        </footer> 
      )}
    </main>
  );
}