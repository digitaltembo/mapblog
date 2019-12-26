# Flask-React-Redux-MaterialUI Boilerplate

This is forked from https://github.com/dternyak/React-Redux-Flask, with some updates to modernize the requirements and with some opinionated modifications to get it to work how I want it. I imagine it will be somewhat fluid as I make other projects using this as a stepping stone. Further improvements I want:
* Get the tests working properly
* Provide some further infrastructure to get it to work a) on Heroku (it is part way there, I believe) or b) on a Raspberry Pi


## Running it locally

Running the Flask/React app locally and doing development is super easy, most changes to any frontend or backend code (python, JS, CSS) are loaded pretty quickly into the running application. To get this running locally you need to:

### 1. Install the dependencies

To install the python dependencies, you need python3 and pip
```
$ python3 -m venv venv        # Creates a python3 virtual environment
$ source venv/bin/activate    # puts your terminal into that virtual environment
$ pip install -r requirements # installs the requirements
```
To install the js dependencies, I use npm version 5.6.0.
``` 
$ cd static
$ npm install
```

These steps should take a bit, and may require some finagling with outside dependencies (apt/brew) depending on your machine.

### 2. Prepare the DB

I use sqlite, but technically it should work with postgres or mysql as well; the project uses [SQLAlchemy](https://www.sqlalchemy.org/) with [Alembic](https://alembic.sqlalchemy.org/en/latest/) for DB management.

To specify the DB, it is necessary that you set the environment variable `DATABASE_URL`. You can use 
```
$ export DATABASE_URL="postgresql://username:password@localhost/mydatabase"
or
$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"
or
$ export DATABASE_URL="sqlite:///your.db"
```
(I put this definition in the venv/bin/activate bash script, but it just needs to be accessible whenever you run the server)

Having specified the DATABASE_URL, and while within the python virtual environment, run 
```
$ python manage.py create_db # (this creates the DB)
$ python manage.py db upgrade # (this runs any and all unrun migrations)
```

(In general, use `python manage.py db migrate` to generate the necessary migration files from changes to the `models.py` file, and `python manage.py db upgrade` to run these migrations)

### 3. Run in development mode

To run the Flask backend, while in the python3 virtual environment do
```
$ python manage.py runserver
```

To run the node frontend, do
```
cd static
npm start
```

(To compile the frontend, do `npm run build:production`) 
