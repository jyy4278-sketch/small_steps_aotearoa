# small_steps_aotearoa
Website raising awareness of Auckland's native urban wildlife
Edit this later 
Name:Jhanvi Yadav


Step 1:
Open(insert filename)

Step 2:
Click on start or run/ open file 

Step 3:
Click on 'run module'
Instructions on how to use programme:
Objective: the objective of my quiz is to..
List about pages
form

# Small Steps Aotearoa

Small Steps Aotearoa is a website built to raise awareness of the native wildlife living in urban Auckland, aimed at teenagers. It brings together species information, a quiz, a conservation action checklist and an FAQ section so users can learn about the animals around them and find small, realistic ways to help protect them. The site is built with HTML, CSS and JavaScript and runs entirely in the browser.

**Name:** Jhanvi Yadav

Purpose:This document will walk you through the installation and running of my programming

## Key Features

- A species page where users can search or filter native birds and insects, and click on any species to see more detail in a popup, including habitat, threats and more
- An interactive "Native or not?" quiz that scores the user as they go and lets them restart at the end.
- A conservation actions page where users can tick off small habits they're willing to commit to, and get a summary of their choices.
- An FAQ page answering common questions about native species and the site itself.
- A newsletter signup form with full validation on every field, including region, email format and year of birth.
- Consistent navigation and styling across all five pages, using one shared stylesheet and one shared JavaScript file.

## Getting Started

### Prerequisites

Small Steps Aotearoa is a static website. It does not require any installation, package manager, or server setup to run.

- **A web browser:** Chrome, Edge, Firefox or Safari all work. Built and tested primarily in Chrome.
- **A code editor (optional):** Visual Studio Code was used to build the site, and is recommended if you want to view or edit the source files.

### Installation & Setup

This is a complete walkthrough on how to open and use the website.

1. **Open the project folder** provided alongside this document.

2. **Open the website.** There are two ways to do this:
   - **Simplest way:** double-click `index.html`, or right-click it and choose "Open with" your browser of choice.
   - **Another way:** open the folder in VS Code, right-click `index.html` in the file list, and choose "Open with Live Server" (requires the Live Server extension, installed from the Extensions tab in VS Code). This runs the site through a local server rather than opening it as a raw file, which gives more reliable behaviour.

3. **Navigate the site** using the menu in the top right of the homepage, or the navigation bar at the top of every other page. All five pages (Home, Species, Quiz, Actions, FAQ) are linked from this navigation.

## Instructions on How to Use the Website

**Homepage:** Scroll through the hero, about section and location carousel, or use the Explore cards to jump straight to Species, Actions or the Quiz. A newsletter signup form is included at the bottom.

**Species page:** Type into the search bar to find a species by name, or use the All / Birds / Insects buttons to filter the list. Click on any species card to open a popup with more information 

**Quiz page:** For each animal shown, choose whether you think it's native to New Zealand or not. Feedback appears immediately, and your score is tracked at the top of the card. At the end, you'll see your final score with the option to try again.

**Actions page:** Read through the list of small conservation habits and tick the ones you're willing to commit to. Once at least one is selected, the "Commit!" button becomes active and shows a summary of your choices, with the option to start over.

**FAQ page:** Click on any question to expand its answer. Click again to close it.

## Important Notes

- **No login is required.** All content is publicly viewable with no accounts or credentials.
- **The newsletter form is a demonstration only.** It validates all fields correctly but does not send or store any data, as there is no backend connected to it.
- **Internet connection:** the site works fully offline once loaded, with one exception — the Actions page loads a Google Font (Bricolage Grotesque) from an external source, which requires an internet connection to display correctly. If offline, the page will fall back to a system font.

## Troubleshooting & FAQ

- **The page looks unstyled, with plain black text on a white background:** the stylesheet isn't linking correctly. Make sure `styles.css` is in the same folder as the HTML files and hasn't been renamed or moved.
- **Buttons, search or the quiz don't respond to clicks:** `main.js` isn't loading. Open the browser's developer console (press F12, then click "Console") to check for an error message, and confirm `main.js` is in the same folder as the HTML files.
- **The navigation bar doesn't appear at the top of the homepage until I scroll:** this is intentional. The homepage nav is designed to slide in once the user scrolls past the hero image. Every other page shows the navigation bar from the top.
- **Images or icons appear as blank spaces:** confirm the `images` folder is present in the project directory and hasn't been separated from the HTML files.