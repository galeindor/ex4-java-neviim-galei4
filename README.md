
# TMDB Movies E-commence

- **Project Overview:**
  A comprehensive application leveraging the TMDB API to access movies and TV shows data, divided into server and client components.

![image](https://github.com/galeindor/ex4-java-neviim-galei4/assets/73552373/fbb87889-9157-4b7a-9252-008ed3041c89)

- **Server-side (Spring Boot):**
  - **Media Controller:** Responsible for managing Cart items within the user session.
  - **Purchase Controller:** Handles the secure storage of purchase information in the database.

- **Client-side (React):**
  - **Home Page:** Central hub with a search bar for seamless navigation and real-time search result display.
  - **Search Bar:** Empowers users to search for movies and TV shows by name.
  - **Search Results:** Instantly showcases the outcome of search queries.
  - **Search Filters:** Offers advanced filtering options including media type (movie or TV show), genres, and year.
  - **Cart Page:** Displays selected items in the user's cart for review.
  - **Checkout Page:** Streamlines the purchasing process with an integrated purchase form.

- **Integration:**
  - Utilizes the TMDB API to seamlessly access movie and TV show data.
  - Integrates Spring Boot on the server-side for efficient data management.
  - Leverages React on the client-side for dynamic and responsive user interfaces.

- **User Experience:**
  - Provides an immersive platform for enthusiasts to explore and discover their favorite entertainment content.
  - Allows users to customize searches using various filters for refined results.
  - Simplifies the cart and checkout process for a user-friendly shopping experience.

- **Technical Stack:**
  - Server-side: Spring Boot
  - Client-side: React
  - API Integration: TMDB API

# Initializing the project

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.
