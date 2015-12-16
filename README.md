# OSU Job Board App

## Getting Started

To get you started:

1. Clone the repository
2. Install the dependencies
3. Open the app/index.html file directly in your browser, or run the application
   and view it in your browser at http://localhost:8000/app/index.html.

### Prerequisites

You need git to clone the osu-jobs-feed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test osu-jobs-feed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone project

Clone the repository using [git][git]:

```
git clone https://github.com/mmcmann/osu-jobs-feed.git
cd osu-jobs-feed
```

### Install Dependencies

```
npm install
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Directory Layout

```
app/                    --> all of the source files for the application
  css/                  --> styles
    app.css             --> default stylesheet
  js/                   --> application code
    app.js              --> main application module
    controllers.js      --> the controller logic
    directives.js       --> directives
    filters.js          --> filters
    services.js         --> services
  partials/             --> HTML views. Inherits ../index.html
    404.html            --> 'Not found' errror page
    feed-list.html      --> Main view. Job listings.
  vendor/               --> bower installations
    index.html          --> app layout file (the main html template file of the app)
data/                   --> local copy of all_jobs.atom. Used to avoid Cross-site scripting (XSS) restrictions.
package.json            --> project information, dependencies, and run scripts
bower.json              --> project information and dependencies handled by bower
```
