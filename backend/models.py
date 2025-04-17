from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ------------------- User -------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'adopter' or 'shelter'

    pets = db.relationship('Pet', backref='shelter', lazy=True)
    success_stories = db.relationship('SuccessStory', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)
    appointments = db.relationship('Appointment', backref='user', lazy=True)
    events = db.relationship('Event', backref='shelter', lazy=True)
    donations = db.relationship('Donation', backref='donor', lazy=True)


# ------------------- Pet -------------------
class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(300), nullable=True)
    pet_type = db.Column(db.String(50), nullable=False)
    origin = db.Column(db.String(50), nullable=False)

    gender = db.Column(db.String(10), nullable=True)
    birthdate = db.Column(db.String(20), nullable=True)
    weight = db.Column(db.String(20), nullable=True)
    height = db.Column(db.String(20), nullable=True)
    health_status = db.Column(db.String(100), nullable=True)
    rabies_vaccinated = db.Column(db.Boolean, default=False)
    trained = db.Column(db.Boolean, default=False)

    shelter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reviews = db.relationship('Review', backref='pet', lazy=True)


# ------------------- Review -------------------
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)

# ------------------- Success Story -------------------
class SuccessStory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# ------------------- Appointment -------------------
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=True)

# ------------------- Event -------------------
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)

    shelter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# ------------------- Donation -------------------
class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    message = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.String(50), nullable=False)
