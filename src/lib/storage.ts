
export const CP_STORAGE = {
  getUser: () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('cp_user');
    return user ? JSON.parse(user) : null;
  },
  saveUser: (user: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cp_user', JSON.stringify(user));
  },
  getSkills: () => {
    if (typeof window === 'undefined') return [];
    const skills = localStorage.getItem('cp_skills');
    return skills ? JSON.parse(skills) : [
      { id: 'html', name: 'HTML5', score: 85 },
      { id: 'css', name: 'CSS3', score: 78 },
      { id: 'js', name: 'JavaScript', score: 92 }
    ];
  },
  saveSkills: (skills: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cp_skills', JSON.stringify(skills));
  },
  getCertificates: () => {
    if (typeof window === 'undefined') return [];
    const certs = localStorage.getItem('cp_certs');
    return certs ? JSON.parse(certs) : [
      { id: '1', title: 'Full Stack Development', category: 'Engineering', date: '2023-12-15' },
      { id: '2', title: 'AI Foundations', category: 'Data Science', date: '2024-01-10' }
    ];
  },
  addCertificate: (cert: any) => {
    if (typeof window === 'undefined') return;
    const current = CP_STORAGE.getCertificates();
    const updated = [...current, cert];
    localStorage.setItem('cp_certs', JSON.stringify(updated));
  },
  removeCertificate: (id: string) => {
    if (typeof window === 'undefined') return;
    const current = CP_STORAGE.getCertificates();
    const updated = current.filter((c: any) => c.id !== id);
    localStorage.setItem('cp_certs', JSON.stringify(updated));
  },
  getProgress: () => {
    if (typeof window === 'undefined') return { hours: 42, careerScore: 88, completedSkills: 12 };
    const prog = localStorage.getItem('cp_progress');
    return prog ? JSON.parse(prog) : { hours: 42, careerScore: 88, completedSkills: 12 };
  },
  saveQuizResult: (result: any) => {
    if (typeof window === 'undefined') return;
    const current = JSON.parse(localStorage.getItem('cp_quiz_results') || '[]');
    localStorage.setItem('cp_quiz_results', JSON.stringify([...current, result]));
  }
};
