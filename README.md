IDS Client App
===

Client-side code for Ideal Seating Chart project.

Environment setup
---

First, make sure you have node installed. I'm on version 5.0.0. See: https://nodejs.org/en/

Next, you'll need to install some project dependencies. If installs fail, try running with **sudo**:

    # install global dependencies
    npm install --global pushstate-server
    npm install --global gulp

    # install local dependencies
    npm install

Our gulp workflow has livereload enabled, but you'll need the browser extension. Livereload allows you to see code changes without reloading the page. If you want to use livereload, install and enable the extension for your browser. See: http://livereload.com/extensions/

With these dependencies installed, you should have everything you need to start working!

    # start the development server and build tools
    # (to see what this command is doing, check out ./package.json)
    npm start

You'll now be able to view the project at http://localhost:3000.

Issues
---

If you run into problems getting up and running, open a Github Issue, so that we can keep track of them: https://github.com/sherbert250/isc-management/issues

JavaScript: ES6 (ES2015)
---

Before diving into the source code, it would be beneficial to read up on JavaScript syntax, and especially ES6 (ES2015). In this project you'll find ES6 imports, lambda functions, block scope variables, and more being used, so it will be good to know them.

Learn ES6: https://babeljs.io/docs/learn-es2015/

We're using browserify and babelify to bundle modules and to compile ES6 to ES5, which is the most recent widely supported major version of JavaScript. All of the JavaScript you see in *./src* is ending up in *./dist/js/bundle.js*.

Application
---

The entry point of the application is *./src/index.js*. This is where controllers and routes are defined, and likely more stuff as the project develops.

Controllers
---

Controllers are defined in *./src/controllers/*, and are included via the ES6 **import** statement. Controllers are where you define which variables and functions to send down to the views.

Views
---

In order to keep all of our working changes in the *./src* directory, views are located at *./src/views/* and are moved to *./dist/views* during the build tasks. Views are responsible for receiving data and returning UI for the application. Ideally, views are like pure functions - i.e. they take in data and spit out html, with no side-effects.

Styles
---

Sass styles are located at *./src/_assets/scss/*. When you start the gulp build tasks by running **npm start**, your sass changes are monitored and the build file (*./dist/css/app.min.css*) is recompiled on each change.

We're using Bootstrap and the Flatly theme by Bootswatch. The build path goes:

- *theme variables*
- *custom bootstrap variables*
- *bootstrap (via npm)*
- *custom sass*.

You can check out the exact include path by looking at *./src/_assets/app.scss*.

**Note:** Any time you create a new sass file, you'll need to add an import statement to *app.scss*. prefix the file name with _ so that it's not built and compiled to *./dist/css/*, unless that's what you want.

Other directories
---

- *./src/data* - used for static data; files in this directory will eventually be phased out once the API services become available, and we can pull data from the database
- *./src/settings* - used for site-wide settings, like the primary and secondary navigation, so that we're not hard-coding that data into our views
