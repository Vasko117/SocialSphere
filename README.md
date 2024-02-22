**Project Overview:**

SocialSphere is a mobile application developed using React Native, Expo and Firebase, created using custom UI components and designed to facilitate social interaction and communication among users. It incorporates features such as user registration and login, profile management, messaging,location displaying, image sharing, and social networking.

**Functionalities:**

1.  **User Authentication:** Users can register an account and log in securely using Firebase Authentication.
    
2.  **Profile Management:** Users can create and update their profiles, including uploading profile pictures. If the user doesn't upload a profile picture the app gives him a default photo depending on his gender. The profile information is stored in Firebase Firestore.
    
3.  **Messaging:** The app allows users to exchange messages in real-time with other users. Firebase Firestore is used to store and manage message data.
    
4.  **Social Networking:** Users can view and interact with posts shared by other users. Each post's liked state and number of replies is consistent across all components and can be updated from any component(but only by the post's sender).
    

**Screens:**

1.  **Register/Login Screen:** Allows users to create a new account or log in to an existing one.


     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/45ca084f-91bb-4f81-be41-58807e949864" width="160" height="300"> 
     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/bbcc8416-f0bb-48e2-90c5-4408c580d23b" width="160" height="300">

2.  **Home Page:** Displays a feed of posts shared by other users. Users can like and comment on posts.


      <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/a4af23e9-4986-4b76-819e-929540a998df" width="160" height="300"> 
     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/49d914f7-a3a7-44fc-a76b-6558ab903f31" width="160" height="300">

3.  **Profile Page:** Shows each user's profile information.


    <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/f93a2d36-4cf5-4632-a81d-a1a8ffe73eb4" width="160" height="300"> 
     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/b2c2f546-ad74-4978-86a6-4a626ab82c26" width="160" height="300">

4.  **Search screen:** Allows users to search for other existing users and add them to their messages list.The messages list also displays the last message sent to each user.

    
     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/289a6b4b-16af-4fe0-98a7-e37bf3aff058" width="160" height="300"> 
     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/ab22a32d-bbb5-4849-87a3-ffb6b104db36" width="160" height="300">

    
5.  **Messaging Screen:** Enables users to exchange messages with their contacts in real-time and  allows users to capture and upload images directly from their device's camera and gallery.

     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/3074d683-2529-4437-9e4e-f7aa29bf7f0d" width="160" height="300"> 
     <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/96de057e-4fcc-4545-8283-e0fa144254da" width="160" height="300">


6.  **Map Screen:** Integrates a map view where users can view their location or explore nearby places.


    <img src="https://github.com/Vasko117/SocialSphere/assets/126932985/306cb967-8654-48be-9853-b96614a91d3f" width="160" height="300">


**Firebase Integration:**

-   **Authentication:** Firebase Authentication is used for user registration and login.
-   **Firestore:** Firebase Firestore is utilized for storing user profiles, message data, and post information.
-   **Storage:** Firebase Storage is used to store uploaded images, including profile pictures and post images.

**Additional Features:**

-   **Image Picking:** Users can select and upload images from their device's gallery.
-   **Context API:** The app utilizes React's Context API for state management, enabling global access to user authentication and other shared data across components.
-   **Current Location Display:** The component utilizes the react-native-maps package to render a map view and display the user's current location using the expo-location package. It requests permission to access the device's location and retrieves the current coordinates to center the map view on the user's location.
-   **Date and Time Display:** Messages and posts within the application display the date and time they were sent or posted, providing users with context regarding the timing of the communication or content creation.


**Design Patterns:**

-   **Provider Pattern:** Context API to provide authentication and chat context to the entire component tree. This allows components nested deep in the hierarchy to access this data without prop drilling.
-   **Signleton Pattern:** The application utilizes the singleton design pattern for logging purposes. The MainLogger class ensures that only one instance of the logger is created throughout the application's lifecycle. This prevents multiple instances of the logger from being created, ensuring a centralized and consistent logging mechanism.
-   **Builder Pattern:** The application utilizes the builder design pattern to construct user objects with flexible configurations. The UserConstruct and UserBuilder classes collaborate to construct user objects with specified attributes.
-   **Container-Component Pattern:** Utilized in the App component, which acts as the container for the entire application, orchestrating navigation and wrapping it with providers.


**Dependencies:**

-   **react-native-maps:** This package provides a React Native component for rendering maps using Google Maps on Android and Apple Maps on iOS.
-   **expo-location:** expo-location: The expo-location package simplifies access to location information on the device, including the user's current location.
-   **expo-image-picker:** This package enables the application to access the device's camera and image gallery for capturing and selecting images.


This documentation provides a brief overview of the project's functionalities, screens, Firebase integration, additional features, and its development framework (React Native), highlighting its key aspects and capabilities.
