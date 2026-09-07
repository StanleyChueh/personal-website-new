import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import YoutubeIcon from '../components/Icon/YoutubeIcon';
import heroImage from '../images/hero-poster.png';
import {
  ContactSection,
  ContactType,
  FeaturedProject,
  Hero,
  HomepageMeta,
  PortfolioGroup,
  Social,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Stanley Chueh | Robotics & Embodied AI',
  description:
    'Stanley Chueh (闕楷宸) is a robotics researcher working on Vision-Language-Action models, imitation learning, sim-to-real robotic manipulation, and autonomous robot navigation.',
};

/**
 * Section definition
 */
export const SectionId = {
  Contact: 'contact',
  Education: 'education',
  Experience: 'experience',
  Featured: 'featured',
  Hero: 'hero',
  Portfolio: 'portfolio',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  videoSrcs: [
    '/videos/hero-franka-drawer.mp4',
    '/videos/hero-openarm.mp4',
    '/videos/hero-franka-teleop.mp4',
    '/videos/hero-triceratops.mp4',
  ],
  name: 'Stanley Chueh 闕楷宸',
  description: (
    <div className="flex flex-col items-center gap-y-3 text-center">
      <p className="text-lg font-semibold uppercase tracking-wide text-orange-400 sm:text-xl">
        Robotics &amp; Embodied AI
      </p>
      <p className="prose-sm max-w-2xl text-stone-200 sm:prose-base lg:prose-lg">
        I build and study learning-based robotic systems — from demonstrations and simulation to real-world deployment.
      </p>
      <p className="text-xs font-medium uppercase tracking-widest text-stone-300 sm:text-sm">
        VLA · Robot Learning · Sim-to-Real · Robotic Manipulation
      </p>
      <p className="text-sm text-stone-300">
        Research Assistant,{' '}
        <a
          className="text-stone-100 underline-offset-2 hover:underline"
          href="https://www.csltaipeitech.com/"
          rel="noopener noreferrer"
          target="_blank">
          City Science Lab @ Taipei Tech
        </a>
      </p>
    </div>
  ),
  actions: [
    {
      href: `#${SectionId.Featured}`,
      text: 'Featured Research',
      primary: true,
    },
    {
      href: '/resume/Stanley_resume.pdf',
      text: 'Resume',
      primary: false,
      Icon: ArrowDownTrayIcon,
    },
  ],
};

/**
 * Featured projects section - the strongest, most complete work
 */
export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'OpenArm-vla',
    url: '/projects/OpenArm-vla',
    title: 'Vision-Language-Action Models on a Bimanual Robot (OpenArm)',
    tagline:
      'Training a VLA policy entirely in simulation and transferring it to a real bimanual OpenArm arm for a pick-and-handover task.',
    pipeline: [
      'VR teleoperation (Isaac Sim)',
      '10 source demos',
      'Isaac Lab Mimic generation',
      '~400 generated demos',
      'SmolVLA training',
      'Sim + real deployment',
    ],
    metrics: [
      {label: 'Generated demos', value: '10 → ~400'},
      {label: 'Sim success', value: '80% / 100 rollouts'},
      {label: 'Real success', value: '40% / 10 rollouts'},
      {label: 'Control rate', value: '~30 Hz'},
    ],
    tags: ['VLA', 'SmolVLA', 'Isaac Sim', 'Isaac Lab Mimic', 'Bimanual', 'Sim-to-Real', 'OpenArm'],
    youtubeId: '4DKriauQ05g',
  },
  {
    slug: 'franka-imitation-learning',
    url: '/projects/franka-imitation-learning',
    title: 'Imitation Learning on Franka Emika Panda',
    tagline:
      'Built a leader-follower teleoperation, dataset-collection, and ACT training pipeline to teach a Franka Panda arm manipulation tasks from human demonstrations.',
    pipeline: [
      'Leader-follower teleoperation (GELLO, Franka ROS)',
      '~100 demos / task',
      'ACT training',
      'Real-robot deployment',
    ],
    metrics: [
      {label: 'Demos', value: '~100 / task'},
      {label: 'Control rate', value: '~10 Hz'},
      {label: 'Tasks', value: 'Drawer-opening, pick-and-place'},
      {label: 'Deployed on', value: 'Real Franka Emika Panda'},
    ],
    tags: ['Franka Panda', 'ACT', 'Teleoperation', 'GELLO', 'ROS', 'LeRobot'],
    youtubeId: 'zfraKg9_tjE',
  },
  {
    slug: 'triceratops-nav',
    url: '/projects/triceratops-nav',
    title: 'Visual Navigation for the Triceratops Quadruped',
    tagline:
      'Designed and integrated a visual-SLAM and AprilTag localization stack for indoor autonomous navigation on a quadruped robot.',
    pipeline: ['RGB-D visual SLAM', 'AprilTag-assisted localization', 'Real-robot deployment'],
    metrics: [
      {label: 'Localization', value: 'Visual SLAM + AprilTag'},
      {label: 'Sensing', value: 'RGB-D camera'},
      {label: 'Platform', value: 'Triceratops quadruped'},
      {label: 'Deployed on', value: 'Real robot, indoor nav'},
    ],
    tags: ['Visual SLAM', 'AprilTag', 'RGB-D', 'ROS2', 'Autonomous Navigation'],
    youtubeId: 'X7kAB2d0PGs',
  },
];

/**
 * Portfolio section - Earlier robotics projects, grouped by theme
 */
export const portfolioGroups: PortfolioGroup[] = [
  {
    title: 'Imitation Learning & VLA Development',
    items: [
      {
        title: 'Action Chunking Transformer (ACT) on Koch Study',
        description: 'Collecting training data with teleoperation.',
        url: '/projects/koch-imitation-learning',
        // video: '/videos/koch_open_drawer.mp4',
        youtubeId: 'Szx_Pt8DylI',
      },
      {
        title: 'Visual Language Action Models (VLAs) on Koch',
        description: 'Training VLA models with collected data.',
        url: '/projects/koch-vla',
        // video: '/videos/three_task_cut_4x_speed.mp4',
        youtubeId: 'cOOaiJX_r3U',
      },
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
        title: 'Local planner development for visual navigation system',
        description: 'Developing a local planner for the visual navigation system.',
        url: '/projects/triceratops-local-planner',
        youtubeId: 'knTCpoTfLF4',
      },
    ],
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
    content: (
      <p>
        Study interests include Robotic Arms, Image Processing, and Vision-based and LiDAR-based Robot
        Navigation(Overall GPA: 4.0)
      </p>
    ),
  },
  {
    date: 'Sep 2021 - June 2025',
    location: 'Taipei Tech',
    title: 'Bachelor in Electrical Engineering',
    content: (
      <p>
        Study interests include Image Processing, data augmentation in computer vision, and robot navigation(Overall
        GPA: 3.72)
      </p>
    ),
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'Sep 2023 - Present',
    location: 'City Science Lab@Taipei Tech',
    title: 'Research assistant',
    content: (
      <p>
        Assisting in developing an autonomous map-switching system for robot navigation, vision-based robot navigation
        systems for indoor environments, and co-leading the VLA project for robotic arms.
      </p>
    ),
  },
  {
    date: 'Aug 2023 - Nov 2024',
    location: 'InstAI, remote',
    title: 'Research assistant',
    content: (
      <p>
        Assisted in developing an autonomous image recognition system for edge devices, which is an end-to-end system
        allowing users to capture a small amount of data and, through data augmentation and model training, deploy a
        custom image recognition model on edge devices.
      </p>
    ),
  },
];

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description:
    'Feel free to reach out to me via email or connect with me on social media. I am always open to discussing new projects, collaborations, or opportunities in the field of robotics and AI.',
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
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/stanley-chueh'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/stanley_chueh/'},
];
