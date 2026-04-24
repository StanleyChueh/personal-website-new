import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import YoutubeIcon from '../components/Icon/YoutubeIcon';
import heroImage from '../images/header-background.webp';
import {PortfolioItem, PortfolioGroup} from './dataDef';
import profilepic from '../images/test.png';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  SkillGroup,
  Social,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Stanley Chueh',
  description: "Example site built with Tim Baker's react resume template",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Stanley Chueh.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm currently a first-year master's student studying Electrical Engineering at <strong className="text-stone-100"><a href="https://www-en.ntut.edu.tw/" target="_blank" rel="noopener noreferrer">Taipei Tech</a></strong>,
        working as a research assistant in <strong className="text-stone-100"><a href="https://www.csltaipeitech.com/" target="_blank" rel="noopener noreferrer">City Science Lab@Taipei Tech</a></strong>. My advisor is
        <strong className="text-stone-100"><a href="https://sites.google.com/mail.ntut.edu.tw/vpilab/advisor?authuser=0" target="_blank" rel="noopener noreferrer"> Cheng-Ming Huang</a></strong> and 
        <strong className="text-stone-100"><a href="https://www.media.mit.edu/people/mcllin/overview/" target="_blank" rel="noopener noreferrer"> Michael Lin</a></strong> .
      </p> 
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `My study interests include Visual Language Action Models (VLA) for robotic arms,vision-based and LiDAR-based robot navigation.`,
  aboutItems: [
    {label: 'Location', text: 'Taipei, Taiwan', Icon: MapIcon},
    {label: 'Age', text: '22', Icon: CalendarIcon},
    {label: 'Nationality', text: 'Taiwan(R.O.C)', Icon: FlagIcon},
    {label: 'Interests', text: 'Music, Bodybuilding', Icon: SparklesIcon},
    {label: 'Study', text: 'Taipei Tech', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'Research Assistant @ City Science Lab', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'Mandarin Chinese',
        level: 10,
      },
      {
        name: 'English',
        level: 9,
      },
      {
        name: 'French',
        level: 2,
      },
    ],
  },
  {
    name: 'Robotic development',
    skills: [
      {
        name: 'ROS/ROS2',
        level: 9,
      },
      {
        name: 'Robotic Arms(VLAs)',
        level: 7,
      },
      {
        name: 'Navigation Algorithms',
        level: 6,
      },
    ],
  },
];

/**
 * Portfolio section - Grouped projects with timeline
 */
export const portfolioGroups: PortfolioGroup[] = [
  {
    title: 'Imitation Learning & VLA Development',
    items: [
      {
        title: 'Action Chunking Transformer (ACT) on Koch Study',
        description: 'Collecting training data with teleoperation.',
        url: '/projects/koch-imitation-learning',
        video: '/videos/koch_open_drawer.mp4',
      },
      {
        title: 'Action Chunking Transformer (ACT) on Franka Emika Study',
        description: 'Deploying trained model on real robot.',
        url: '/projects/franka-imitation-learning',
        video: '/videos/franka_open_drawer.mp4',
      },
      {
        title: 'Visual Language Action Models (VLAs) on Koch',
        description: 'Training VLA models with collected data.',
        url: '/projects/koch-vla',
        video: '/videos/three_task_cut_4x_speed.mp4',
      },
      {
        title: 'Model Interpretability on VLA Models',
        description: 'Open up the black box of VLA models.',
        url: '/projects/model-interpretability-vla',
        video: '/videos/svla_attention_weight_correct_prompt_unfrozen_vision_encoder_crop.mp4',
      },
    ],
    timeline: [
      {date: 'Jan ~ May 2025', label: 'Koch with ACT', completed: true},
      {date: 'Jun ~ Dec 2025', label: 'Franka Emika with ACT', completed: true},
      {date: 'Jan ~ Feb 2026', label: 'Koch with VLAs', completed: true},
      {date: 'Feb 2026~', label: 'Model Interpretability (on going...)', completed: false},
    ],
  },
  {
    title: 'Autonomous Navigation System Development',
    items: [
      {
        title: 'Hybrid A* algorithm for robot navigation',
        description: 'Control system final project for path planning.',
        url: '/projects/turtlebot-nav',
        youtubeId: 'WlBBGpIwAvg',
      },
      {
        title: 'Multi-map switching system for robot navigation',
        description: 'Multi-map switching system for TurtleBot navigation.',
        url: '/projects/turtlebot-multi-map-nav',
        youtubeId: 'cTmAIjYQQr8',
      },
      {
        title: 'Visual navigation system for indoor environments',
        description: 'Developing a visual navigation system for indoor environments.',
        url: '/projects/triceratops-nav',
        youtubeId: 'X7kAB2d0PGs',
      },
      {
        title: 'Local planner development for visual navigation system',
        description: 'Deploying trained model on real robot.',
        url: '/projects/triceratops-local-planner',
        youtubeId: 'knTCpoTfLF4',
      },
    ],
    timeline: [
      {date: 'Jan ~ Jun 2024', label: 'Hybrid A* algorithm for robot navigation', completed: true},
      {date: 'Jul ~ Oct 2024', label: 'Multi-map switching system', completed: true},
      {date: 'Nov ~ Dec 2024', label: 'Visual navigation system', completed: true},
      {date: 'Nov ~ Dec 2024', label: 'Local planner development', completed: true},
    ],
  },
];

/**
 * Portfolio section(not used) - Standalone projects without timeline
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Project title 1',
    description: 'Robotic arm performing a pick-and-place task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=8RHWoJiWaVc',
    youtubeId: '8RHWoJiWaVc',
  },
  {
    title: 'Project title 2',
    description: 'Robotic arm performing a pick-and-place task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=mgxuhl4MoaA',
    youtubeId: 'mgxuhl4MoaA',
  },
  {
    title: 'Project title 3',
    description: 'Robotic arm performing a manipulation task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=alRzf46FstQ',
    youtubeId: 'alRzf46FstQ',
  },
  {
    title: 'Project title 4',
    description: 'Robotic arm performing a manipulation task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=qki0DOI2jGQ',
    youtubeId: 'qki0DOI2jGQ',
  },
  {
    title: 'Project title 5',
    description: 'Robotic arm performing a manipulation task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=zfraKg9_tjE',
    youtubeId: 'zfraKg9_tjE',
  },
  {
    title: 'Project title 6',
    description: 'Robotic arm performing a manipulation task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=knTCpoTfLF4',
    youtubeId: 'knTCpoTfLF4',
  },
  {
    title: 'Project title 7',
    description: 'Robotic arm performing a manipulation task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=cTmAIjYQQr8',
    youtubeId: 'cTmAIjYQQr8',
  },
  {
    title: 'Project title 8',
    description: 'Robotic arm performing a manipulation task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=m7VSAH6LK6I',
    youtubeId: 'm7VSAH6LK6I',
  },
  {
    title: 'Project title 9',
    description: 'Robotic arm performing a manipulation task using a VLA system.',
    url: 'https://www.youtube.com/watch?v=X7kAB2d0PGs',
    youtubeId: 'X7kAB2d0PGs',
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: 'Sep 2025 - Present',
    location: 'Taipei Tech',
    title: 'Masters in Electrical Engineering',
    content: <p>Study interests include Robotic Arms, Image Processing, and Vision-based and LiDAR-based Robot Navigation(Overall GPA: 4.0)</p>,
  },
  {
    date: 'Sep 2021 - June 2025',
    location: 'Taipei Tech',
    title: 'Bachelor in Electrical Engineering',
    content: <p>Study interests include Image Processing, data augmentation in computer vision, and robot navigation(Overall GPA: 3.72)</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'Sep 2023 - Present',
    location: 'City Science Lab@Taipei Tech',
    title: 'Research assistant',
    content: (
      <p>
        Assisting in developing an autonomous map-switching system for robot navigation,
        vision-based robot navigation systems for indoor environments, and co-leading the VLA project for robotic arms.
      </p>
    ),
  },
  {
    date: 'Aug 2023 - Nov 2024',
    location: 'InstAI, remote',
    title: 'Research assistant',
    content: (
      <p>
        Assisted in developing an autonomous image recognition system for edge devices, which is an end-to-end system allowing users to capture a small amount
        of data and, through data augmentation and model training, deploy a custom image recognition model on edge devices.
      </p>
    ),
  },
];

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Feel free to reach out to me via email or connect with me on social media. I am always open to discussing new projects, collaborations, or opportunities in the field of robotics and AI.',
  items: [
    {
      type: ContactType.Email,
      text: 'stanleychueh28@gmail.com',
      href: 'mailto:stanleychueh28@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Taipei, Taiwan',
      href: 'https://www.google.ca/maps/place/Taipei,+Taiwan/@25.033022,121.565418,12z/data=!3m1!4b1!4m5!3m4!1s0x3442abfa7a9b8e75:0x1cbbdff8c490e0f!8m2!3d25.033964!4d121.564468',
    },
    {
      type: ContactType.Instagram,
      text: 'stanley_chueh',
      href: 'https://www.instagram.com/stanley_chueh/',
    },
    {
      type: ContactType.Github,
      text: 'StanleyChueh',
      href: 'https://github.com/StanleyChueh',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/StanleyChueh'},
  {label: 'Youtube', Icon: YoutubeIcon, href: 'https://www.youtube.com/@Stanley_Chueh'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/stanley-chueh-239421303'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/stanley_chueh/'},
];
