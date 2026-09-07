import {GetStaticPaths, GetStaticProps} from 'next';
import Link from 'next/link';
import {FC, memo} from 'react';

import Page from '../../components/Layout/Page';
import ContributionSection from '../../components/Project/ContributionSection';
import ProjectMetric from '../../components/Project/ProjectMetric';

// Hoisted "My Contribution" data (kept out of the JSX below so array props aren't
// recreated as inline literals at each ContributionSection callsite).
const frankaContribution = {
  mine: [
    'Collected teleoperated demonstrations and trained/evaluated the ACT policy as part of the City Science Lab robotics team',
    'Set up leader-follower teleoperation control for the Franka Emika Panda, transferring the ACT data-collection pipeline first built on the Koch arm',
  ],
  collaborators: 'City Science Lab robotics team (VLA/imitation-learning project)',
  external: [
    'ACT (Action Chunking Transformer)',
    'GELLO',
    'Franka ROS',
    'Avp_teleoperate (Vision Pro teleop reference)',
  ],
};

const openArmContribution = {
  mine: [
    'Leading the OpenArm VLA project at City Science Lab (see Experience)',
    'Built and maintain the OpenArm Isaac Lab simulation environment for teleoperation and Isaac Lab Mimic data generation',
    'Built and maintain the VR teleoperation data-collection pipeline (Meta Quest 3 Pro → Isaac Sim)',
    'Built and maintain the real-world OpenArm deployment code (SmolVLA policy → LeRobot → real robot)',
  ],
  collaborators: 'City Science Lab VLA project team',
  external: ['SmolVLA (Hugging Face)', 'Isaac Lab Mimic (NVIDIA)', 'Isaac Sim (NVIDIA)'],
};

const triceratopsContribution = {
  mine: [
    'Designed and developed the visual navigation system (Visual SLAM + AprilTag-assisted localization)',
    'Integrated the visual navigation system with the physical Triceratops robot for autonomous indoor navigation',
  ],
  collaborators:
    'City Science Lab robotic team built the Triceratops robot and its low-level gait control — not developed by me',
  external: ['NVIDIA Isaac ROS Visual SLAM', 'AprilTag'],
};

// Define all your projects here
const projects: Record<
  string,
  {
    title: string;
    description: string;
    videos?: {src: string; caption: string}[];
    images?: {src: string; caption: string}[];
    youtubeIds?: {id: string; caption: string}[];
    sections?: {title: string; content: string | JSX.Element}[];
    links?: {label: string; url: string}[];
  }
> = {
  // Project 1(Imitation Learning & VLA Development)
  'koch-imitation-learning': {
    title: 'Imitation Learning with low-cost robotic arm',
    description: `
      Imagine a robotic arm that can learn to perform tasks 
      just by watching human demonstrations! 
    `.trim(),
    videos: [{src: '/videos/koch_open_drawer.mp4', caption: 'Robot opening drawer demo'}],
    images: [{src: '/images/portfolio/Franka_open_drawer.png', caption: 'Training process'}],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p>
              This project demonstrates how low-cost robotic arms{' '}
              <strong>
                (
                <a
                  className="text-blue-400 hover:underline"
                  href="https://github.com/jess-moss/koch-v1-1"
                  rel="noopener noreferrer"
                  target="_blank">
                  Koch
                </a>
                )
              </strong>{' '}
              can learn from human demonstrations using <strong>imitation learning by</strong>{' '}
              <strong>
                <a
                  className="text-blue-400 hover:underline"
                  href="https://huggingface.co/docs/lerobot/act"
                  rel="noopener noreferrer"
                  target="_blank">
                  Action Chunking Transformer (ACT)
                </a>
              </strong>
              .
            </p>
            <img
              alt="LeRobot Pipeline - How imitation learning models are trained"
              className="w-full rounded-lg shadow-lg mt-4"
              src="/images/portfolio/lerobot-pipeline-koch.png"
            />
            <p className="text-sm text-gray-400 text-center">
              LeRobot Pipeline: Training imitation learning models by Koch robot
            </p>
          </div>
        ),
      },
      {
        title: '1. Data Collection',
        content: (
          <div className="space-y-4">
            <p>The first step is collecting high-quality demonstration data from human teleoperation.</p>

            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong>LeRobot dataset format</strong>, which stores episodes as Parquet files containing{' '}
              <strong> observation(following robot joint states) </strong>, and{' '}
              <strong> action(leading arm's joint states) </strong> and mp4 for top and front camera observation.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (16-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"LJ1.pos"</li>
                <li>"LJ2.pos"</li>
                <li>"LJ3.pos"</li>
                <li>"LJ4.pos"</li>
                <li>"LJ5.pos"</li>
                <li>"LJ6.pos"</li>
                <li>"LJ7.pos"</li>
                <li>"LJ8.pos"</li>
                <li>"RJ1.pos"</li>
                <li>"RJ2.pos"</li>
                <li>"RJ3.pos"</li>
                <li>"RJ4.pos"</li>
                <li>"RJ5.pos"</li>
                <li>"RJ6.pos"</li>
                <li>"RJ7.pos"</li>
                <li>"RJ8.pos"</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"observation.images.front"</li>
                <li>"observation.images.top"</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">
              LeRobot dataset structure with joint positions and camera observations
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Human demonstrations are collected via <strong>teleoperation</strong> using a leader-follower setup, where
              the operator controls a leader arm and the follower arm mimics the movements.
            </p>
            <div className="aspect-video">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
                height="100%"
                src="https://www.youtube.com/embed/PNdkYEWuSUE?si=&autoplay=1&loop=1&playlist=PNdkYEWuSUE&mute=1"
                style={{border: 'none'}}
                title="YouTube video player"
                width="100%"
              />
            </div>
            <p className="text-sm text-gray-400 text-center">Leader-follower teleoperation for data collection</p>
          </div>
        ),
      },
      {
        title: '2. Model Training',
        content: (
          <div className="space-y-6">
            <p>
              After collecting demonstration data, we train imitation learning models to predict robot actions from
              visual observations.
            </p>

            {/* ACT Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">ACT (Action Chunking Transformer)</h3>
              <p className="mb-3">
                A <strong>pure imitation learning</strong> approach that predicts{' '}
                <strong>action sequences("chunks") rather than single actions </strong> . It uses a transformer
                encoder-decoder architecture with a CVAE (Conditional Variational Autoencoder) for modeling action
                distributions.
              </p>
              <div className="my-4">
                <img
                  alt="ACT Architecture - Action Chunking Transformer from the original paper"
                  className="w-full rounded-lg shadow-lg"
                  src="/images/portfolio/act-paper.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  ACT Architecture (Source:{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://arxiv.org/abs/2304.13705"
                    rel="noopener noreferrer"
                    target="_blank">
                    ACT Paper
                  </a>
                  )
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Strengths</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Fast training (no VLM backbone)</li>
                    <li>• Lightweight (~25M parameters)</li>
                    <li>• Good for single-task learning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">⚠️ Limitations</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• No language understanding</li>
                    <li>• Requires task-specific training</li>
                    <li>• Limited generalization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: '3. Deployment',
        content: (
          <div className="space-y-4">
            <p>The trained model is deployed on the robot for real-time inference and autonomous task execution.</p>
            {/* Task Setup Video */}
            <h3 className="text-lg font-semibold text-white mt-6">Real-time Inference</h3>
            <p>
              The model runs at <strong>~30Hz</strong>, predicting action chunks that are executed by the robot
              controller in real-time.
            </p>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/Szx_Pt8DylI?si=&autoplay=1&loop=1&playlist=Szx_Pt8DylI&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Autonomous task execution after 50 episodes training
                </p>
              </div>

              <div>
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/vlrDY3Pzqec?si=&autoplay=1&loop=1&playlist=vlrDY3Pzqec&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Real-time action classification using the trained ACT model
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/huggingface/lerobot.git'},
      {label: 'ACT Paper (Reference)', url: 'https://arxiv.org/abs/2304.13705'},
    ],
  },

  // Project 2(Imitation Learning & VLA Development)
  'franka-imitation-learning': {
    title: 'Imitation Learning with Franka Emika Panda',
    description: `
      How to transfer the imitation learning techniques to a more complex robotic arm like Franka Emika Panda.
    `.trim(),
    videos: [{src: '/videos/franka_open_drawer.mp4', caption: 'Robot opening drawer demo'}],
    images: [
      {src: '/images/portfolio/franka-1.png', caption: 'System setup'},
      {src: '/images/portfolio/franka-2.png', caption: 'Training process'},
    ],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            In our previous work, we demonstrated how robotic arms can learn from human demonstrations through{' '}
            <strong>
              Action Chunking Transformer (ACT). In this project, we demonstrate how we transfer that approach to the
              Franka Emika Panda
            </strong>
            .
          </p>
        ),
      },
      {
        title: 'Key Results',
        content: (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ProjectMetric label="Demonstrations" value="~100 / task" />
            <ProjectMetric label="Control rate" value="~10 Hz" />
            <ProjectMetric label="Tasks" value="Drawer-opening, pick-and-place" />
            <ProjectMetric label="Deployed on" value="Real Franka Emika Panda" />
          </div>
        ),
      },
      {
        title: 'My Contribution',
        content: <ContributionSection {...frankaContribution} />,
      },
      {
        title: '1. Data Collection',
        content: (
          <div className="space-y-4">
            <p>The first step is collecting high-quality demonstration data from human teleoperation.</p>

            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong> same LeRobot dataset format</strong>, which stores episodes as Parquet files and mp4
              for front and wrist camera observation.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (7-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"eef_x"</li>
                <li>"eef_y"</li>
                <li>"eef_z"</li>
                <li>"eef_quat_x"</li>
                <li>"eef_quat_y"</li>
                <li>"eef_quat_z"</li>
                <li>"eef_quat_w"</li>
                <li>"gripper_width"</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"observation.images.front"</li>
                <li>"observation.images.wrist_front"</li>
                <li>"observation.images.wrist_rear"</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">
              LeRobot dataset structure with end effector positions, quaternions and camera observations
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Human demonstrations are collected via <strong>teleoperation</strong> using a leader-follower setup, where
              the operator controls a leader arm and the follower arm mimics the movements.
            </p>

            <p className="text-sm text-gray-400">
              Detail: We use the{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://arxiv.org/abs/2309.13037"
                rel="noopener noreferrer"
                target="_blank">
                GELLO project
              </a>{' '}
              to mirror the same leader-follower method used for the Koch robot's data collection. We use joint
              impedance control for the Franka Emika Panda via{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://github.com/frankaemika/franka_ros"
                rel="noopener noreferrer"
                target="_blank">
                Franka ROS
              </a>
              , mapping the leader arm's joint states to command the follower arm.
            </p>
            <div className="aspect-video mt-4">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
                height="100%"
                src="https://www.youtube.com/embed/OhipjlzHnjo?autoplay=1&loop=1&playlist=OhipjlzHnjo&mute=1"
                style={{border: 'none'}}
                title="YouTube video player"
                width="100%"
              />
            </div>
            <p className="text-sm text-gray-400 text-center">Leader-follower teleoperation for data collection</p>

            <h4 className="text-lg font-semibold text-white mt-6">Previous Control Method</h4>
            <p>
              Previously, we employed <strong>Vision Pro</strong> to control the Franka Emika Panda. Vision Pro tracks
              the operator's hand and maps its relative movement to relative movement of the robot's end effector.
            </p>
            <p>
              However, we found that Vision Pro control was not intuitive for this Franka Emika Panda setup; it may be
              more useful for bimanual robots.
            </p>
            <p className="text-sm text-gray-400">
              Detail: we were inspired by Unitree Robotics'{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://github.com/unitreerobotics/xr_teleoperate.git"
                rel="noopener noreferrer"
                target="_blank">
                Avp_teleoperate
              </a>
              , which also uses Vision Pro for data collection. We used the same method in the early stage of data
              collection, before switching to the leader-follower teleoperation method.
            </p>
            <div className="aspect-video mt-4">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
                height="100%"
                src="https://www.youtube.com/embed/KvCzDGHlaKs?si=&autoplay=1&loop=1&playlist=KvCzDGHlaKs&mute=1"
                style={{border: 'none'}}
                title="YouTube video player"
                width="100%"
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">Vision Pro controlled pick-and-place demonstration</p>
          </div>
        ),
      },
      {
        title: '2. Model Training',
        content: (
          <div className="space-y-6">
            <p>
              After collecting demonstration data, we train imitation learning models to predict robot actions from
              visual observations.
            </p>

            {/* ACT Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">ACT (Action Chunking Transformer)</h3>
              <p className="mb-3">
                A <strong>pure imitation learning</strong> approach that predicts{' '}
                <strong>action sequences("chunks") rather than single actions </strong> . It uses a transformer
                encoder-decoder architecture with a CVAE (Conditional Variational Autoencoder) for modeling action
                distributions.
              </p>
              <div className="my-4">
                <img
                  alt="ACT Architecture - Action Chunking Transformer from the original paper"
                  className="w-full rounded-lg shadow-lg"
                  src="/images/portfolio/act-paper.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  ACT Architecture (Source:{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://arxiv.org/abs/2304.13705"
                    rel="noopener noreferrer"
                    target="_blank">
                    ACT Paper
                  </a>
                  )
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Strengths</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Fast training (no VLM backbone)</li>
                    <li>• Lightweight (~25M parameters)</li>
                    <li>• Good for single-task learning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">⚠️ Limitations</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• No language understanding</li>
                    <li>• Requires task-specific training</li>
                    <li>• Limited generalization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: '3. Deployment',
        content: (
          <div className="space-y-4">
            <p>The trained model is deployed on the robot for real-time inference and autonomous task execution.</p>
            {/* Task Setup Video */}
            <h3 className="text-lg font-semibold text-white mt-6">Real-time Inference</h3>
            <p>
              The model runs at <strong>~10Hz</strong>, predicting action chunks that are executed by the robot
              controller in real-time.
            </p>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/zfraKg9_tjE?si=&autoplay=1&loop=1&playlist=zfraKg9_tjE&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Autonomous task execution after 100 episodes training{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://huggingface.co/datasets/ethanCSL/open_drawer"
                    rel="noopener noreferrer"
                    target="_blank">
                    Dataset
                  </a>
                </p>
              </div>

              <div>
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/mgxuhl4MoaA?autoplay=1&loop=1&playlist=mgxuhl4MoaA&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Autonomous pick-and-place task execution after 100 episodes training (robustness testing){' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://huggingface.co/datasets/ethanCSL/pick_n_place_100"
                    rel="noopener noreferrer"
                    target="_blank">
                    Dataset
                  </a>
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/huggingface/lerobot.git'},
      {label: 'ACT Paper (Reference)', url: 'https://arxiv.org/abs/2304.13705'},
      {label: 'Franka ROS', url: 'https://github.com/frankaemika/franka_ros'},
      {label: 'GELLO', url: 'https://arxiv.org/abs/2309.13037'},
      {label: 'XR Teleoperate', url: 'https://github.com/unitreerobotics/xr_teleoperate.git'},
    ],
  },

  // Project 3(Imitation Learning & VLA Development)
  'koch-vla': {
    title: 'VLAs with low-cost robotic arm',
    description: `
      Imagine a robotic arm that can learn to perform tasks 
      just by watching human demonstrations and reading instruction!
    `.trim(),
    videos: [{src: '/videos/koch_open_drawer.mp4', caption: 'Robot opening drawer demo'}],
    images: [
      {src: '/images/portfolio/koch-1.png', caption: 'System setup'},
      {src: '/images/portfolio/koch-2.png', caption: 'Training process'},
    ],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <div>
            <p>
              In our previous work, we demonstrated how Action Chunking Transformer (ACT) enables robotic arms to learn
              from human demonstrations, but language could not be directly incorporated.
            </p>
            <p>
              This project demonstrates how robotic arms can learn using <strong>Visual Language Action (VLA)</strong>{' '}
              models like{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://arxiv.org/abs/2506.01844"
                rel="noopener noreferrer"
                target="_blank">
                SmolVLA
              </a>
              , that we can use language instructions with.
            </p>
          </div>
        ),
      },
      {
        title: '1. Data Collection',
        content: (
          <div className="space-y-4">
            <p>
              In data collection, we use the same setup as the previous projects, but we also collect language
              instructions along with the demonstrations.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong>LeRobot dataset format</strong>, which stores episodes as Parquet files containing{' '}
              <strong> observation(following robot joint states) </strong>, and{' '}
              <strong> action(leading arm's joint states) </strong> and mp4 for top and front camera observation.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (16-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"LJ1.pos"</li>
                <li>"LJ2.pos"</li>
                <li>"LJ3.pos"</li>
                <li>"LJ4.pos"</li>
                <li>"LJ5.pos"</li>
                <li>"LJ6.pos"</li>
                <li>"LJ7.pos"</li>
                <li>"LJ8.pos"</li>
                <li>"RJ1.pos"</li>
                <li>"RJ2.pos"</li>
                <li>"RJ3.pos"</li>
                <li>"RJ4.pos"</li>
                <li>"RJ5.pos"</li>
                <li>"RJ6.pos"</li>
                <li>"RJ7.pos"</li>
                <li>"RJ8.pos"</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"observation.images.front"</li>
                <li>"observation.images.top"</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">
              LeRobot dataset structure with joint positions and camera observations
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Human demonstrations are collected via <strong>teleoperation</strong> using a leader-follower setup, where
              the operator controls a leader arm and the follower arm mimics the movements.
            </p>
            <div className="aspect-video mt-4">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
                height="100%"
                src="https://www.youtube.com/embed/PNdkYEWuSUE?si=&autoplay=1&loop=1&playlist=PNdkYEWuSUE&mute=1"
                style={{border: 'none'}}
                title="YouTube video player"
                width="100%"
              />
            </div>
            <p className="text-sm text-gray-400 text-center">Leader-follower teleoperation for data collection</p>
          </div>
        ),
      },
      {
        title: '2. Model Training',
        content: (
          <div className="space-y-6">
            <p>
              After collecting demonstration data, we train VLA model(SmolVLA) to predict robot actions from visual
              observations and language instructions.
            </p>

            {/* SmolVLA Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">SmolVLA (Small Vision-Language Action Model)</h3>
              <p className="mb-3">
                Unlike common VLA models that use large vision-language backbones, SmolVLA is a lightweight model
                designed for fast training and inference on robotic arms.
              </p>
              <div className="my-4">
                <img
                  alt="SmolVLA Architecture - Small Vision-Language Action Model from the original paper"
                  className="w-full rounded-lg shadow-lg"
                  src="/images/portfolio/smolvla-paper.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  SmolVLA Architecture (Source:{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://arxiv.org/abs/2506.01844"
                    rel="noopener noreferrer"
                    target="_blank">
                    SmolVLA Paper
                  </a>
                  )
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Strengths</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Fast training (Lightweight architecture)</li>
                    <li>• Resource-efficient (lightweight inference)</li>
                    <li>• Smooth trajectory generation(SA interleaves CA)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">⚠️ Limitations</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Poor zero-shot generalization</li>
                    <li>• Not optimized for cross-embodiment transfer</li>
                    <li>• Limited generalization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: '3. Deployment',
        content: (
          <div className="space-y-4">
            <p>The trained model is deployed on the robot for real-time inference and autonomous task execution.</p>
            {/* Task Setup Video */}
            <h3 className="text-lg font-semibold text-white mt-6">Real-time Inference</h3>
            <p>
              The model runs at <strong>~30Hz</strong>, predicting actions that are executed by the robot controller in
              real-time.
            </p>
            {/* YouTube Video */}
            <div className="mt-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/Xi3LRSgJ_ro?si=&autoplay=1&loop=1&playlist=Xi3LRSgJ_ro&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Autonomous real-time task switching execution after 100 episodes for each task after training{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://huggingface.co/datasets/ethanCSL/svla_koch_sorting_n_stacking_screw_nut"
                    rel="noopener noreferrer"
                    target="_blank">
                    Dataset
                  </a>
                </p>
              </div>
            </div>
            {/* YouTube Video */}
            <div className="mt-6 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/zdFU9ku4Wcg?si=bJjzFVhdc2FZIbdA&autoplay=1&loop=1&playlist=zdFU9ku4Wcg&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Autonomous real-time task switching execution after 60 episodes for each task after training{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://huggingface.co/datasets/ethanCSL/color_test_green"
                    rel="noopener noreferrer"
                    target="_blank">
                    Dataset
                  </a>
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/huggingface/lerobot.git'},
      {label: 'SmolVLA Paper (Reference)', url: 'https://arxiv.org/abs/2506.01844'},
    ],
  },

  // Project 4(Imitation Learning & VLA Development)
  'OpenArm-vla': {
    title: 'VLAs with bimanual robotic arm(OpenArm)',
    description: `
      Can we train VLAs on fully simulated bimanual robotic arms and transfer to real-world tasks?
    `.trim(),
    videos: [{src: '/videos/koch_open_drawer.mp4', caption: 'Robot opening drawer demo'}],
    images: [
      {src: '/images/portfolio/koch-1.png', caption: 'System setup'},
      {src: '/images/portfolio/koch-2.png', caption: 'Training process'},
    ],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p>
              In our previous work, we demonstrated how Action Chunking Transformer (ACT) and SmolVLA enable robotic
              arms to learn from human demonstrations and language instructions, but we only used low-cost, single-arm
              robots, and all models are trained on real-world data. In this project, we explore how to train VLAs on
              fully simulated bimanual robotic arms and transfer to real-world tasks.
            </p>
            <img
              alt="Real2Sim2Real pipeline"
              className="w-full rounded-lg shadow-lg"
              src="/images/portfolio/Real2Sim2Real_pipeline.png"
            />
            <p className="text-sm text-gray-400 text-center">
              Real2Sim2Real pipeline for training bimanual robot policies
            </p>
          </div>
        ),
      },
      {
        title: 'Key Results',
        content: (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ProjectMetric label="Generated demos" value="10 → ~400" />
            <ProjectMetric label="Sim success" value="80% / 100 rollouts" />
            <ProjectMetric label="Real success" value="40% / 10 rollouts" />
            <ProjectMetric label="Control rate" value="~30 Hz" />
          </div>
        ),
      },
      {
        title: 'My Contribution',
        content: <ContributionSection {...openArmContribution} />,
      },
      {
        title: '1. Teleoperation - Isaac Sim',
        content: (
          <div className="space-y-4">
            <p>
              In data collection, we use the same setup as the previous projects, but we also collect language
              instructions along with the demonstrations.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong>LeRobot dataset format</strong>, which stores episodes as Parquet files containing{' '}
              <strong> observation(Robot joint states) </strong>, and <strong> action(Joint states commands) </strong>{' '}
              and mp4 for body camera and two wrist cameras observation.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (16-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"LJ1.pos"</li>
                <li>"LJ2.pos"</li>
                <li>"LJ3.pos"</li>
                <li>"LJ4.pos"</li>
                <li>"LJ5.pos"</li>
                <li>"LJ6.pos"</li>
                <li>"LJ7.pos"</li>
                <li>"LJ8.pos"</li>
                <li>"RJ1.pos"</li>
                <li>"RJ2.pos"</li>
                <li>"RJ3.pos"</li>
                <li>"RJ4.pos"</li>
                <li>"RJ5.pos"</li>
                <li>"RJ6.pos"</li>
                <li>"RJ7.pos"</li>
                <li>"RJ8.pos"</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>"observation.images.body_cam"</li>
                <li>"observation.images.wrist_cam"</li>
                <li>"observation.images.right_wrist_cam"</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">
              LeRobot dataset structure with joint positions and camera observations
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Demonstrations are collected via <strong>teleoperation</strong> using Meta Quest3 Pro in Isaac Sim.
            </p>
            <div className="aspect-video mt-4">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
                height="100%"
                src="https://www.youtube.com/embed/PNdkYEWuSUE?si=&autoplay=1&loop=1&playlist=PNdkYEWuSUE&mute=1"
                style={{border: 'none'}}
                title="YouTube video player"
                width="100%"
              />
            </div>
            <p className="text-sm text-gray-400 text-center">
              Leader-follower teleoperation for data collection, reference:{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://github.com/enactic/dora-openarm-data-collection.git"
                rel="noopener noreferrer"
                target="_blank">
                [Github]
              </a>
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Source dataset</h3>
            <p>
              The collected dataset is available on{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://huggingface.co/datasets/ethanCSL/openarm_visuomotor_VR_pringles_V9"
                rel="noopener noreferrer"
                target="_blank">
                Hugging Face
              </a>
              .
            </p>
            <img
              alt="Pringles handover visualizer"
              className="w-full rounded-lg shadow-lg mt-4"
              src="/images/portfolio/pringles_handover_visualizer.png"
            />
            <p className="text-sm text-gray-400 text-center">10 source demos by human demos</p>
          </div>
        ),
      },
      {
        title: '2. Dataset generation - Isaac Sim',
        content: (
          <div className="space-y-4">
            <p>
              After collecting small amount of demonstration data(ex: 10 demos), we generate a large-scale dataset(~400
              demos) in Isaac Sim by randomizing pringles positions, size, textures, lighting and background.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">Dataset Annotation</h3>
            <p>For dataset generation(Isaac Lab Mimic), we have to annotate each episode into several subtasks.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="space-y-4 md:col-span-2">
                <h4 className="text-base font-semibold text-white">right arm</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <video
                      autoPlay
                      className="w-full aspect-video object-cover rounded-lg shadow-lg"
                      controls
                      loop
                      muted
                      playsInline
                      src="/videos/openarm_right_1.mp4"
                    />
                    <p className="text-sm text-gray-400 text-center mt-2">Segment 1: Reach → grasp</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <video
                      autoPlay
                      className="w-full aspect-video object-cover rounded-lg shadow-lg"
                      controls
                      loop
                      muted
                      playsInline
                      src="/videos/openarm_right_2.mp4"
                    />
                    <p className="text-sm text-gray-400 text-center mt-2">Segment 2: Handover → release → return</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 md:col-span-1">
                <h4 className="text-base font-semibold text-white">left arm</h4>
                <div className="flex flex-col items-center">
                  <video
                    autoPlay
                    className="w-full aspect-video object-cover rounded-lg shadow-lg"
                    controls
                    loop
                    muted
                    playsInline
                    src="/videos/openarm_left.mp4"
                  />
                  <p className="text-sm text-gray-400 text-center mt-2">Segment 3: Wait → handover → return</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6">Dataset Generation</h3>

            <p>
              After annotating the source dataset, we can use Isaac Lab Mimic to generate a large-scale dataset by
              randomizing pringles positions, size, textures, lighting and background.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
              <video
                autoPlay
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
                controls
                loop
                muted
                playsInline
                src="/videos/isaaclab_mimic_1.mp4"
              />
              <video
                autoPlay
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
                controls
                loop
                muted
                playsInline
                src="/videos/isaaclab_mimic_2.mp4"
              />
              <video
                autoPlay
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
                controls
                loop
                muted
                playsInline
                src="/videos/isaaclab_mimic_3.mp4"
              />
              <video
                autoPlay
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
                controls
                loop
                muted
                playsInline
                src="/videos/isaaclab_mimic_4.mp4"
              />
              <video
                autoPlay
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
                controls
                loop
                muted
                playsInline
                src="/videos/isaaclab_mimic_5.mp4"
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">
              Domain randomization in Isaac Lab Mimic introduces varied lighting and backgrounds to improve dataset
              diversity.{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://huggingface.co/ethanCSL/openarm_visuomotor_VR_pringles_V14_background_30hz"
                rel="noopener noreferrer"
                target="_blank">
                Dataset
              </a>
            </p>
          </div>
        ),
      },
      {
        title: '2. Model Training',
        content: (
          <div className="space-y-6">
            <p>
              After generating enough diverse data, we train VLA model(SmolVLA) to predict robot actions from visual
              observations and language instructions.
            </p>

            {/* SmolVLA Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">SmolVLA (Small Vision-Language Action Model)</h3>
              <p className="mb-3">
                Unlike common VLA models that use large vision-language backbones, SmolVLA is a lightweight model
                designed for fast training and inference on robotic arms.
              </p>
              <div className="my-4">
                <img
                  alt="SmolVLA Architecture - Small Vision-Language Action Model from the original paper"
                  className="w-full rounded-lg shadow-lg"
                  src="/images/portfolio/smolvla-paper.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  SmolVLA Architecture (Source:{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://arxiv.org/abs/2506.01844"
                    rel="noopener noreferrer"
                    target="_blank">
                    SmolVLA Paper
                  </a>
                  )
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Strengths</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Fast training (Lightweight architecture)</li>
                    <li>• Resource-efficient (lightweight inference)</li>
                    <li>• Smooth trajectory generation(SA interleaves CA)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">⚠️ Limitations</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Poor zero-shot generalization</li>
                    <li>• Not optimized for cross-embodiment transfer</li>
                    <li>• Limited generalization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: '3. Deployment',
        content: (
          <div className="space-y-4">
            <p>
              We deploy model on simulated OpenArm and real-world OpenArm for real-time inference and autonomous task
              execution.
            </p>
            {/* Task Setup Video */}
            <h3 className="text-lg font-semibold text-white mt-6">Deployment in Isaac Sim</h3>
            <p>
              The success rate in Isaac Sim is 80% for 100 rollouts, and the model runs at <strong>~30Hz</strong>,
              predicting actions that are executed by the robot controller in real-time.
            </p>
            {/* YouTube Video */}
            <div className="mt-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/Xi3LRSgJ_ro?si=5ilrH2fEY7J_S4fR&autoplay=1&loop=1&playlist=Xi3LRSgJ_ro&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Autonomous execution after training{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://huggingface.co/datasets/ethanCSL/svla_koch_sorting_n_stacking_screw_nut"
                    rel="noopener noreferrer"
                    target="_blank">
                    Dataset
                  </a>
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6">Deployment in Real-world</h3>
            <p>
              The success rate in real-world is around 40% for 10 rollouts, and the model runs at <strong>~30Hz</strong>
              , predicting actions that are executed by the robot controller in real-time.
            </p>
            {/* YouTube Video */}
            <div className="mt-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/4DKriauQ05g?si=caoTgI-4_Zse6fU6&autoplay=1&loop=1&playlist=4DKriauQ05g&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Autonomous execution in real-world scenarios{' '}
                  <a
                    className="text-blue-400 hover:underline"
                    href="https://huggingface.co/ethanCSL/openarm_visuomotor_VR_pringles_V14_background_30hz"
                    rel="noopener noreferrer"
                    target="_blank">
                    model
                  </a>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: '4. Limitations and Future Work',
        content: (
          <div className="space-y-4">
            <p>
              While the model performs well in simulation, there are still challenges in transferring to real-world
              scenarios. Future work will focus on improving the model's robustness and generalization capabilities.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li> Fixing simulation-to-real-world domain gaps</li>
              <li> Switch to another VLAs as GR00T N1.7, PI0.7...</li>
              <li> Fixing jerky trajectories in real-world deployment</li>
            </ul>
          </div>
        ),
      },
    ],
    links: [
      {label: 'lerobot', url: 'https://github.com/huggingface/lerobot.git'},
      {label: 'OpenArm IsaacLab', url: 'https://github.com/StanleyChueh/IsaacLab.git'},
      {label: 'OpenArm VR', url: 'https://github.com/StanleyChueh/dora-openarm-data-collection.git'},
      {label: 'OpenArm Real world deployment', url: 'https://github.com/StanleyChueh/lerobot_openarm.git'},
    ],
  },

  // Autonomous Navigation System Development

  // Project 5(Autonomous Navigation System Development for turtlebot)
  'turtlebot-nav': {
    title: 'Hybrid A* algorithm for robot navigation',
    description: `
      Developing a hybrid A* algorithm for autonomous navigation of a TurtleBot in dynamic environments.
    `.trim(),
    videos: [{src: '/videos/turtlebot_multi_map.mp4', caption: 'Multi-map switching demo'}],
    images: [
      {src: '/images/portfolio/turtlebot-1.png', caption: 'System setup'},
      {src: '/images/portfolio/turtlebot-2.png', caption: 'Training process'},
    ],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            This project demonstrates how to use Turtlebot3 for autonomous navigation in dynamic environments using a
            hybrid A* algorithm from simulation to real-world deployment.
          </p>
        ),
      },
      {
        title: 'Robot Setup',
        content: (
          <div className="space-y-4">
            <p>We use the TurtleBot3 Burger platform equipped with a LiDAR sensor for navigation.</p>
            <div className="flex justify-center">
              <img
                alt="TurtleBot3 Burger platform equipped with a LiDAR sensor for navigation"
                className="w-3/4 rounded-lg shadow-lg"
                src="/images/portfolio/turtlebot3.png"
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">TurtleBot3 Burger platform setup</p>
          </div>
        ),
      },
      {
        title: 'Hybrid A* Algorithm(Sim2Real)',
        content: (
          <div className="space-y-4">
            <p>
              We implement a hybrid A* algorithm that combines grid-based A* and sampling-based RRT for efficient path
              planning in dynamic environments. The algorithm is tested in simulation and real-world scenarios.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/WlBBGpIwAvg?si=1b6nyTCwvE3p-iRs&autoplay=1&loop=1&playlist=WlBBGpIwAvg"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Hybrid A* Algorithm visualization(Gazebo to Real-world)
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    links: [],
  },

  // Project 6(Autonomous Navigation System Development for spot)
  'turtlebot-multi-map-nav': {
    title: 'Multi-map Switching System for TurtleBot Navigation',
    description: `
      Developing a multi-map switching system for autonomous navigation of a TurtleBot in dynamic environments.
    `.trim(),
    videos: [{src: '/videos/turtlebot_multi_map.mp4', caption: 'Multi-map switching demo'}],
    images: [
      {src: '/images/portfolio/turtlebot-1.png', caption: 'System setup'},
      {src: '/images/portfolio/turtlebot-2.png', caption: 'Training process'},
    ],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            This project demonstrates how to implement a multi-map switching system for autonomous navigation of a
            TurtleBot3 in dynamic environments.
          </p>
        ),
      },
      {
        title: 'Multi-map Switching System',
        content: (
          <div className="space-y-4">
            <p>
              We implement a multi-map switching system that allows the TurtleBot3 to switch between different maps
              based on the current environment and task requirements.
            </p>
            <p>
              The system is integrated with{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html"
                rel="noopener noreferrer"
                target="_blank">
                ROS2 Action Server
              </a>{' '}
              and{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://docs.nav2.org/"
                rel="noopener noreferrer"
                target="_blank">
                Nav2 framework
              </a>{' '}
              for seamless navigation.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <img
                  alt="Multi-map switching system demonstration"
                  className="w-full rounded-lg shadow-lg"
                  src="/images/portfolio/multi-map-nav-system.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">Multi-map switching system demonstration</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Nav2 Service Integration',
        content: (
          <div className="space-y-4">
            <p>
              The Nav2 framework provides robust navigation services. Below demonstrates how the system loads different
              maps and performs navigation tasks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <video autoPlay className="w-full rounded-lg shadow-lg" loop muted playsInline>
                  <source src="/videos/Load_map1.mp4" type="video/mp4" />
                </video>
                <p className="text-sm text-gray-400 text-center mt-2">Loading map 1 & initial pose</p>
              </div>
              <div>
                <video autoPlay className="w-full rounded-lg shadow-lg" loop muted playsInline>
                  <source src="/videos/1st_nav.mp4" type="video/mp4" />
                </video>
                <p className="text-sm text-gray-400 text-center mt-2">First navigation task</p>
              </div>
              <div>
                <video autoPlay className="w-full rounded-lg shadow-lg" loop muted playsInline>
                  <source src="/videos/load_map2.mp4" type="video/mp4" />
                </video>
                <p className="text-sm text-gray-400 text-center mt-2">Loading map 2</p>
              </div>
              <div>
                <video autoPlay className="w-full rounded-lg shadow-lg" loop muted playsInline>
                  <source src="/videos/2nd_nav.mp4" type="video/mp4" />
                </video>
                <p className="text-sm text-gray-400 text-center mt-2">Second navigation task</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'ROS2 Action',
        content: (
          <div className="space-y-4">
            <p>
              The multi-map switching system is implemented using{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html"
                rel="noopener noreferrer"
                target="_blank">
                ROS2 Action Server
              </a>
              , allowing for asynchronous map loading and navigation execution.
            </p>
            <div className="my-4 flex justify-center">
              <img
                alt="ROS2 Action Server implementation for multi-map switching"
                className="w-full rounded-lg shadow-lg"
                src="/images/portfolio/Action-SingleActionClient.gif"
              />
            </div>
          </div>
        ),
      },
      {
        title: 'Real-world Deployment',
        content: (
          <div className="space-y-4">
            <p>
              The multi-map switching system is deployed on a real TurtleBot3, demonstrating seamless navigation across
              different maps in a dynamic environment.
            </p>
            <div className="flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/cTmAIjYQQr8?si=h4pOivM19Kn8645d&autoplay=1&loop=1&playlist=cTmAIjYQQr8&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Real-world deployment of the multi-map switching system
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'AprilTag Localization and map switching',
        content: (
          <div className="space-y-4">
            <p>
              The system utilizes <strong>AprilTag</strong> markers for calibration between several waypoints, and help
              to switch between different maps.
            </p>
            <p>
              The AprilTag markers are placed at key locations in the environment, and the robot uses them for accurate
              localization and map switching during navigation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <img
                  alt="AprilTag calibration process"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  src="/images/portfolio/apriltag_calibration.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">AprilTag calibration setup</p>
              </div>
              <div>
                <img
                  alt="AprilTag marker detection"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  src="/images/portfolio/apriltag.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">AprilTag marker detection</p>
              </div>
            </div>
            <video autoPlay className="w-full rounded-lg shadow-lg mt-4" loop muted playsInline>
              <source src="/videos/apriltag_calibration.mp4" type="video/mp4" />
            </video>
            <p className="text-sm text-gray-400 text-center mt-2">AprilTag calibration demonstration</p>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/StanleyChueh/Multi_map_navigation.git'},
      {label: 'ROS2', url: 'https://docs.ros.org/en/humble/index.html'},
      {label: 'Nav2', url: 'https://docs.nav2.org/'},
    ],
  },

  // Project 7(Autonomous Visual Navigation System Development for triceratops)
  'triceratops-nav': {
    title: 'Visual Navigation System for Triceratops Robot',
    description: `
      Developing a visual navigation system for autonomous navigation of a Triceratops robot in indoor environments.
    `.trim(),
    videos: [{src: '/videos/triceratops_visual_nav.mp4', caption: 'Visual navigation demo'}],
    images: [
      {src: '/images/portfolio/triceratops-1.png', caption: 'System setup'},
      {src: '/images/portfolio/triceratops-2.png', caption: 'Training process'},
    ],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            This project demonstrates how the Triceratops robot uses a visual navigation system to navigate indoor
            environments, with Visual SLAM and AprilTag localization for accurate pose estimation and map building.
          </p>
        ),
      },
      {
        title: 'Key Results',
        content: (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ProjectMetric label="Localization" value="Visual SLAM + AprilTag" />
            <ProjectMetric label="Sensing" value="RGB-D camera" />
            <ProjectMetric label="Platform" value="Triceratops quadruped" />
            <ProjectMetric label="Deployed on" value="Real robot, indoor nav" />
          </div>
        ),
      },
      {
        title: 'My Contribution',
        content: <ContributionSection {...triceratopsContribution} />,
      },
      {
        title: 'Robot Setup',
        content: (
          <div className="space-y-4">
            <p>We use the Triceratops robot platform equipped with a RGB-D camera for visual navigation.</p>
            <p>
              The robot is built by{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://www.csltaipeitech.com/en/project/intellisaurus-the-bionic-triceratops-robot"
                rel="noopener noreferrer"
                target="_blank">
                City Science Lab@Taipei Tech Robotic team
              </a>
              , and the low-level control(gait control) is not developed by me, but I developed the visual navigation
              system and integrated it with the robot for autonomous navigation.
            </p>
            <div className="flex justify-center">
              <img
                alt="Triceratops robot platform equipped with a RGB-D camera for visual navigation"
                className="w-3/4 rounded-lg shadow-lg"
                src="/images/portfolio/triceratops.png"
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">Triceratops robot platform setup</p>
          </div>
        ),
      },
      {
        title: 'System Architecture',
        content: (
          <div className="space-y-4">
            <p>
              The visual navigation system consists of several key components, including Visual SLAM for map building
              and localization, and AprilTag markers for accurate pose estimation and map switching.
            </p>
            <img
              alt="Visual navigation system architecture diagram"
              className="w-full rounded-lg shadow-lg"
              src="/images/portfolio/visual-nav.png"
            />
            <p className="text-sm text-gray-400 text-center mt-2">Visual navigation system architecture diagram</p>
          </div>
        ),
      },
      {
        title: 'Visual SLAM',
        content: (
          <div className="space-y-4">
            <p>
              The visual slam we are using is from{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam/tree/release-4.3/isaac_ros_visual_slam"
                rel="noopener noreferrer"
                target="_blank">
                NVIDIA Isaac ROS VSLAM
              </a>
              , and I take visual odometry into account when integrating the visual navigation system with the
              triceratops robot for autonomous navigation in indoor environments.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/p4SCeYuSRyI?si=96NhJyfjlEAXaZ7R&autoplay=1&loop=1&playlist=p4SCeYuSRyI&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Visual SLAM demonstration for map building and localization
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'AprilTag-assisted Localization',
        content: (
          <div className="space-y-4">
            <p>
              As the pure visual navigation system can be noisy and not robust in complex environments, we utilize
              AprilTag markers for accurate localization during indoor navigation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <img
                  alt="AprilTag marker detection for localization and map switching"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  src="/images/portfolio/apriltag.png"
                />
                <p className="text-sm text-gray-400 text-center mt-2">AprilTag marker detection</p>
              </div>
              <div>
                <video autoPlay className="w-full h-64 object-cover rounded-lg shadow-lg" loop muted playsInline>
                  <source src="/videos/apriltag_visual_nav.mp4" type="video/mp4" />
                </video>
                <p className="text-sm text-gray-400 text-center mt-2">AprilTag-assisted localization demo</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/csl-taipeitech/quadruped_robot_4_DOF.git'},
      {
        label: 'VSLAM',
        url: 'https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam/tree/release-4.3/isaac_ros_visual_slam',
      },
    ],
  },

  // Project 8(Autonomous Visual Navigation (local planner) for triceratops)
  'triceratops-local-planner': {
    title: 'Local Planner for Triceratops Visual Navigation System',
    description: `
      Developing a local planner for autonomous navigation of a Triceratops robot in indoor environments.
    `.trim(),
    videos: [{src: '/videos/triceratops_visual_nav.mp4', caption: 'Visual navigation demo'}],
    images: [
      {src: '/images/portfolio/triceratops-1.png', caption: 'System setup'},
      {src: '/images/portfolio/triceratops-2.png', caption: 'Training process'},
    ],
    youtubeIds: [{id: '8RHWoJiWaVc', caption: 'Full demonstration video'}],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            In our previous work, we developed a visual navigation system for the Triceratops robot. How can we improve
            local planning performance for more robust navigation in complex indoor environments?
          </p>
        ),
      },
      {
        title: 'Local Planner Development',
        content: (
          <div className="space-y-4">
            <p>
              As the visual navigation system cannot act like LiDAR-based navigation and use a costmap for local
              planning, we develop a local planner that can take the laserscan data from depth information by using{' '}
              <a
                className="text-blue-400 hover:underline"
                href="https://wiki.ros.org/depthimage_to_laserscan"
                rel="noopener noreferrer"
                target="_blank">
                depth_to_laserscan
              </a>{' '}
              package.
            </p>
            <p>
              The local planner is integrated with the existing visual navigation system, allowing for seamless
              navigation in dynamic obstacle.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/Ryz1dCmaGSo?si=&autoplay=1&loop=1&playlist=Ryz1dCmaGSo&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">Depth to Laserscan Conversion</p>
              </div>
            </div>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    height="100%"
                    src="https://www.youtube.com/embed/g0pCNqtRL8U?si=&autoplay=1&loop=1&playlist=g0pCNqtRL8U&mute=1"
                    style={{border: 'none'}}
                    title="YouTube video player"
                    width="100%"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">Obstacle Avoidance with Depth to Laserscan</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    links: [
      {label: 'Depth to Laserscan', url: 'https://wiki.ros.org/depthimage_to_laserscan'},
      {label: 'Github', url: 'https://github.com/csl-taipeitech/quadruped_robot_4_DOF.git'},
    ],
  },
};

// Required for static export - generates all project pages at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(projects).map(slug => ({
    params: {slug},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params?.slug as string;

  // Check if project exists
  if (!projects[slug]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
    },
  };
};

const ProjectPage: FC<{slug: string}> = memo(({slug}) => {
  const project = projects[slug];

  // Handle project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link className="text-blue-400 hover:underline" href="/#portfolio">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <Page description={project.description} title={`${project.title} | Stanley Chueh`}>
      <div className="min-h-screen bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Back Link */}
          <Link className="text-blue-400 hover:underline mb-8 inline-block" href="/#portfolio">
            ← Back to Portfolio
          </Link>

          {/* Title */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-300">{project.description}</p>
          </section>

          {/* Text Sections */}
          {project.sections?.map((section, index) => (
            <section className="mb-12" key={index}>
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">{section.title}</h2>
              <div className="text-gray-300 leading-relaxed">{section.content}</div>
            </section>
          ))}

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Links</h2>
              <div className="flex flex-wrap gap-4">
                {project.links.map((link, index) => (
                  <a
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                    href={link.url}
                    key={index}
                    rel="noopener noreferrer"
                    target="_blank">
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Page>
  );
});

ProjectPage.displayName = 'ProjectPage';

export default ProjectPage;
