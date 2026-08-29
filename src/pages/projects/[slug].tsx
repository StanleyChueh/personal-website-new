import {FC} from 'react';
import Link from 'next/link';
import {GetStaticPaths, GetStaticProps} from 'next';

// Define all your projects here
const projects: Record<string, {
  title: string;
  description: string;
  videos?: {src: string; caption: string}[];
  images?: {src: string; caption: string}[];
  youtubeIds?: {id: string; caption: string}[];
  sections?: {title: string; content: string | JSX.Element}[];
  links?: {label: string; url: string}[];
}> = {

  // Project 1(Imitation Learning & VLA Development)
  'koch-imitation-learning': {
    title: 'Imitation Learning with low-cost robotic arm',
    description: `
      Imagine a robotic arm that can learn to perform tasks 
      just by watching human demonstrations! 
    `.trim(),
    videos: [
      {src: '/videos/koch_open_drawer.mp4', caption: 'Robot opening drawer demo'},
    ],
    images: [
      {src: '/images/portfolio/Franka_open_drawer.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p>
              This project demonstrates how low-cost robotic arms{' '}
              <strong>
                (<a href="https://github.com/jess-moss/koch-v1-1" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Koch</a>)
              </strong>{' '}
              can learn from human demonstrations using{' '}
              <strong>
                imitation learning by 
              </strong>{' '}
              <strong>
                <a href="https://huggingface.co/docs/lerobot/act" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Action Chunking Transformer (ACT)</a>
              </strong>.
            </p>
            <img 
              src={`/images/portfolio/lerobot-pipeline-koch.png`}
              alt="LeRobot Pipeline - How imitation learning models are trained"
              className="w-full rounded-lg shadow-lg mt-4"
            />
            <p className="text-sm text-gray-400 text-center">LeRobot Pipeline: Training imitation learning models by Koch robot</p>
          </div>
        ),
      },
      {
        title: '1. Data Collection',
        content: (
          <div className="space-y-4">
            <p>
              The first step is collecting high-quality demonstration data from human teleoperation.
            </p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong>LeRobot dataset format</strong>, which stores episodes as Parquet files 
              containing <strong> observation(following robot joint states) </strong>, and <strong> action(leading arm's joint states) </strong> and mp4 for top and front camera observation.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (16-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"LJ1.pos"'}</li>
                <li>{'"LJ2.pos"'}</li>
                <li>{'"LJ3.pos"'}</li>
                <li>{'"LJ4.pos"'}</li>
                <li>{'"LJ5.pos"'}</li>
                <li>{'"LJ6.pos"'}</li>
                <li>{'"LJ7.pos"'}</li>
                <li>{'"LJ8.pos"'}</li>
                <li>{'"RJ1.pos"'}</li>
                <li>{'"RJ2.pos"'}</li>
                <li>{'"RJ3.pos"'}</li>
                <li>{'"RJ4.pos"'}</li>
                <li>{'"RJ5.pos"'}</li>
                <li>{'"RJ6.pos"'}</li>
                <li>{'"RJ7.pos"'}</li>
                <li>{'"RJ8.pos"'}</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"observation.images.front"'}</li>
                <li>{'"observation.images.top"'}</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">LeRobot dataset structure with joint positions and camera observations</p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Human demonstrations are collected via <strong>teleoperation</strong> using a leader-follower 
              setup, where the operator controls a leader arm and the follower arm mimics the movements.
            </p>
                <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/PNdkYEWuSUE?si=&autoplay=1&loop=1&playlist=PNdkYEWuSUE&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
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
              After collecting demonstration data, we train imitation learning models to 
              predict robot actions from visual observations.
            </p>

            {/* ACT Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">
                ACT (Action Chunking Transformer)
              </h3>
              <p className="mb-3">
                A <strong>pure imitation learning</strong> approach that predicts <strong>action sequences("chunks") rather than single actions </strong> . 
                It uses a transformer encoder-decoder architecture 
                with a CVAE (Conditional Variational Autoencoder) for modeling action distributions.
              </p>
              <div className="my-4">
                <img 
                  src={`/images/portfolio/act-paper.png`}
                  alt="ACT Architecture - Action Chunking Transformer from the original paper"
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  ACT Architecture (Source: <a href="https://arxiv.org/abs/2304.13705" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ACT Paper</a>)
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
            <p>
              The trained model is deployed on the robot for real-time inference 
              and autonomous task execution.
            </p>
            {/* Task Setup Video */}            
            <h3 className="text-lg font-semibold text-white mt-6">Real-time Inference</h3>
            <p>
              The model runs at <strong>~30Hz</strong>, predicting action chunks that are 
              executed by the robot controller in real-time.
            </p>
            
            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
              <div className="aspect-video">
                <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Szx_Pt8DylI?si=&autoplay=1&loop=1&playlist=Szx_Pt8DylI&mute=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
                style={{border: 'none'}}
                />
              </div>
              <p className="text-sm text-gray-400 text-center mt-2">Autonomous task execution after 50 episodes training</p>
              </div>
              
                <div>
                <div className="aspect-video">
                  <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/vlrDY3Pzqec?si=&autoplay=1&loop=1&playlist=vlrDY3Pzqec&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">Real-time action classification using the trained ACT model</p>
                </div>
            </div>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/huggingface/lerobot.git'},
      {label: 'Paper', url: 'https://arxiv.org/abs/2304.13705'},
    ],
  },

  // Project 2(Imitation Learning & VLA Development)
  'franka-imitation-learning': {
    title: 'Imitation Learning with Franka Emika Panda',
    description: `
      How to transfer the imitation learning techniques to a more complex robotic arm like Franka Emika Panda.
    `.trim(),
    videos: [
      {src: '/videos/franka_open_drawer.mp4', caption: 'Robot opening drawer demo'},
    ],
    images: [
      {src: '/images/portfolio/franka-1.png', caption: 'System setup'},
      {src: '/images/portfolio/franka-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            In previous work, we demonstrated how robotic arms can learn from human demonstrations through{' '}
            <strong>Action Chunking Transformer(ACT).{' '}In this part, we demonsrate how we shift to Franka emika panda </strong>.
          </p>
        ),
      },
      {
        title: '1. Data Collection',
        content: (
          <div className="space-y-4">
            <p>
              The first step is collecting high-quality demonstration data from human teleoperation.
            </p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong> same LeRobot dataset format</strong>, which stores episodes as Parquet files 
              and mp4 for front and wrist camera observation.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (7-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"eef_x"'}</li>
                <li>{'"eef_y"'}</li>
                <li>{'"eef_z"'}</li>
                <li>{'"eef_quat_x"'}</li>
                <li>{'"eef_quat_y"'}</li>
                <li>{'"eef_quat_z"'}</li>
                <li>{'"eef_quat_w"'}</li>
                <li>{'"gripper_width"'}</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"observation.images.front"'}</li>
                <li>{'"observation.images.wrist_front"'}</li>
                <li>{'"observation.images.wrist_rear"'}</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">LeRobot dataset structure with end effector positions, quaternions and camera observations</p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Human demonstrations are collected via <strong>teleoperation</strong> using a leader-follower 
              setup, where the operator controls a leader arm and the follower arm mimics the movements.
            </p>

            <p className="text-sm text-gray-400">
              Detail: We utilize <a href="https://arxiv.org/abs/2309.13037" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GELLO project</a> to mimic the similar method we use on koch robot in data collection.
              We are using joint impedance control for Franka Emika Panda by <a href="https://github.com/frankaemika/franka_ros" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Franka ROS</a> and using leading arm's joint states to control the follower arm in a leader-follower teleoperation setup.
            </p>
            <div className="aspect-video mt-4">
              <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/OhipjlzHnjo?autoplay=1&loop=1&playlist=OhipjlzHnjo&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg shadow-lg"
              style={{border: 'none'}}
              />
            </div>
            <p className="text-sm text-gray-400 text-center">Leader-follower teleoperation for data collection</p>

            <h4 className="text-lg font-semibold text-white mt-6">Previous Control Method</h4>
            <p>
              Previously, we employed <strong>Vision Pro</strong> to control the Franka Emika Panda. 
              Vision pro detects the operator's hand to utilize relative movement to control robot relative end effector movement.
            </p>
            <p>
              However, we realized that vision pro control is not intuitve for this Franka Emika panda setup, it might be useful in bimanual robots.
            </p>
            <p className="text-sm text-gray-400">
              Detail: we are inspired by Unitree Robotic <a href="https://github.com/unitreerobotics/xr_teleoperate.git" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Avp_teleoperate</a> which also uses vision pro for data collection. We are using the same method in our early stage of data collection before we switch to leader-follower teleoperation method.
            </p>
            <div className="aspect-video mt-4">
              <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/KvCzDGHlaKs?si=&autoplay=1&loop=1&playlist=KvCzDGHlaKs&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg shadow-lg"
              style={{border: 'none'}}
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
              After collecting demonstration data, we train imitation learning models to 
              predict robot actions from visual observations.
            </p>

            {/* ACT Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">
                ACT (Action Chunking Transformer)
              </h3>
              <p className="mb-3">
                A <strong>pure imitation learning</strong> approach that predicts <strong>action sequences("chunks") rather than single actions </strong> . 
                It uses a transformer encoder-decoder architecture 
                with a CVAE (Conditional Variational Autoencoder) for modeling action distributions.
              </p>
              <div className="my-4">
                <img 
                  src={`/images/portfolio/act-paper.png`}
                  alt="ACT Architecture - Action Chunking Transformer from the original paper"
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  ACT Architecture (Source: <a href="https://arxiv.org/abs/2304.13705" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ACT Paper</a>)
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
            <p>
              The trained model is deployed on the robot for real-time inference 
              and autonomous task execution.
            </p>
            {/* Task Setup Video */}            
            <h3 className="text-lg font-semibold text-white mt-6">Real-time Inference</h3>
            <p>
              The model runs at <strong>~10Hz</strong>, predicting action chunks that are 
              executed by the robot controller in real-time.
            </p>
            
            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                <div className="aspect-video">
                  <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/zfraKg9_tjE?si=&autoplay=1&loop=1&playlist=zfraKg9_tjE&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">Autonomous task execution after 100 episodes training <a href="https://huggingface.co/datasets/ethanCSL/open_drawer" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset</a></p>
                </div>
              
                <div>
                <div className="aspect-video">
                  <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/mgxuhl4MoaA?autoplay=1&loop=1&playlist=mgxuhl4MoaA&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
                  />
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">Autonomous pick-and-place task execution after 100 episodes training (robustness testing) <a href="https://huggingface.co/datasets/ethanCSL/pick_n_place_100" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset</a></p> 
                </div>
            </div>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/huggingface/lerobot.git'},
      {label: 'Paper', url: 'https://arxiv.org/abs/2304.13705'},
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
    videos: [
      {src: '/videos/koch_open_drawer.mp4', caption: 'Robot opening drawer demo'},
    ],
    images: [
      {src: '/images/portfolio/koch-1.png', caption: 'System setup'},
      {src: '/images/portfolio/koch-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
            <div>
                <p>
                  In previous work, we demonstrate how we use Action Chunking Transformer(ACT) to enable robotic arms to learn from human demonstrations,but language can not be directly used. 
                </p>
                <p>
                  This project demonstrates how robotic arms can learn using{' '}
                  <strong>Visual Language Action (VLA)</strong> models like{' '}
                  <a href="https://arxiv.org/abs/2506.01844" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">SmolVLA</a>, 
                  that we can use language instructions with.
                </p>
            </div>
        ),
      },
      {
        title: '1. Data Collection',
        content: (
          <div className="space-y-4">
            <p>
              In data collection, we use the same setup as the previous projects, but we also collect language instructions along with the demonstrations.
            </p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong>LeRobot dataset format</strong>, which stores episodes as Parquet files 
              containing <strong> observation(following robot joint states) </strong>, and <strong> action(leading arm's joint states) </strong> and mp4 for top and front camera observation.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (16-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"LJ1.pos"'}</li>
                <li>{'"LJ2.pos"'}</li>
                <li>{'"LJ3.pos"'}</li>
                <li>{'"LJ4.pos"'}</li>
                <li>{'"LJ5.pos"'}</li>
                <li>{'"LJ6.pos"'}</li>
                <li>{'"LJ7.pos"'}</li>
                <li>{'"LJ8.pos"'}</li>
                <li>{'"RJ1.pos"'}</li>
                <li>{'"RJ2.pos"'}</li>
                <li>{'"RJ3.pos"'}</li>
                <li>{'"RJ4.pos"'}</li>
                <li>{'"RJ5.pos"'}</li>
                <li>{'"RJ6.pos"'}</li>
                <li>{'"RJ7.pos"'}</li>
                <li>{'"RJ8.pos"'}</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"observation.images.front"'}</li>
                <li>{'"observation.images.top"'}</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">LeRobot dataset structure with joint positions and camera observations</p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Human demonstrations are collected via <strong>teleoperation</strong> using a leader-follower 
              setup, where the operator controls a leader arm and the follower arm mimics the movements.
            </p>
              <div className="aspect-video mt-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/PNdkYEWuSUE?si=&autoplay=1&loop=1&playlist=PNdkYEWuSUE&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
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
              After collecting demonstration data, we train VLA model(SmolVLA) to 
              predict robot actions from visual observations and language instructions.
            </p>

            {/* SmolVLA Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">
                SmolVLA (Small Vision-Language Action Model)
              </h3>
              <p className="mb-3">
                Unlike common VLA models that use large vision-language backbones, SmolVLA is a lightweight model designed for fast training and inference on robotic arms.
              </p>
              <div className="my-4">
                <img 
                  src={`/images/portfolio/smolvla-paper.png`}
                  alt="SmolVLA Architecture - Small Vision-Language Action Model from the original paper"
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  SmolVLA Architecture (Source: <a href="https://arxiv.org/abs/2506.01844" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">SmolVLA Paper</a>)
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Strengths</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Fast training (Lightweight architecture)</li>
                    <li>• Resource constraint (efficient inference)</li>
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
                  The trained model is deployed on the robot for real-time inference
                  and autonomous task execution.
                </p>
                {/* Task Setup Video */}
                <h3 className="text-lg font-semibold text-white mt-6">Real-time Inference</h3>
                <p>
                  The model runs at <strong>~30Hz</strong>, predicting actions that are
                  executed by the robot controller in real-time.
                </p>
                {/* YouTube Video */}
                <div className="mt-4 flex justify-center">
                  <div className="max-w-2xl w-full">
                  <div className="aspect-video">
                    <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Xi3LRSgJ_ro?si=&autoplay=1&loop=1&playlist=Xi3LRSgJ_ro&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    style={{border: 'none'}}
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center mt-2">Autonomous real-time task switching execution after 100 episodes for each task after training <a href="https://huggingface.co/datasets/ethanCSL/svla_koch_sorting_n_stacking_screw_nut" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset</a></p>
                </div>
                </div>
                {/* YouTube Video */}
                <div className="mt-6 flex justify-center">
                  <div className="max-w-2xl w-full">
                    <div className="aspect-video">
                    <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/zdFU9ku4Wcg?si=bJjzFVhdc2FZIbdA&autoplay=1&loop=1&playlist=zdFU9ku4Wcg&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    style={{border: 'none'}}
                    />
                    </div>
                  <p className="text-sm text-gray-400 text-center mt-2">Autonomous real-time task switching execution after 60 episodes for each task after training <a href="https://huggingface.co/datasets/ethanCSL/color_test_green" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset</a></p>
                  </div>
                </div>
              </div>
            ),
        },
          ],
          links: [
            {label: 'GitHub', url: 'https://github.com/huggingface/lerobot.git'},
            {label: 'Paper', url: 'https://arxiv.org/abs/2506.01844'},
          ],
        },

  // Project 4(Imitation Learning & VLA Development)
  'OpenArm-vla': {
    title: 'VLAs with bimanual robotic arm(OpenArm)',
    description: `
      Can we train VLAs on fully simulated bimanual robotic arms and transfer to real-world tasks?
    `.trim(),
    videos: [
      {src: '/videos/koch_open_drawer.mp4', caption: 'Robot opening drawer demo'},
    ],
    images: [
      {src: '/images/portfolio/koch-1.png', caption: 'System setup'},
      {src: '/images/portfolio/koch-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
            <div className="space-y-4">
                <p>
                  In previous work, we demonstrate how we use Action Chunking Transformer(ACT) and SmolVLA to enable robotic arms to learn from human demonstrations and language instructions, but we only use low-cost single-arm robots,
                  and all models are trained on real-world data. In this project, we explore how to train VLAs on fully simulated bimanual robotic arms and transfer to real-world tasks.
                </p>
                <img
                  src="/images/portfolio/Real2Sim2Real_pipeline.png"
                  alt="Real2Sim2Real pipeline"
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-400 text-center">
                  Real2Sim2Real pipeline for training bimanual robot policies
                </p>
            </div>
        ),
      },
      {
        title: '1. Teleoperation - Isaac Sim',
        content: (
          <div className="space-y-4">
            <p>
              In data collection, we use the same setup as the previous projects, but we also collect language instructions along with the demonstrations.
            </p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong>LeRobot dataset format</strong>, which stores episodes as Parquet files 
              containing <strong> observation(Robot joint states) </strong>, and <strong> action(Joint states commands) </strong> and mp4 for body camera and two wrist cameras observation.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (16-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"LJ1.pos"'}</li>
                <li>{'"LJ2.pos"'}</li>
                <li>{'"LJ3.pos"'}</li>
                <li>{'"LJ4.pos"'}</li>
                <li>{'"LJ5.pos"'}</li>
                <li>{'"LJ6.pos"'}</li>
                <li>{'"LJ7.pos"'}</li>
                <li>{'"LJ8.pos"'}</li>
                <li>{'"RJ1.pos"'}</li>
                <li>{'"RJ2.pos"'}</li>
                <li>{'"RJ3.pos"'}</li>
                <li>{'"RJ4.pos"'}</li>
                <li>{'"RJ5.pos"'}</li>
                <li>{'"RJ6.pos"'}</li>
                <li>{'"RJ7.pos"'}</li>
                <li>{'"RJ8.pos"'}</li>
              </ul>
              <p className="text-green-400 mb-2 mt-4"># Camera Observations</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"observation.images.body_cam"'}</li>
                <li>{'"observation.images.wrist_cam"'}</li>
                <li>{'"observation.images.right_wrist_cam"'}</li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">LeRobot dataset structure with joint positions and camera observations</p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Control Method</h3>
            <p>
              Demonstrations are collected via <strong>teleoperation</strong> using Meta Quest3 Pro in Isaac Sim.
            </p>
              <div className="aspect-video mt-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/PNdkYEWuSUE?si=&autoplay=1&loop=1&playlist=PNdkYEWuSUE&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
                />
              </div>
            <p className="text-sm text-gray-400 text-center">Leader-follower teleoperation for data collection, reference: <a href="https://github.com/enactic/dora-openarm-data-collection.git" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">[Github]</a></p>

            <h3 className="text-lg font-semibold text-white mt-6">Source dataset</h3>
            <p>
              The collected dataset is available on <a href="https://huggingface.co/datasets/ethanCSL/openarm_visuomotor_VR_pringles_V9" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hugging Face</a>.
            </p>
            <img
              src="/images/portfolio/pringles_handover_visualizer.png"
              alt="Pringles handover visualizer"
              className="w-full rounded-lg shadow-lg mt-4"
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
              After collecting small amount of demonstration data(ex: 10 demos), we generate a large-scale dataset(~400 demos) in Isaac Sim by randomizing pringles positions, size, textures, lighting and background.
            </p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Dataset Annotation</h3>
            <p>
              For dataset generation(Isaac Lab Mimic), we have to annotate each episode into several subtasks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="space-y-4 md:col-span-2">
                <h4 className="text-base font-semibold text-white">right arm</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <video
                      src="/videos/openarm_right_1.mp4"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full aspect-video object-cover rounded-lg shadow-lg"
                    />
                    <p className="text-sm text-gray-400 text-center mt-2">Segment1: Reach → grasp</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <video
                      src="/videos/openarm_right_2.mp4"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full aspect-video object-cover rounded-lg shadow-lg"
                    />
                    <p className="text-sm text-gray-400 text-center mt-2">Srgment2:Handover → Release → Return</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 md:col-span-1">
                <h4 className="text-base font-semibold text-white">left arm</h4>
                <div className="flex flex-col items-center">
                  <video
                    src="/videos/openarm_left.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-video object-cover rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-gray-400 text-center mt-2">Segment3:Wait → Handover → Return</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6">Dataset Generation</h3>

            <p>
              After annotating the source dataset, we can use Isaac Lab Mimic to generate a large-scale dataset by randomizing pringles positions, size, textures, lighting and background.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
              <video
                src="/videos/isaaclab_mimic_1.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
              />
              <video
                src="/videos/isaaclab_mimic_2.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
              />
              <video
                src="/videos/isaaclab_mimic_3.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
              />
              <video
                src="/videos/isaaclab_mimic_4.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
              />
              <video
                src="/videos/isaaclab_mimic_5.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover rounded-lg shadow-lg"
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">
              Domain randomization in Isaac Lab Mimic introduces varied lighting and backgrounds to improve dataset diversity. <a href="https://huggingface.co/ethanCSL/openarm_visuomotor_VR_pringles_V14_background_30hz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset</a>
            </p>
          </div>
        ),
      },
      {
        title: '2. Model Training',
        content: (
          <div className="space-y-6">
            <p>
              After generating enough diverse data, we train VLA model(SmolVLA) to 
              predict robot actions from visual observations and language instructions.
            </p>

            {/* SmolVLA Section */}
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-3">
                SmolVLA (Small Vision-Language Action Model)
              </h3>
              <p className="mb-3">
                Unlike common VLA models that use large vision-language backbones, SmolVLA is a lightweight model designed for fast training and inference on robotic arms.
              </p>
              <div className="my-4">
                <img 
                  src={`/images/portfolio/smolvla-paper.png`}
                  alt="SmolVLA Architecture - Small Vision-Language Action Model from the original paper"
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  SmolVLA Architecture (Source: <a href="https://arxiv.org/abs/2506.01844" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">SmolVLA Paper</a>)
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Strengths</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Fast training (Lightweight architecture)</li>
                    <li>• Resource constraint (efficient inference)</li>
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
                  We deploy model on simulated OpenArm and real-world OpenArm for real-time inference and autonomous task execution.
                </p>
                {/* Task Setup Video */}
                <h3 className="text-lg font-semibold text-white mt-6">Deployment in Isaac Sim</h3>
                <p>
                  The success rate in Isaac Sim is 80% for 100 rollouts, and the model runs at <strong>~30Hz</strong>, predicting actions that are executed by the robot controller in real-time.
                </p>
                {/* YouTube Video */}
                <div className="mt-4 flex justify-center">
                  <div className="max-w-2xl w-full">
                  <div className="aspect-video">
                    <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Xi3LRSgJ_ro?si=5ilrH2fEY7J_S4fR&autoplay=1&loop=1&playlist=Xi3LRSgJ_ro&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    style={{border: 'none'}}
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center mt-2">Autonomous real-time task switching execution after 100 episodes for each task after training <a href="https://huggingface.co/datasets/ethanCSL/svla_koch_sorting_n_stacking_screw_nut" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset</a></p>
                </div>
                </div>

                <h3 className="text-lg font-semibold text-white mt-6">Deployment in Real-world</h3>
                <p>
                  The success rate in real-world is around 40% for 10 rollouts, and the model runs at <strong>~30Hz</strong>, predicting actions that are executed by the robot controller in real-time.
                </p>
                {/* YouTube Video */}
                <div className="mt-4 flex justify-center">
                  <div className="max-w-2xl w-full">
                  <div className="aspect-video">
                    <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/4DKriauQ05g?si=caoTgI-4_Zse6fU6&autoplay=1&loop=1&playlist=4DKriauQ05g&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                    style={{border: 'none'}}
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center mt-2">Autonomous execution in real-world scenarios <a href="https://huggingface.co/ethanCSL/openarm_visuomotor_VR_pringles_V14_background_30hz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">model</a></p>
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
                While the model performs well in simulation, there are still challenges in transferring to real-world scenarios. Future work will focus on improving the model's robustness and generalization capabilities.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li> Fixing simulation-to-real-world domain gaps</li>
                <li> Switch to another VLAs as GR00T N1.7, PI0.7...</li>
                <li> Fixing jerky trajectories in real-world deployment</li>
              </ul>
            </div>
          ),
        }
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
    videos: [
      {src: '/videos/turtlebot_multi_map.mp4', caption: 'Multi-map switching demo'},
    ],
    images: [
      {src: '/images/portfolio/turtlebot-1.png', caption: 'System setup'},
      {src: '/images/portfolio/turtlebot-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            This project demonstrates how to use Turtlebot3 for autonomous navigation in dynamic environments using a hybrid A* algorithm from simulation to real-world deployment.
          </p>
        ),
      },
      {
        title: 'Robot Setup',
        content: (
          <div className="space-y-4">
            <p>
              We use the TurtleBot3 Burger platform equipped with a LiDAR sensor for navigation.
            </p>
            <div className="flex justify-center">
              <img
              src={`/images/portfolio/turtlebot3.png`}
              alt="TurtleBot3 Burger platform equipped with a LiDAR sensor for navigation"
              className="w-3/4 rounded-lg shadow-lg"
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
              We implement a hybrid A* algorithm that combines grid-based A* and sampling-based RRT for efficient path planning in dynamic environments. The algorithm is tested in simulation and real-world scenarios.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/WlBBGpIwAvg?si=1b6nyTCwvE3p-iRs&autoplay=1&loop=1&playlist=WlBBGpIwAvg"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
                />
              </div>
            <p className="text-sm text-gray-400 text-center mt-2">Hybrid A* Algorithm visualization(Gazebo to Real-world)</p>
            </div>
          </div>
          </div>
        ),
      }
          ],
          links: [
            {label: 'GitHub', url: 'https://github.com/yourusername/turtlebot-multi-map'},
            {label: 'Paper', url: 'https://arxiv.org/abs/xxxx.xxxxx'},
          ],
        },
  
  // Project 6(Autonomous Navigation System Development for spot)
  'turtlebot-multi-map-nav': {
    title: 'Multi-map Switching System for TurtleBot Navigation',
    description: `
      Developing a multi-map switching system for autonomous navigation of a TurtleBot in dynamic environments.
    `.trim(),
    videos: [
      {src: '/videos/turtlebot_multi_map.mp4', caption: 'Multi-map switching demo'},
    ],
    images: [
      {src: '/images/portfolio/turtlebot-1.png', caption: 'System setup'},
      {src: '/images/portfolio/turtlebot-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
    {
        title: 'Overview',
        content: (
          <p>
            This project demonstrates how to implement a multi-map switching system for autonomous navigation of a TurtleBot3 in dynamic environments.
          </p>
        ),
    },
    {
        title: 'Multi-map Switching System',
        content: (
          <div className="space-y-4">
            <p>
              We implement a multi-map switching system that allows the TurtleBot3 to switch between different maps based on the current environment and task requirements.
            </p>
            <p>
              The system is integrated with <a href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ROS2 Action Server</a> and <a href="https://docs.nav2.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Nav2 framework</a> for seamless navigation.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
              <img
                src="/images/portfolio/multi-map-nav-system.png"
                alt="Multi-map switching system demonstration"
                className="w-full rounded-lg shadow-lg"
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
                The Nav2 framework provides robust navigation services. Below demonstrates how the system loads different maps and performs navigation tasks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-lg shadow-lg"
            >
              <source src="/videos/Load_map1.mp4" type="video/mp4" />
            </video>
            <p className="text-sm text-gray-400 text-center mt-2">Loading map 1 & initial pose</p>
          </div>
          <div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-lg shadow-lg"
            >
              <source src="/videos/1st_nav.mp4" type="video/mp4" />
            </video>
            <p className="text-sm text-gray-400 text-center mt-2">First navigation task</p>
          </div>
          <div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-lg shadow-lg"
            >
              <source src="/videos/load_map2.mp4" type="video/mp4" />
            </video>
            <p className="text-sm text-gray-400 text-center mt-2">Loading map 2</p>
          </div>
          <div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-lg shadow-lg"
            >
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
                  The multi-map switching system is implemented using <a href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ROS2 Action Server</a>
                  , allowing for asynchronous map loading and navigation execution.
                </p>
              <div className="my-4 flex justify-center">
                <img
                  src="/images/portfolio/Action-SingleActionClient.gif"
                  alt="ROS2 Action Server implementation for multi-map switching"
                  className="w-full rounded-lg shadow-lg"
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
                The multi-map switching system is deployed on a real TurtleBot3, demonstrating seamless navigation across different maps in a dynamic environment.
              </p>
              <div className="flex justify-center">
              <div className="max-w-2xl w-full">
              <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/cTmAIjYQQr8?si=h4pOivM19Kn8645d&autoplay=1&loop=1&playlist=cTmAIjYQQr8&mute=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
                style={{border: 'none'}}
              />
              </div>
              <p className="text-sm text-gray-400 text-center mt-2">Real-world deployment of the multi-map switching system</p>
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
              The system utilizes <strong>AprilTag</strong> markers for calibration between several waypoints, and help to switch between different maps. 
            </p>
            <p>
              The AprilTag markers are placed at key locations in the environment, and the robot uses them for accurate localization and map switching during navigation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
              <img
              src="/images/portfolio/apriltag_calibration.png"
              alt="AprilTag calibration process"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-400 text-center mt-2">AprilTag calibration setup</p>
              </div>
              <div>
              <img
              src="/images/portfolio/apriltag.png"
              alt="AprilTag marker detection"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-400 text-center mt-2">AprilTag marker detection</p>
              </div>
            </div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-lg shadow-lg mt-4"
            >
              <source src="/videos/apriltag_calibration.mp4" type="video/mp4" />
            </video>
            <p className="text-sm text-gray-400 text-center mt-2">AprilTag calibration demonstration</p>
            </div>
            ),
            
      }
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
    videos: [
      {src: '/videos/triceratops_visual_nav.mp4', caption: 'Visual navigation demo'},
    ],
    images: [
      {src: '/images/portfolio/triceratops-1.png', caption: 'System setup'},
      {src: '/images/portfolio/triceratops-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            This project demonstates how triceratops robot can use visual navigation system to navigate in indoor environments,
            with Visual SLAM and AprilTag localization for accurate pose estimation and map building.
          </p>
        ),
      },
      {
        title:'Robot Setup',
        content: (
          <div className="space-y-4">
            <p>
              We use the Triceratops robot platform equipped with a RGB-D camera for visual navigation.
            </p>
            <p>
              The robot is built by <a href="https://www.csltaipeitech.com/en/project/intellisaurus-the-bionic-triceratops-robot" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">City Science Lab@Taipei Tech Robotic team</a>, and the low-level control(gait control) is not developed by me, but I developed the visual navigation system and integrated it with the robot for autonomous navigation.
            </p>
            <div className="flex justify-center">
              <img
              src={`/images/portfolio/triceratops.png`}
              alt="Triceratops robot platform equipped with a RGB-D camera for visual navigation"
              className="w-3/4 rounded-lg shadow-lg"
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
              The visual navigation system consists of several key components, including Visual SLAM for map building and localization, and AprilTag markers for accurate pose estimation and map switching.
            </p>
            <img
              src="/images/portfolio/visual-nav.png"
              alt="Visual navigation system architecture diagram"
              className="w-full rounded-lg shadow-lg"
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
              The visual slam we are using is from <a href="https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam/tree/release-4.3/isaac_ros_visual_slam" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NVIDIA Isaac ROS VSLAM</a>, 
              and I take visual odometry into account when integrating the visual navigation system with the triceratops robot for autonomous navigation in indoor environments.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/p4SCeYuSRyI?si=96NhJyfjlEAXaZ7R&autoplay=1&loop=1&playlist=p4SCeYuSRyI&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg shadow-lg"
              style={{border: 'none'}}
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-2">Visual SLAM demonstration for map building and localization</p>
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
              As the pure visual navigation system can be noisy and not robust in complex environments, 
              we utilize AprilTag markers for accurate localization during indoor navigation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
          <img
            src="/images/portfolio/apriltag.png"
            alt="AprilTag marker detection for localization and map switching"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <p className="text-sm text-gray-400 text-center mt-2">AprilTag marker detection</p>
              </div>
              <div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          >
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
            {label: 'VSLAM', url: 'https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam/tree/release-4.3/isaac_ros_visual_slam'},
          ],
        },

  // Project 8(Autonomous Visual Navigation (local planner) for triceratops)
  'triceratops-local-planner': {
    title: 'Local Planner for Triceratops Visual Navigation System',
    description: `
      Developing a local planner for autonomous navigation of a Triceratops robot in indoor environments.
    `.trim(),
    videos: [
      {src: '/videos/triceratops_visual_nav.mp4', caption: 'Visual navigation demo'},
    ],
    images: [
      {src: '/images/portfolio/triceratops-1.png', caption: 'System setup'},
      {src: '/images/portfolio/triceratops-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            In previous work, we developed a visual navigation system for the Triceratops robot, 
            but how can we improve the local planning performance for more robust navigation in complex indoor environments?
          </p>
        ),
      },
      {
        title: 'Local Planner Development',
        content: (
          <div className="space-y-4">
            <p>
              As the visual navigation system can not act like LiDAR-based naviagtion to use costmap for local planning, 
              we develop a local planner that can take the laserscan data from depth information by using <a href="https://wiki.ros.org/depthimage_to_laserscan" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">depth_to_laserscan</a> package.
            </p>
            <p>
              The local planner is integrated with the existing visual navigation system, allowing for seamless navigation in dynamic obstacle.
            </p>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Ryz1dCmaGSo?si=&autoplay=1&loop=1&playlist=Ryz1dCmaGSo&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
                />
                </div>
              <p className="text-sm text-gray-400 text-center mt-2">Depth to Laserscan Conversion</p>
              </div>
            </div>
            <div className="my-4 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/g0pCNqtRL8U?si=&autoplay=1&loop=1&playlist=g0pCNqtRL8U&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                  style={{border: 'none'}}
                />
                </div>
              <p className="text-sm text-gray-400 text-center mt-2">Obstacle Avoidance with Depth to Laserscan</p>
              </div>
            </div>
          </div>
        ),
      }

    ],
    links: [
      {label: 'Depth to Laserscan', url: 'https://wiki.ros.org/depthimage_to_laserscan'},
      {label: 'Github', url: 'https://github.com/csl-taipeitech/quadruped_robot_4_DOF.git'},
    ],
  },
};

// Required for static export - generates all project pages at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(projects).map((slug) => ({
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

const ProjectPage: FC<{slug: string}> = ({slug}) => {
  const project = projects[slug];

  // Handle project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/#portfolio" className="text-blue-400 hover:underline">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link href="/#portfolio" className="text-blue-400 hover:underline mb-8 inline-block">
          ← Back to Portfolio
        </Link>

        {/* Title */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-300">{project.description}</p>
        </section>

        {/* Text Sections */}
        {project.sections?.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              {section.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </section>
        ))}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProjectPage;
