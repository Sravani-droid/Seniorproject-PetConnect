from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    pets = db.relationship('Pet', backref='shelter', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    pet_type = db.Column(db.String(50), nullable=False)
    age = db.Column(db.String(50))
    origin = db.Column(db.String(100))
    image_url = db.Column(db.String(300))
    description = db.Column(db.Text)
    gender = db.Column(db.String(20))
    birthdate = db.Column(db.String(50))
    weight = db.Column(db.String(50))
    height = db.Column(db.String(50))
    health_status = db.Column(db.String(100))
    dapp = db.Column(db.Boolean, default=False)
    lepto = db.Column(db.Boolean, default=False)
    bordetella = db.Column(db.Boolean, default=False)
    fvrcp = db.Column(db.Boolean, default=False)
    good_with_dogs = db.Column(db.Boolean, default=False)
    good_with_cats = db.Column(db.Boolean, default=False)
    good_with_kids = db.Column(db.Boolean, default=False)
    rabies_vaccinated = db.Column(db.Boolean, default=False)
    trained = db.Column(db.Boolean, default=False)
    spayed_neutered = db.Column(db.Boolean, default=False)
    shelter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)

class FAQ(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=True)
    approved = db.Column(db.Boolean, default=False)

class SuccessStory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    shelter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=True)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    shelter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    message = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.String(50), nullable=False)

    
