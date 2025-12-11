# Project NOW

**Project NOW** is next-gen application designed to enhance the GeForce NOW experience. Originally created to address the lack of native GeForce NOW support on Linux, this app also provides functionality for macOS and Windows users. Our goal is to refine the user interface and offer custom features for an improved experience.

## 🙏 **Credits**

This project was originally created by **[AstralVixen](https://github.com/AstralVixen)** and **[T0msk](https://github.com/t0msk)**. A huge thanks to them for their foundational work on this project!

## **Screenshots**

![Screenshot](src/assets/resources/Screenshot1.png)
![Screenshot](src/assets/resources/Screenshot2.png)

## 🚀 **Features**

- **120FPS+ support (GFN ultimate required)**
- **Up to 4K resolution support (GFN performance or up required)**
- **Ultrawide resolutions support (21:9, 32:9)**
- **Game Desktop Shortcuts**: Create desktop shortcuts to launch specific games directly! Works on Windows, Linux, and macOS.
- **Auto-update checker**: Automatically checks for new versions on GitHub and notifies you when updates are available.
- **Customizable accent color**: Choose your preferred accent color, including the official GeForce NOW green.
- **Multi-language support**: Available in English, French, Portuguese, Spanish, and Italian.
- **Inactivity notification:** Alerts you when you're about to be kicked due to inactivity.
- **Automute:** Mutes the game when the window is not in focus.
- **Auto refocus:** Alt-tabs you back into the game if you're unfocused when inactivity timer starts (both autofocus and inactivity notifications must be enabled).
- **Button to reset all settings to their default values.**
- **Support for smaller screens:** added scrollable areas.
- **Info tooltips added in the settings section.**
- **Enhanced UI**: Project NOW aims to improve the user interface of GeForce NOW, providing a more intuitive and enjoyable experience.
- **Custom Discord Rich Presence**: Show off your gaming status with personalized Discord Rich Presence. Display game details and status updates directly in your Discord profile.
- **Instant App Switch**: Automatically switch to Project NOW once your gaming rig is ready for action!
- **Notifications**: Get notified once your gaming rig is ready for action!

## 🎮 **Game Shortcuts**

You can create desktop shortcuts to launch specific games directly from GeForce NOW!

1. Press `Ctrl+I` to open the sidebar
2. Go to the **🎮 Game Shortcuts** tab
3. Navigate to a game page on GeForce NOW and click 📋 to extract the game ID, or enter it manually
4. Enter the game name and click **Create Desktop Shortcut**

The shortcut will be created on your desktop. Double-click it to launch Project NOW directly on that game's page!

**Command line usage:**
```bash
# Launch Project NOW with a specific game
./ProjectNOW --game-id=dcff9c03-5971-4992-ab7d-0f655ef0bfe2
```

## ⚠️ **Disclaimer**

Project NOW is an independent project and is not affiliated with, sponsored by, or endorsed by Nvidia or GeForce NOW. All trademarks and logos used are the property of their respective owners. The app is provided as-is, and the developers are not responsible for any issues or damages that may arise from its use.

## 📦 **Installation**

Visit our [Release](https://github.com/oaojfr/Project-NOW/releases) page, where you can find newest builds of Project NOW in packages like: **zip** (binary version), **deb**, **AppImage**, **rpm** and **exe**.

## 🎮 **Usage**

Press `Ctrl+I` to open sidebar to access Project NOW features.

## 💻 **How to use 2K, 4K & 120 FPS streaming**

Press `Ctrl+I` to open sidebar and change **Resolution** and **FPS** to your liking.
**DO NOT USE** native GeForce NOW settings for resolution and FPS, Project NOW **doesn't** alter GeForce NOW settings, so you still see 1080p max resolution and 60 FPS. Project NOW override these values.

Note : Some resolutions are not working, they are just implemented in case GFN supports them in the future.


## 🛠️ **Build**

To get started with Project NOW, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/oaojfr/Project-NOW.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Project-NOW
    ```

3. Install dependencies:

    ```bash
    yarn install
    ```

4. Run the application:
    ```bash
    yarn start
    ```

## 💬 **Contributing**

We welcome contributions from the community! For the contribution guide please see: [Contributing](CONTRIBUTING.md)

## 📜 **License**

Project NOW is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for more details.

## 📫 **Contact**

For questions, feedback, or suggestions, feel free to reach out to me:

- [GitHub Issues](https://github.com/oaojfr/Project-NOW/issues)
