# Swift Menu

Create a modern, fast, and mobile-optimized Digital QR Menu web application for restaurants/cafes, heavily inspired by the "Mynu" app interface.

The application should be tailored primarily for mobile screens but look centered and elegant on desktop viewports.

Key Features & UI Layout to include:

1. **Header Section:**

   - Restaurant logo placeholder, cover image at the top, and restaurant name with short info (e.g., Rating, Wi-Fi Password button, and Address).

   - A prominent, sticky **Search Bar** that lets users instantly filter menu items by name.

2. **Category Navigation Bar (Horizontal Scroll):**

   - A horizontal scrollable slider for menu categories (e.g., Breakfast, Soups, Salads, Burgers, Pizza, Desserts, Drinks).

   - Clicking a category should smoothly scroll the user to that specific section on the page (Smooth scrolling effect). The active category should highlight dynamically.

3. **Menu Items Grid/List:**

   - Group items under their respective Category Headers.

   - Each item card must include:

     - A beautiful high-quality product image placeholder on one side (or top).

     - Item Title (e.g., "Classic Cheese Burger").

     - Price tag clearly displayed (e.g., "11,000 IQD" or "$").

     - Short mouth-watering description.

     - **Allergen/Dietary Icons:** Small indicators/badges if applicable (e.g., Spicy 🌶️, Vegan 🌱, Gluten-Free, Contains Nuts).

   - Clicking on any item card should open a smooth, beautiful **Popup/Modal (Product Detail View)** showing a larger image, complete description, full ingredients, allergens list, and a close button.

4. **Interactive Mock Features (Optional Footer or Floating Actions):**

   - Add a floating button for "Call Waiter" or "Show Table Number" to match premium QR menus.

   - Include a language switcher toggle (EN / AR) if possible in the navbar.

5. **Design & UX Guidelines:**

   - **Theme:** Clean, minimalistic, light background (pure white/off-white) with warm primary accents (like amber, orange, or deep brown/slate) typical for food apps.

   - Use mock data filled with realistic dishes (Burgers, Pizzas, Pasta, Appetizers) and real-looking prices.

   - Ensure the scrolling is buttery smooth on mobile viewports with fast click response times.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/017a41dc-1e2b-442f-978d-ed51ed122c11).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
