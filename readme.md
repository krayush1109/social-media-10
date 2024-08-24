# Social Media Application

##  [🚀 Live Demo 🚀](https://social-media-10.onrender.com/)

A feature-rich social media application built with EJS, Tailwind CSS, Node.js, MongoDB, Passport.js, ImageKit, and Socket.IO. The app includes user authentication, image uploads, real-time chat, and more.

## Features

- **User Authentication**: Secure login, registration, and forgot password functionality using email OTP.
- **Profile Management**: Upload and update profile images with ImageKit.
- **Posts**: Users can create posts with images and interact by liking posts.
- **Chat**: Real-time chat functionality using Socket.IO.
- **Payment Integration**: Razorpay for handling payments.
- **Google OAuth 2.0**: Google authentication for secure login.

## Technologies Used

- **Frontend**: EJS, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js, Google OAuth 2.0
- **Image Management**: ImageKit
- **Real-time Communication**: Socket.IO
- **Payment Integration**: Razorpay

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/social-media-app.git
    cd social-media-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory with the following content:
    ```env
    # MongoDB Configuration
    MONGO_URI=your-mongodb-connection-string

    # Session Configuration
    SESSION_SECRET=your-session-secret

    # Email Configuration
    SENDER_EMAIL=your-email-address
    APP_PASSWORD=your-email-app-password

    # ImageKit Configuration
    IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
    IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
    IMAGEKIT_ENDPOINT_URL=https://ik.imagekit.io/krayush/

    # Razorpay - Payment Integration
    RAZORPAY_KEY_ID=your-razorpay-key-id
    RAZORPAY_KEY_SECRET=your-razorpay-key-secret

    # Google Auth 2.0
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    ```

4. Start the application:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.


## Usage

- **Register/Login**: Create an account or log in with existing credentials.
- **Forgot Password**: Use the email OTP functionality to reset your password.
- **Profile**: Update your profile picture.
- **Posts**: Create a new post with an image and like other users' posts.
- **Chat**: Start a real-time chat with other users.
- **Payments**: Handle payments through Razorpay.
- **Google Authentication**: Use Google OAuth 2.0 for secure login.

## Live Demo

Check out the live version of the app [here](https://social-media-10.onrender.com/).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License.
