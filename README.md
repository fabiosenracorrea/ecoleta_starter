# Ecoleta
Ecoleta's application, developed during Rocketseat's Next Level Week 11, with modifications of my own.

Here i try to use every knowlodge i'm colleting through the start of my carrer in practice.

The application itself is a website for recycling companies to register their pickup points and for users
to search and find those points.

06/24/2020 -
  . Criantion of a standard api response as api_routes.js so that the application delivers a JSON
  containing every registered point.
  . { PLANNED: increasing of the complexity of the request URL to accomodate user preference (state and/or city) and to deliver the response accordingly. }
  . DONE: user can now api request only states or states AND city
  The format of request is:
    - for state only: /api/points/{uf}
    - for state and city: /api/points/{uf}/{city}
    {uf} should be replaced with the state acronym, eg. "Minas Gerais" is "mg"
    {city} shoeld be replaced with the city name, changing spaces to "-", eg. "Belo Horioznte" is "belo-horizonte"

06/23/2020 -
  . Criation of routes.js to better organize the project
