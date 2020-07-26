# Ecoleta

Ecoleta's application, developed during Rocketseat's Next Level Week 11, with modifications of my own.

Here i try to use every knowlodge i'm colleting through the start of my carrer in practice.

The application itself is a website for recycling companies to register their pickup points and for users to search and find those points.

### Content Proposed

The proposal of the application was to have 3 pages:

* Home
* Submission form
* Registered Places

#### Home

A simple page consisting of a header for navigating to the submission form and a button that would trigger a modal to search for cities/states to see it's registered places.

#### Submission form

A page containing a header to go back to the home page and the submission form, consisting of inputs for a name, an img URL, and an address, with 2 calls to IBGE's API to get the list of brazilian states and, once a state was selected, to get every city of that state.

The form also had an interative selection of 6 different types of materials to be recycled, animated with CSS.

#### Registered Places

A page that would show every place of the city or state searched by the user. The search was constructing on the backend with JS and SQL.

### Contet Added By Me

In addition to what was proposed, my application got:

* An extra 'about us' page;
* A global footer, structured for every page;
* Improved submission form, with an extra external API call and more fields;
* Extra 'form protection' to validate data inputed before allowing submission, such as checking if the img provided is a valid URL;
* A descriptive tool-tip;
* 2 API routes for the application;
* An animated and customized pop-up that tells the user what's wrong when trying to submit the form with invalid information;
* All around responsivity, with a focus on different smartphone widths.
* Added the search bar to the registered places' page, properly formatting it.

###### Feedback

As always, any feedback or suggestion is welcomed.




