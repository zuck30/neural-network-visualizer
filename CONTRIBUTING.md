# Contributing to Neural Network Visualizer.

Thank you for your interest in contributing to **Neural Network Visualizer**! This web app makes neural networks interactive and educational through 3D visualizations. Your contributions can enhance its features, visualizations, or accessibility, especially for learners in Tanzania and beyond.

##  How to Contribute

### 1. Fork the Repository
- Navigate to [https://github.com/zuck30/neural-network-visualizer](https://github.com/zuck30/neural-network-visualizer).
- Click **Fork** to create a copy under your GitHub account.

### 2. Clone Your Fork
- Clone your forked repository:
  ```bash
  git clone https://github.com/your-username/neural-network-visualizer.git
  cd neural-network-visualizer
  ```

### 3. Create a Feature Branch
- Create a new branch:
  ```bash
  git checkout -b feature/YourFeatureName
  ```
- Use descriptive names, e.g., `feature/add-new-problem-type` or `bugfix/fix-3d-rendering`.

### 4. Set Up the Development Environment
- **Prerequisites**:
  - Node.js 14+ and npm
  - Git
- **Setup**:
  ```bash
  npm install
  npm run dev
  ```
- Access the app at [http://localhost:5173](http://localhost:5173).

### 5. Make Your Changes
- Work on your feature, bug fix, or documentation improvement.
- Follow coding style:
  - **Frontend**: Adhere to ESLint and Tailwind CSS conventions.
  - **TensorFlow.js**: Ensure compatibility with browser-based ML models.
  - **Three.js**: Optimize 3D rendering for performance.
  - **Commits**: Use descriptive messages, e.g., `Add support for new activation function`.
- Test changes locally in the browser.

### 6. Commit Your Changes
- Commit with clear messages:
  ```bash
  git commit -m "Add visualization for new problem type"
  ```

### 7. Push to Your Fork
- Push to your fork:
  ```bash
  git push origin feature/YourFeatureName
  ```

### 8. Open a Pull Request
- Go to [https://github.com/zuck30/neural-network-visualizer](https://github.com/zuck30/neural-network-visualizer).
- Click **Compare & pull request**, selecting your branch.
- Provide a detailed description, e.g.:
  - What changed and why.
  - Relevant issue numbers (e.g., `Fixes #123`).
  - Screenshots or videos of visualizations.
- Submit the PR for review.

## Code Review Process
- Maintainers will review your PR promptly.
- Be open to feedback and make requested changes.
- Approved changes will be merged into `main`.

##  Reporting Bugs
- Check [Issues](https://github.com/zuck30/neural-network-visualizer/issues) to avoid duplicates.
- Open a new issue with:
  - Clear title and description.
  - Steps to reproduce.
  - Expected vs. actual behavior.
  - Screenshots or videos (e.g., of rendering issues).
  - Environment (OS, Node.js version, browser).

##  Suggesting Features
- Open an issue with the `enhancement` label.
- Describe the feature, its benefits, and possible implementation.
- Include mockups or example outputs if applicable.

##  Coding Guidelines
- **Frontend**:
  - Use React hooks and functional components.
  - Follow Tailwind CSS utility-first approach.
  - Ensure responsive design for mobile and desktop.
- **TensorFlow.js**:
  - Optimize models for browser performance.
  - Validate input data for problem types.
- **Three.js**:
  - Minimize draw calls for smooth 3D rendering.
  - Support WebGL compatibility across browsers.
- **General**:
  - Add tests (place in `tests/` directory, e.g., using Jest).
  - Update documentation for new features.
  - Keep comments clear and concise.

## 🛠️ Areas for Contribution
- **Visualizations**: Enhance 3D rendering or add new animation effects.
- **Problem Types**: Add new ML problems (e.g., MNIST, time-series).
- **UI Enhancements**: Improve parameter controls or add Swahili support.
- **Performance**: Optimize TensorFlow.js models or Three.js rendering.
- **Tests**: Write unit tests for components or ML logic.
- **Documentation**: Improve README, add tutorials, or create a FAQ.

## 📞 Getting Help
- Open an issue or contact [mwalyangashadrack@gmail.com](mailto:mwalyangashadrack@gmail.com).
- Use GitHub Discussions (if enabled) for community engagement.

## 🙏 Acknowledgments
Thank you for contributing to **Neural Network Visualizer**! Your efforts make AI education more accessible and engaging for learners worldwide. Let’s visualize the future of AI together!