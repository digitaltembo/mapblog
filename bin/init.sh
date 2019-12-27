python3 -m venv venv            # Creates a python3 virtual environment
source venv/bin/activate        # puts your terminal into that virtual environment
pip install -r requirements.txt # installs the requirements

echo 'export DATABASE_URL="sqlite:///your.db"' >>> venv/bin/activate
python manage.py create_db
python manage.py db migrate
python manage.py db upgrade

cd static
npm install