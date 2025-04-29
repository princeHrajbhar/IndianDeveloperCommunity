export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    social: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      dribbble?: string;
      kaggle?: string;
    };
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
  }
  
  export interface VisionMission {
    type: 'vision' | 'mission';
    title: string;
    description: string;
  }