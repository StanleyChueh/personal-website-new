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
      {src: '/videos/koch_open_draw.mp4', caption: 'Robot opening drawer demo'},
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
              <p className="text-green-400 mb-2"># Robot Joint States (6-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"shoulder_pan.pos"'}</li>
                <li>{'"shoulder_lift.pos"'}</li>
                <li>{'"elbow_flex.pos"'}</li>
                <li>{'"wrist_flex.pos"'}</li>
                <li>{'"wrist_roll.pos"'}</li>
                <li>{'"gripper.pos"'}</li>
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
              <img 
                src={`/images/portfolio/koch-teleop.gif`}
                alt="Leader-follower teleoperation for data collection"
                className="w-full rounded-lg shadow-lg mt-2"
              />
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
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg shadow-lg"
                >
                  <source src={`/videos/koch_open_drawer.mp4`} type="video/mp4" />
                </video>
                <p className="text-sm text-gray-400 text-center mt-2">Autonomous task execution after 50 episodes training</p>
              </div>
              
              <div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg shadow-lg"
                >
                  <source src={`/videos/lerobot_classification.mp4`} type="video/mp4" />
                </video>
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
      {src: '/videos/franka_open_draw.mp4', caption: 'Robot opening drawer demo'},
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

            <p>
              Detail: We utilize <a href="https://arxiv.org/abs/2309.13037" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GELLO project</a> to mimic the similar method we use on koch robot in data collection.
              We are using joint impedance control for Franka Emika Panda by <a href="https://github.com/frankaemika/franka_ros" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Franka ROS</a> and using leading arm's joint states to control the follower arm in a leader-follower teleoperation setup.
            </p>
                <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-lg shadow-lg mt-2"
                >
                <source src="/videos/franka_data_collection.mp4" type="video/mp4" />
                </video>
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
              The model runs at <strong>~10Hz</strong>, predicting action chunks that are 
              executed by the robot controller in real-time.
            </p>
            
            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg shadow-lg"
                >
                  <source src={`/videos/franka_open_drawer.mp4`} type="video/mp4" />
                </video>
                <p className="text-sm text-gray-400 text-center mt-2">Autonomous task execution after 100 episodes training <a href="https://huggingface.co/datasets/ethanCSL/open_drawer" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dataset</a></p>
              </div>
              
              <div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg shadow-lg"
                >
                  <source src={`/videos/ACT_pick_n_place_robust.mp4`} type="video/mp4" />
                </video>
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
            <p>
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models like{' '}
            <a href="https://arxiv.org/abs/2506.01844" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">SmolVLA</a>.
            </p>
        ),
      },
      {
        title: '1. Data Collection',
        content: (
          <div className="space-y-4">
            <p>
              In data collection, we use the same as the previous project, but we also collect language instructions along with the demonstrations.
            </p>
            
            <h3 className="text-lg font-semibold text-white mt-6">Dataset Format</h3>
            <p>
              We use the <strong>LeRobot dataset format</strong>, which stores episodes as Parquet files 
              containing <strong> observation(following robot joint states) </strong>, and <strong> action(leading arm's joint states) </strong> and mp4 for top and front camera observation.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 mt-4 font-mono text-sm">
              <p className="text-green-400 mb-2"># Robot Joint States (6-DOF)</p>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>{'"shoulder_pan.pos"'}</li>
                <li>{'"shoulder_lift.pos"'}</li>
                <li>{'"elbow_flex.pos"'}</li>
                <li>{'"wrist_flex.pos"'}</li>
                <li>{'"wrist_roll.pos"'}</li>
                <li>{'"gripper.pos"'}</li>
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
              <img 
                src={`/images/portfolio/koch-teleop.gif`}
                alt="Leader-follower teleoperation for data collection"
                className="w-full rounded-lg shadow-lg mt-2"
              />
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
                {/* Video */}
                <div className="mt-4 flex justify-center">
                  <div className="max-w-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full rounded-lg shadow-lg"
                  >
                  <source src={`/videos/three_task_cut_4x_speed.mp4`} type="video/mp4" />
                  </video>
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
                    src="https://www.youtube.com/embed/zdFU9ku4Wcg?si=bJjzFVhdc2FZIbdA&autoplay=1&loop=1&playlist=zdFU9ku4Wcg"
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
  'attention-heat-map': {
    title: 'Attention Heat Map Visualization for VLA Models',
    description: `
      Visualizing attention maps for VLA models to understand how the model focuses on different parts of the input.
    `.trim(),
    videos: [
      {src: '/videos/franka_open_draw.mp4', caption: 'Robot opening drawer demo'},
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
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models like <strong>SmolVLA & GR00T N1.5 </strong>and{' '}
            <strong>imitation learning like Action Chunking Transformer(ACT) </strong>.
          </p>
        ),
      },
      {
        title: 'Project Details',
        content: (
          <p>
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models and{' '}
            <strong>imitation learning</strong>.
          </p>
        ),
      },
      {
        title: 'Technical Details',
        content: (
          <div className="space-y-4">
            <p>
              The system uses <span className="font-bold">ROS2</span> for robot control
              and <span className="font-bold">PyTorch</span> for model inference.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Framework:</strong> ROS2 Humble</li>
              <li><strong>Model:</strong> Action Chunking Transformer</li>
              <li><strong>Inference Speed:</strong> 10Hz real-time</li>
            </ul>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/yourusername/franka-vla'},
      {label: 'Paper', url: 'https://arxiv.org/abs/xxxx.xxxxx'},
    ],
  },

  // Autonomous Navigation System Development

  // Project 5(Autonomous Navigation System Development for turtlebot)
  'turtlebot-nav': {
    title: 'Multi-map Switching System for Robot Navigation',
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
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models like <strong>SmolVLA & GR00T N1.5 </strong>and{' '}
            <strong>imitation learning like Action Chunking Transformer(ACT) </strong>.
          </p>
        ),
      },
      {
        title: 'Project Details',
        content: (
          <p>
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models and{' '}
            <strong>imitation learning</strong>.
          </p>
        ),
      },
      {
        title: 'Technical Details',
        content: (
          <div className="space-y-4">
            <p>
              The system uses <span className="font-bold">ROS2</span> for robot control
              and <span className="font-bold">PyTorch</span> for model inference.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Framework:</strong> ROS2 Humble</li>
              <li><strong>Model:</strong> Action Chunking Transformer</li>
              <li><strong>Inference Speed:</strong> 10Hz real-time</li>
            </ul>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/yourusername/turtlebot-multi-map'},
      {label: 'Paper', url: 'https://arxiv.org/abs/xxxx.xxxxx'},
    ],
  },
  
  // Project 6(Autonomous Navigation System Development for spot)
  'spot-nav': {
    title: 'Multi-map Switching System for Spot Robot Navigation',
    description: `
      Developing a multi-map switching system for autonomous navigation of a Spot robot in dynamic environments.
    `.trim(),
    videos: [
      {src: '/videos/spot_multi_map.mp4', caption: 'Multi-map switching demo'},
    ],
    images: [
      {src: '/images/portfolio/spot-1.png', caption: 'System setup'},
      {src: '/images/portfolio/spot-2.png', caption: 'Training process'},
    ],
    youtubeIds: [
      {id: '8RHWoJiWaVc', caption: 'Full demonstration video'},
    ],
    sections: [
      {
        title: 'Overview',
        content: (
          <p>
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models like <strong>SmolVLA & GR00T N1.5 </strong>and{' '}
            <strong>imitation learning like Action Chunking Transformer(ACT) </strong>.
          </p>
        ),
      },
      {
        title: 'Project Details',
        content: (
          <p>
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models and{' '}
            <strong>imitation learning</strong>.
          </p>
        ),
      },
      {
        title: 'Technical Details',
        content: (
          <div className="space-y-4">
            <p>
              The system uses <span className="font-bold">ROS2</span> for robot control
              and <span className="font-bold">PyTorch</span> for model inference.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Framework:</strong> ROS2 Humble</li>
              <li><strong>Model:</strong> Action Chunking Transformer</li>
              <li><strong>Inference Speed:</strong> 10Hz real-time</li>
            </ul>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/huggingface/lerobot.git'},
      {label: 'Paper', url: 'https://arxiv.org/abs/2304.13705'},
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
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models like <strong>SmolVLA & GR00T N1.5 </strong>and{' '}
            <strong>imitation learning like Action Chunking Transformer(ACT) </strong>.
          </p>
        ),
      },
      {
        title: 'Project Details',
        content: (
          <p>
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models and{' '}
            <strong>imitation learning</strong>.
          </p>
        ),
      },
      {
        title: 'Technical Details',
        content: (
          <div className="space-y-4">
            <p>
              The system uses <span className="font-bold">ROS2</span> for robot control
              and <span className="font-bold">PyTorch</span> for model inference.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Framework:</strong> ROS2 Humble</li>
              <li><strong>Model:</strong> Action Chunking Transformer</li>
              <li><strong>Inference Speed:</strong> 10Hz real-time</li>
            </ul>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/yourusername/turtlebot-multi-map'},
      {label: 'Paper', url: 'https://arxiv.org/abs/xxxx.xxxxx'},
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
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models like <strong>SmolVLA & GR00T N1.5 </strong>and{' '}
            <strong>imitation learning like Action Chunking Transformer(ACT) </strong>.
          </p>
        ),
      },
      {
        title: 'Project Details',
        content: (
          <p>
            This project demonstrates how robotic arms can learn using{' '}
            <strong>Visual Language Action (VLA)</strong> models and{' '}
            <strong>imitation learning</strong>.
          </p>
        ),
      },
      {
        title: 'Technical Details',
        content: (
          <div className="space-y-4">
            <p>
              The system uses <span className="font-bold">ROS2</span> for robot control
              and <span className="font-bold">PyTorch</span> for model inference.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Framework:</strong> ROS2 Humble</li>
              <li><strong>Model:</strong> Action Chunking Transformer</li>
              <li><strong>Inference Speed:</strong> 10Hz real-time</li>
            </ul>
          </div>
        ),
      },
    ],
    links: [
      {label: 'GitHub', url: 'https://github.com/yourusername/turtlebot-multi-map'},
      {label: 'Paper', url: 'https://arxiv.org/abs/xxxx.xxxxx'},
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